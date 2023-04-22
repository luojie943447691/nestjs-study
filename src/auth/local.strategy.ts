import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecretEnum } from 'src/enum/enum.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(SecretEnum.SECRET),
    });
  }

  async validate(payload: any) {
    // validate 成功 之后会把这个对象加到 req.user 上
    return { userId: payload.sub, username: payload.username };
  }
}
