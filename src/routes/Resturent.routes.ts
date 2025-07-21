import express from 'express';
import { createResturent, 
    deleteResturent, 
    findByIDResturent, 
    getAllResturents, 
    getMyResturent, 
    updateResturent }  from '@/controllers/Resturent.controller';
import { validateDto } from '@/middleware/ValidateDTO.middleware';
import { ResturentDto } from '@/dto/Resturent.dto';
import { upload } from '@/Utils/imageHandel';

const router = express.Router();

router.get("/getAllResturents", getAllResturents);
router.get("/getme", getMyResturent);
router.get("/find/:id", findByIDResturent)
router.post("/create", upload.single("image"),validateDto(ResturentDto), createResturent );
router.put("/update", upload.single("image"), validateDto(ResturentDto), updateResturent );
router.delete('/delete', deleteResturent)

export { router as RestaurantRoute };