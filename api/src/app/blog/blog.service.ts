import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  findAll(locale = 'pt') {
    return this.prisma.blogPost.findMany({
      where: { published: true, locale },
      include: { author: true },
      orderBy: { publishedAt: 'desc' },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.blogPost.findUnique({
      where: { slug },
      include: { author: true },
    });
  }
}
