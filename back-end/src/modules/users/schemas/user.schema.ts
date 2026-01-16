import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password?: string; // Optional because we might have social login later, but required for now

  @Prop({ required: true })
  name: string;

  @Prop({ default: 'user' }) // user | admin
  role: string;

  @Prop()
  resetPasswordToken?: string;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
