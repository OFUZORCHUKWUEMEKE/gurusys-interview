import { Request, Response } from "express";
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginUserDto, RegisterUserDto } from "../../dto/auth.dto";
import authService from "../../services/auth/auth.service";

const validateDto = async (dtoClass: any, plainObject: any) => {
    const dtoInstance = plainToInstance(dtoClass, plainObject);
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return dtoInstance;
};

export const SignUp = async (req: Request, res: Response) => {
    try {
        // const registerUserDto = await validateDto(RegisterUserDto, req.body);
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const loginUserDto = await validateDto(LoginUserDto, req.body);
        const token = await authService.login(req.body);
        res.status(200).json({ token });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};