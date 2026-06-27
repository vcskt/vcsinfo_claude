import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll(@Query('locale') locale = 'pt') {
    return this.blogService.findAll(locale);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }
}
