import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuth } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  signin(@Body() dto: SigninAuth) {
    const { username, password } = dto;
    return this.authService.signin(username, password);
  }

  @Post('signup')
  signup(@Body() dto: SigninAuth) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }
}
