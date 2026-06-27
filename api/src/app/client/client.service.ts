import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async getSummary(userId: string) {
    const tickets = await this.prisma.ticket.findMany({ where: { userId } });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    return {
      activeProjects: 3,
      openTickets: tickets.filter((t) => t.status === 'OPEN').length,
      lastUpdate: new Date(),
      userName: user?.name,
    };
  }
}
