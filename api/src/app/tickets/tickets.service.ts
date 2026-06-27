import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  findByUser(userId: string) {
    return this.prisma.ticket.findMany({
      where: { userId },
      include: { comments: true },
    });
  }

  findAll() {
    return this.prisma.ticket.findMany({
      include: { comments: true },
    });
  }
}
