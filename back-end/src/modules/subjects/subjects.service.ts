import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subject, SubjectDocument } from './schemas/subject.schema';
import { Model } from 'mongoose';

@Injectable()
export class SubjectsService {
    constructor(@InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>) { }

    async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
        const { name, code, description } = createSubjectDto;

        // Check if subject with same name exists
        const existingSubjectByName = await this.subjectModel.findOne({ name });
        if (existingSubjectByName) {
            throw new BadRequestException('Subject with this name already exists');
        }

        // Check if subject with same code exists
        const existingSubjectByCode = await this.subjectModel.findOne({ code });
        if (existingSubjectByCode) {
            throw new BadRequestException('Subject with this code already exists');
        }

        const newSubject = new this.subjectModel({
            name,
            code,
            description,
        });

        return newSubject.save();
    }

    async findAll(): Promise<Subject[]> {
        return this.subjectModel.find().exec();
    }

    async findOne(id: string): Promise<Subject> {
        const subject = await this.subjectModel.findById(id).exec();
        if (!subject) {
            throw new NotFoundException(`Subject with ID ${id} not found`);
        }
        return subject;
    }

    async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
        // Check if subject exists
        const existingSubject = await this.subjectModel.findById(id).exec();
        if (!existingSubject) {
            throw new NotFoundException(`Subject with ID ${id} not found`);
        }

        // Check for duplicate name if name is being updated
        if (updateSubjectDto.name && updateSubjectDto.name !== existingSubject.name) {
            const duplicateName = await this.subjectModel.findOne({ name: updateSubjectDto.name });
            if (duplicateName) {
                throw new BadRequestException('Subject with this name already exists');
            }
        }

        // Check for duplicate code if code is being updated
        if (updateSubjectDto.code && updateSubjectDto.code !== existingSubject.code) {
            const duplicateCode = await this.subjectModel.findOne({ code: updateSubjectDto.code });
            if (duplicateCode) {
                throw new BadRequestException('Subject with this code already exists');
            }
        }

        const updatedSubject = await this.subjectModel
            .findByIdAndUpdate(id, updateSubjectDto, { new: true })
            .exec();

        if (!updatedSubject) {
            throw new NotFoundException(`Subject with ID ${id} not found`);
        }

        return updatedSubject;
    }

    async remove(id: string): Promise<any> {
        const result = await this.subjectModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Subject with ID ${id} not found`);
        }
        return result;
    }
}
