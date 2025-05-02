import { Request, Response } from 'express';

exports.getUserById = async (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'hello' });
};

exports.getAllUsers = async (req: Request, res: Response) => {
    return res.status(200).json({ msg: 'hello' });
};

