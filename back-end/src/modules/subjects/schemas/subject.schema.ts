import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema({ timestamps: true })
export class Subject {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    code: string;

    @Prop()
    description?: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
