import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/user/dto/user.dto';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signin')
    async signIn(@Req() req) {
        return await this.authService.signIn(req.user);
    }

    @Post('signup')
    async signUp(@Body() userDto: UserDTO){
        return await this.authService.signUp(userDto);
    }
}
