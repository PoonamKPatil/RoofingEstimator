import { Request, Response, NextFunction } from "express";
import appDataSource from "../../config/database";
import { User } from "../models/User";

const jwt = require('jsonwebtoken');

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token || token == undefined) {
      res.status(401).json("Access Denied");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userRepository = appDataSource.getRepository(User);
    const user = await userRepository.findOneBy({id : decodedToken.id});

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

export default authMiddleware;