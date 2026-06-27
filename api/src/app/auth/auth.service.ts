import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(name: string, email: string, password: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Email already registered');

    const passwordHash = await argon2.hash(password);
    const user = await this.prisma.user.create({
      data: { name, email, passwordHash, role: 'CLIENT' },
    });

    return this.generateTokens(user.id, user.email);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash)
      throw new UnauthorizedException('Invalid credentials');

    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.generateTokens(user.id, user.email);
  }

  private generateTokens(userId: string, email: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, email },
      { expiresIn: '1h' },
    );
    const refreshToken = this.jwtService.sign(
      { sub: userId, email },
      { expiresIn: '7d', secret: process.env.JWT_REFRESH_SECRET },
    );

    return { accessToken, refreshToken, userId };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
