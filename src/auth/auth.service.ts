import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentailDto } from './dto/auth-credentals.dto';
import { JwtPayLoad } from './jwt-payload.interface';
import { UserRepository } from './user.repository';


@Injectable()
export class AuthService {
    private logger = new Logger('AuthService')
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService : JwtService
        ){}

    singUp(authenCredentail:AuthCredentailDto):Promise<void>{
        return this.userRepository.singUp(authenCredentail)
    }

    async singIn(authenCredentail:AuthCredentailDto):Promise<{accessToken: string}>{
        const username = await this.userRepository.validationPassword(authenCredentail);

        if(!username){
            throw new UnauthorizedException('Invalid credential');
        }
        const payLoad: JwtPayLoad = {username};
        const accessToken = await this.jwtService.sign(payLoad);
        this.logger.debug(`Genneated JWT Token with payload ${JSON.stringify(payLoad)}`);
        return{accessToken}
    }
}
