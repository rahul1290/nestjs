import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, Put, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() request: any, @UploadedFile() file: Express.Multer.File) {
    console.log("file==============>",file)
    const data = {
      ...createCategoryDto,
      createdBy : request.user.userid,
      createdAt: Date.now()
    }
    return this.handleRequest(
      () => this.categoryService.create(data),
      'Category created.'
    );
  }

  @Get()
  async findAll() {
    return this.handleRequest(
      () => this.categoryService.findAll(),
      'All categories.'
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.handleRequest(
      () => this.categoryService.findOne(id),
      'Category detail.'
    );
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.handleRequest(
      () => this.categoryService.update(id, updateCategoryDto),
      'Category updated.'
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.handleRequest(
      () => this.categoryService.remove(id),
      'Category deleted.'
    );
  }

  private async handleRequest(action: () => Promise<any>, successMessage: string) {
    try {
      const result = await action();
      if(result)
        return { status: 200, msg: successMessage, data: result };
      
      return { status: 500, msg: 'record not found.' };
    } catch (error) {
      throw new HttpException(`Error: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
