import express from "express";
import { loginHandler, registerHandler } from "../controllers/authController";
import { protectedRoute } from "../api/protected-route";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.post("/register", registerHandler);
router.get("/login", loginHandler);
router.get("/protected", verifyJWT, protectedRoute);
export default router;
