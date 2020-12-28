import { ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentailDto } from "./dto/auth-credentals.dto";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async singUp(authenCredentail: AuthCredentailDto):Promise<void>{
        const {username, password}= authenCredentail;
        
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt(); 
        user.password = await this.hashPassword(password,user.salt);
        try{
            await user.save();
        }
        catch(err){
            throw new ConflictException('UserName have exit') 
        }
    }
        async validationPassword(authenCredentail: AuthCredentailDto):Promise<string>{
            const {username, password} = authenCredentail;
            const user = await this.findOne({username});
            if(user && await user.validationPassword(password)){
                return user.username
            }
            else{
                return null
            }
        }

        private async hashPassword(password: string, salt: string):Promise<string>{
        return bcrypt.hash(password,salt)
        }
    }

