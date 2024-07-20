import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Category, categorySchema} from '../schemas/category.schema'
import { UserModule } from 'src/user/user.module';

@Module({
  imports : [
    UserModule,
    MongooseModule.forFeature([
        {
        name : Category.name,
        schema : categorySchema
        }
    ]),
],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
