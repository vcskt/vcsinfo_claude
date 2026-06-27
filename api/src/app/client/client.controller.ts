import { Controller, Get, Param } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('summary/:userId')
  getSummary(@Param('userId') userId: string) {
    return this.clientService.getSummary(userId);
  }
}
