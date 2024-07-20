import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import mongoose, { Model } from 'mongoose';
import { error } from 'console';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>
  ) {}

  async create(createCategoryDto: CreateCategoryDto & {createdBy: any, createdAt: any}): Promise<Category> {
    try {
      const result = await this.categoryModel.create(createCategoryDto);
      return result;
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      const query = [
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  firstName: 1,
                  lastName: 1
                }
              }
            ],
            as: "result"
          }
        },
        {
          $addFields: {
            createdByName: {
              $concat: [
                { $arrayElemAt: ["$result.firstName", 0] },
              " ",
              { $arrayElemAt: ["$result.lastName", 0] }
              ]
            }
          }
        },
        {
          $project: {
            result: 0
          }
        }
      ]
      const result = await this.categoryModel.aggregate(query).exec()
      return result;
    } catch (error) {
      throw new Error(`Error finding all categories: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Category | null> {
    try {
      const query = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
            isActive: true
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  firstName: 1,
                  lastName: 1
                }
              }
            ],
            as: "result"
          }
        },
        {
          $addFields: {
            createdByName: {
              $concat: [
                { $arrayElemAt: ["$result.firstName", 0] },
              " ",
              { $arrayElemAt: ["$result.lastName", 0] }
              ]
            }
          }
        },
        {
          $project: {
            result: 0
          }
        }
      ]
      const result = await this.categoryModel.aggregate(query).exec()
      if(result.length > 0) {
        return result[0];
      }
    } catch (error) {
      throw new Error(`Error finding category with id ${id}: ${error.message}`);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    try {
      const result = await this.categoryModel.findOneAndUpdate(
        { _id: id },
        updateCategoryDto,
        { new: true }
      ).exec();
      return result;
    } catch (error) {
      throw new Error(`Error updating category with id ${id}: ${error.message}`);
    }
  }

  async remove(id: string): Promise<Category | null> {
    try {
      const result = await this.categoryModel.findOneAndUpdate(
        { _id: id },
        { isActive: false },
        { new: true }
      ).exec();
      return result;
    } catch (error) {
      throw new Error(`Error removing category with id ${id}: ${error.message}`);
    }
  }
}
