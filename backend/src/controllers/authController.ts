import appDataSource from "../../config/database";
import { User } from "../models/User";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { USER } from "../utils/types";

export const register = async(req: Request, res:Response) => {
    const {username, password} = req.body as USER;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    const userRepository = appDataSource.getRepository(User);

    try {
        await userRepository.save(user);
        res.status(201).json({ message: "user created" });
    } catch (error) {
        res.status(500).json(error);
    }

}

export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body as USER

    const userRepository = appDataSource.getRepository(User);

    try {
        const user = await userRepository.findOneBy({username : username});

        //get the hashedPassword from result
    
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid username or password');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).json('Internal server error');
    }
}