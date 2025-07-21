import { Request, Response } from 'express'
import { Resturent } from '@/models/Resturent' 
import { ResturentDto } from '@/dto/Resturent.dto'
import { AuthedRequest } from '@/middleware/JwtValidation.middleware'
import { addImage, deleteImage, getOriginalFileName } from '@/Utils/imageHandel';

const folderName = "restaurants";

export const createResturent = async (req: AuthedRequest, res: Response) => {
  try {
    const user = await Resturent.findOne({ user: req.user!._id });
    if(user){ return res.status(400).json({ error: 'User already exists' }) };

    const file = req.file!;  
    
    const imagepath = addImage(file,folderName);

    const resturent = new Resturent({
        user: req.user!._id,
      ...<ResturentDto>req.body,
      images: imagepath
    });

    await resturent.save();

    res.status(201).json({ message: 'Restaurant created', resturent });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', mesage: errorMessage});
  }
};

export const getAllResturents = async (req: Request, res: Response) => {
  try {
    const resturents = await Resturent.find();

    res.status(200).json({ resturents });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', message });
  }
};

export const getMyResturent = async (req: AuthedRequest, res: Response) => {
  try {
    const resturent = await Resturent.findOne({ user: req.user!._id });

    if (!resturent) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.status(200).json({ resturent });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', message });
  }
};

export const findByIDResturent = async (req: Request, res: Response) => {
  try {
    const resturenID = req.params.id;
    const resturent = await Resturent.findById(resturenID);

    if (!resturent) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.status(200).json({ resturent });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', message });
  }
};

export const updateResturent = async (req: AuthedRequest, res: Response) => {
  try {
    const existing = await Resturent.findOne({ user: req.user!._id });
    if (!existing) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const file = req.file;

    if(file){
      if(existing.images){
        deleteImage(existing.images);
      }
      const path = addImage(req.file!,folderName);
      existing.images = path;
    }
    const updateFields: Partial<ResturentDto> = req.body;
    Object.assign(existing, updateFields);
    await existing.save();

    res.status(200).json({ message: 'Restaurant updated', resturent: existing });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', message });
  }
};

export const deleteResturent = async (req: AuthedRequest, res: Response) => {
  try {
    const resturent = await Resturent.findOne({ user: req.user!._id });

    if (!resturent) {return res.status(404).json({ error: 'Restaurant not found' });}

    if(!deleteImage(resturent.images)){return res.status(404).json({ error: 'Restaurant image cant delete' });}

    await Resturent.deleteOne({ _id: resturent._id });

    res.status(200).json({ message: 'Restaurant deleted' });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: 'Server error', message });
  }
};
