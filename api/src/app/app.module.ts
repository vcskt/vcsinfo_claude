import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { BlogModule } from './blog/blog.module';
import { LeadsModule } from './leads/leads.module';
import { TicketsModule } from './tickets/tickets.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret-key-min-32-chars-long',
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    BlogModule,
    LeadsModule,
    TicketsModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
