import express from "express";
import { checkOrCreateUser } from "../controllers/uniqueuser.controller";

const router = express.Router();
router.get("/check-username/:username", checkOrCreateUser);
export default router;
