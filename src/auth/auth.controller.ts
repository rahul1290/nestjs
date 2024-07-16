import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthDto } from '../dtos/auth.dto'


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() reqData: AuthDto) {
    try {
      const userdata = await this.authService.signIn(reqData.identity, reqData.password);
      if (userdata) {
        return { 'status': 200, 'msg': "Login success.", 'data': userdata }
      } else {
        return { 'status': 500, 'msg': "login failed.", 'data': [] }
      }
    } catch (error) {
      return error
    }

  }
}