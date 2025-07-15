import {express} from "express";
import { type NextFunction, type Request, type Response } from "express";
import { findMiscbyId, findAllMisc } from "../models/miscModel";


export const getMiscById = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
        const misc = await findMiscbyId(id);
        if (!misc) {
            res.status(404).json({ error: "Not found" });
            return;
        }
        res.status(200).json(misc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const getAllMisc = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const miscList = await findAllMisc();
        res.status(200).json(miscList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}