// src/services/authService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginUserDto, RegisterUserDto } from '../../dto/auth.dto';
import User, { IUser } from '../../models/user.model';
import * as dotenv from 'dotenv'

dotenv.config({})

const register = async (userDto: RegisterUserDto): Promise<IUser> => {
    const { name, email, password, age } = userDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, age });
    await user.save();
    return user;
};

const login = async (userDto: LoginUserDto): Promise<string> => {
    const { email, password } = userDto;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    // come back for this
    const token = jwt.sign({ userId: user._id }, 'random', { expiresIn: '1h' });
    return token;
};

export default {
    register,
    login
};
