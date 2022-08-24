import { Response } from 'express';
import {
  Get,
  Res,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/lib/user.decorator';
import { AuthService } from './auth.service';
import { createAuthCookie } from 'src/lib/cookies';
import { AuthCredentialsDto } from './dto/auth.credential';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) payload: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(payload, res);
  }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) payload: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUp(payload, res);
  }

  @Post('/signout')
  @HttpCode(204)
  logout(@Res({ passthrough: true }) res: Response) {
    createAuthCookie(res, undefined);
  }

  @Get('/check')
  @UseGuards(AuthGuard())
  check(@GetUser() user: { username: string }) {
    return user;
  }
}
