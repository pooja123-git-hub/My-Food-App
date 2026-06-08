import { Injectable, ConflictException, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/database/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { RegisteredUserInput } from "../dto/register-user.input";
import { JwtTokenServices } from "../jwt/jwt.service";
import { RefreshToken } from "../entities/refresh-token.entity";
import { BooleanMessage } from "../entities/boolean-message.entity";
import { LoginUserInput } from "../dto/login-user.input.";
import { Status } from "src/user/database/status.entity";

@Injectable()
export class AuthRepository {
  private readonly ACTIVE_STATUS: number = 1;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Status)
        private statusRepository: Repository<Status>,
        private readonly jwtTokenServices: JwtTokenServices
    ) {}

    /**
     * @description This method registers a new user by checking for existing email, hashing the password, and saving the user to the database.
     * @param registerdUserInput 
     * @returns The newly registered user entity.
     */ 
    async registerUser(registerdUserInput: RegisteredUserInput): Promise<User> {

        const existingEmail = await this.userRepository.findOne({where: {email: registerdUserInput.email.toLowerCase()}});

        if (existingEmail) throw new ConflictException("Email already registered");
        

    const status = await this.statusRepository.findOne({ where: { id: this.ACTIVE_STATUS } });

    if (!status) {
      throw new NotFoundException("User status not found");
    }
        // Generate Salt
        const salt = await bcrypt.genSalt(10);

        // Hash Password
        const hashedPassword = await bcrypt.hash(registerdUserInput.password,salt);

        const user = new User();

        user.full_name = registerdUserInput.full_name;
        user.email = registerdUserInput.email.toLowerCase();
        user.password = hashedPassword;
        user.mobile = registerdUserInput.mobile;
        user.gender = registerdUserInput.gender
        user.profile_image = registerdUserInput.profile_image;
        user.role = registerdUserInput.role;
        user.status = status;

        return await this.userRepository.save(user);
    }

    /**
     * @description This method logs in a user by validating the email and password, and returns the user along with access and refresh tokens if successful.
     * @param loginUserInput 
     * @returns 
     */
    async loginUser(loginUserInput : LoginUserInput) :Promise<any> {
         
        const existingUser = await this.userRepository.findOne({where:{email:loginUserInput.email.toLowerCase()}})
       
        if(!existingUser) throw new ConflictException("Invalid Email")

        const isPasswordMatch = await bcrypt.compare(loginUserInput.password,existingUser.password ,)
       
        if(!isPasswordMatch) throw new NotFoundException("Invalid Password")
        
        const tokens = await this.jwtTokenServices.getUserToken(existingUser.email ,existingUser.id);
        return {
            ...existingUser,
            ...tokens
        }
    }
    /**
     * @description This method refreshes the access and refresh tokens for a user by validating the provided refresh token against the stored one, and generates new tokens if valid.
     * @param userId 
     * @param refreshToken 
     * @returns 
     */

  async refreshToken(userId: number, refreshToken: string,): Promise<RefreshToken> {

    // Find User
    const user = await this.userRepository.findOne({where: { id: userId }, });

    if (!user) {
        throw new NotFoundException("User Not Found");}

    // Compare old refresh token
    if (user.refresh_token !== refreshToken) {
        throw new ForbiddenException("Access Denied: Invalid Refresh Token"); }

    // Generate New Tokens
    const tokens = await this.jwtTokenServices.getUserToken(user.email,user.id,);

    // Save New Refresh Token
    await this.userRepository.save({...user,refresh_token: tokens.refresh_token,});
  
    return {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
    };  
}

}