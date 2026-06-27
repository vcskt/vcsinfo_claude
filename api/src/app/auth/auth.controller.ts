import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

class SignupDto {
  name: string;
  email: string;
  password: string;
}

class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body.name, body.email, body.password);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Get('me')
  getMe(@Request() req: any) {
    if (!req.user) {
      return { authenticated: false };
    }
    return { authenticated: true, user: req.user };
  }
}
