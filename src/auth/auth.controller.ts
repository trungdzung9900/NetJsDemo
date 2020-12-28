import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentailDto } from './dto/auth-credentals.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}
    
    @Post('/signup')
    signUp(@Body(ValidationPipe) authenCredentail:AuthCredentailDto):Promise<void>{
        return this.authService.singUp(authenCredentail)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authenCredentail:AuthCredentailDto):Promise<{accessToken: string}>{
        return this.authService.singIn(authenCredentail)
    }
} 
