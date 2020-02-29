import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: String,
  username: { type: String, unique: true },
  password: String,
});
