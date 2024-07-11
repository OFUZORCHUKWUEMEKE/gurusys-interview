// src/controllers/blogController.ts
import { Request, Response } from 'express';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import blogService from '../../services/blog/blog.service';


const validateDto = async (dtoClass: any, plainObject: any) => {
  const dtoInstance = plainToInstance(dtoClass, plainObject);
  const errors = await validate(dtoInstance);
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return dtoInstance;
};

export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.status(200).json(blogs);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    // const blogDto = await validateDto(CreateBlogDto, req.body);
    const newBlog = await blogService.createBlog(req.body);
    res.status(201).json(newBlog);
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    // const blogDto = await validateDto(UpdateBlogDto, req.body);
    const updatedBlog = await blogService.updateBlog(req.params.id, req.body);
    if (updatedBlog) {
      res.status(200).json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (err:any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBlog = await blogService.deleteBlog(req.params.id);
    if (deletedBlog) {
      res.status(200).json({ message: 'Blog deleted' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};
