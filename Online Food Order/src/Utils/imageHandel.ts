import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuid } from 'uuid';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb: FileFilterCallback) => {
    const allowed = ['image/jpeg', 'image/png'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true); 
    } else {
      cb(new Error('Only .png and .jpg files are allowed!')); 
    }
  },
});

//   ** singel image haddel **

export const addImage = (file:Express.Multer.File,filename: string) : string => {
  var filepath = ""; 

  // This points to your project root (where package.json is)
  const imageDir = path.join(process.cwd(), 'uploads', filename);
  if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });
  
  const fileName = `${uuid()}-${file!.originalname}`;
  const Path = path.join(imageDir, fileName);
  
  fs.writeFileSync(Path, file!.buffer);
  if(fileName != null){return filepath = Path;}
  return filepath;
}

export const deleteImage = (imageFullPath: string): boolean => {
  try {
    const normalizedPath = path.normalize(imageFullPath);
    if (fs.existsSync(normalizedPath)) {
      fs.unlinkSync(normalizedPath);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed to delete image:', err);
    return false;
  }
};

export const getOriginalFileName = (imagePath: string): string => {
  const fileName = path.basename(imagePath);
  const index = fileName.lastIndexOf('-');
  return index !== -1 ? fileName.substring(index + 1) : fileName;
}

//    ** multipulle images haddel **

export const addImages = (files: Express.Multer.File[], folderName: string): string[] => {
  const imageDir = path.join(process.cwd(), 'uploads', folderName);
  if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

  const filePaths: string[] = [];

  for (const file of files) {
    const uniqueFileName = `${uuid()}-${file.originalname}`;
    const fullPath = path.join(imageDir, uniqueFileName);
    fs.writeFileSync(fullPath, file.buffer);
    filePaths.push(fullPath);
  }

  return filePaths;
};

export const deleteImages = (imagePaths: string[]): boolean[] => {
  return imagePaths.map((imgPath) => deleteImage(imgPath));
};
