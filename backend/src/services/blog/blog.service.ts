// src/services/blogService.ts

import { CreateBlogDto, UpdateBlogDto } from "../../dto/blog.dto";
import Blog, { IBlog } from "../../models/blog.model";
import { uploadImage } from "../cloudinary";


const getAllBlogs = async (): Promise<IBlog[]> => {
    return Blog.find().populate('author', 'name email');
};

const getBlogById = async (id: string): Promise<IBlog | null> => {
    return Blog.findById(id).populate('author', 'name email');
};

const createBlog = async (blog: CreateBlogDto): Promise<IBlog> => {
    const file = await uploadImage(blog.url)
    return Blog.create({ ...blog, url: file.url });
};

const updateBlog = async (id: string, blog: UpdateBlogDto): Promise<IBlog | null> => {
    return Blog.findByIdAndUpdate(id, blog, { new: true }).populate('author', 'name email');
};

const deleteBlog = async (id: string): Promise<IBlog | null> => {
    return Blog.findByIdAndDelete(id);
};

export default {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
