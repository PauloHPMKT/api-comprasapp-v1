import { MissingParamError } from '@/shared/errors';
import { Body, Controller, Post } from '@nestjs/common';

interface CreateCategoryDto {
  accountId: string;
  name: string;
  emoji: string;
}

@Controller('category')
export class CreateCategoryController {
  @Post()
  async handle(@Body() request: CreateCategoryDto): Promise<any> {
    if (!request.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name').message,
      };
    }
  }
}
