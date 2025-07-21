import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
    comparePassword(raw: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
  },
  { 
    timestamps: true
});

UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = function (raw: string) {
  return bcrypt.compare(raw, this.password);
};

export const User = model<IUser>('User', UserSchema);
