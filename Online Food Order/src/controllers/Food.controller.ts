import { Request, Response } from 'express'
import { Food } from '@/models/Food' 
import { FoodDto } from '@/dto/Food.dto'
import { AuthedRequest } from '@/middleware/JwtValidation.middleware'
import { addImages, deleteImages, deleteImage } from '@/Utils/imageHandel';
import { Resturent } from '@/models/Resturent';

const folderName = "food";

export const createFood = async (req: AuthedRequest, res: Response) => {
  try {
    const resturent = await Resturent.findOne({ user: req.user!._id });
    if( resturent == null ){ return res.status(400).json({ error: 'Restaurant not found' }) }

    const files = <Express.Multer.File[]>req.files!;  
    
    const imagepath = addImages(files,folderName);

    const food = new Food({
        resturent: resturent._id,
      ...<FoodDto>req.body,
      images: imagepath
    });

    await food.save();

    res.status(201).json({ message: 'Food created', food });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', mesage: errorMessage});
  }
};

export const getAllFood = async (req: Request, res:Response) => {
  try{
    const foods = await Food.find();
    res.status(201).json({ message: 'all foods', foods });
  }catch(error){
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', mesage: errorMessage});
  }
}

export const findById = async (req: Request, res: Response) => {
  try{
    const food = await Food.findById(req.params.id);
    if(!food){ return res.status(400).json({ error: 'Food not found' }) }
    res.status(201).json({ message: 'food', food });
  }catch(error){
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', mesage: errorMessage});
  }
}

export const getResturentAllFoods = async (req : Request, res: Response) => {
  try{
    const resturentID = req.params.id;
    const foods = await Food.find({resturent: resturentID});
    if(!foods){ return res.status(400).json({ error: "Restaurant's foods not found" }) }
    res.status(201).json({ message: 'foods', foods });
  }catch(error){
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', mesage: errorMessage});
  }
}

export const updateFood = async (req: AuthedRequest, res: Response) => {
  try {
    const food = await Food.findById(req.params.id);
    if(!food){ return res.status(400).json({ error: 'Food not found' }) }

    const files = req.files as Express.Multer.File[] | undefined;

    // Replace existing images if new files are uploaded
    if (files && files.length > 0) {
      if (food.images && food.images.length > 0) {
        deleteImages(food.images);
      }
      const imagePaths = addImages(files, folderName); 
      food.images = imagePaths;
    }

    // Update other fields
    const updateFields: Partial<FoodDto> = req.body;
    Object.assign(food, updateFields);

    await food.save();

    res.status(200).json({ message: 'Food updated', food });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', message });
  }
};

export const deleteFood = async (req: AuthedRequest, res: Response) => {
  try {
    const food = await Food.findById(req.params.id);
    if(!food){ return res.status(400).json({ error: 'Food not found' }) }

    if(!deleteImages(food.images)){return res.status(404).json({ error: 'Foods image cant delete' });}

    await Food.findByIdAndDelete(food._id);

    res.status(200).json({ message: 'Food deleted' });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', message });
  }
};
