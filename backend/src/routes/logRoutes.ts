import express from "express";
import { postLogVisit } from "../controllers/logController";

const router = express.Router();

router.post("/", postLogVisit);

export default router;
