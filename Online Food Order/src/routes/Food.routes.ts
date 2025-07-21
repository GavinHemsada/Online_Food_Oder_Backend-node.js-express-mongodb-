import express from 'express'
import { createFood, 
    deleteFood, 
    updateFood,
    getAllFood,
    getResturentAllFoods,
    findById }  from '@/controllers/Food.controller'
import { validateDto } from '@/middleware/ValidateDTO.middleware'
import { FoodDto } from '@/dto/Food.dto'
import { upload } from '@/Utils/imageHandel'

const router = express.Router();

router.get("/getAll", getAllFood);
router.get("/getme/:id", getResturentAllFoods);
router.get("/find/:id", findById);
router.post("/create", upload.array('images', 5),validateDto(FoodDto), createFood );
router.put("/update/:id", upload.array('images', 5), validateDto(FoodDto), updateFood );
router.delete('/delete/:id', deleteFood);

export { router as FoodRoute }