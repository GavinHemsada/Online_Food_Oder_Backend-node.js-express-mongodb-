import express from 'express';
import { Login, Register }  from '@/controllers/User.controller';
import { validateDto } from '@/middleware/ValidateDTO.middleware';
import { LoginDTO, RegisterDto } from '@/dto/User.dto';

const router = express.Router();

router.post("/login", validateDto(LoginDTO), Login );
router.post("/register", validateDto(RegisterDto), Register );

export { router as UserRoute };