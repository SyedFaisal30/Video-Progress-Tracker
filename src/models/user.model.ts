import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
}, { timestamps: true });

export const User = mongoose.model<IUser>("User", UserSchema);
