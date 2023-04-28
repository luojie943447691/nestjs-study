import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize/serialize.interceptor';
import { AuthService } from './auth.service';
import { SigninAuth } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signin')
  async signin(@Body() dto: SigninAuth) {
    const { username, password } = dto;
    const token = await this.authService.signin(username, password);
    return {
      access_token: token,
    };
  }

  @Post('signup')
  @UseInterceptors(SerializeInterceptor)
  signup(@Body() dto: SigninAuth) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }
}
