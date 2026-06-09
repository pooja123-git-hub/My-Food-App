import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import {  RegisteredUserInput } from "./dto/register-user.input";
import { AuthRegisterEntity } from "./entities/register-user.entity";
import { AuthRepository } from "./repositories/auth.repository";
import { AuthRegisterResponse } from "./response/register-user.response";
import { AuthLoginEntity, LoginUserEntity } from "./entities/login-user.entity";
import { AuthLoginResponse, LoginUserResponse } from "./response/login-user.response";
import { RefreshToken } from "./entities/refresh-token.entity";
import { RefreshTokenResponse } from "./response/refresh-token.response";
import { BooleanMessage } from "./entities/boolean-message.entity";
import { In, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "src/user/database/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtTokenServices } from "./jwt/jwt.service";
import { LoginUserInput } from "./dto/login-user.input.";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private authRepository:AuthRepository,
        private readonly jwtTokenServices: JwtTokenServices
        
    ){}
// Register
async registerUser(registeredUserInput:RegisteredUserInput): Promise<AuthRegisterEntity> {

    const user = await this.authRepository.registerUser(registeredUserInput);

      // Generate Tokens
  const tokens = await this.jwtTokenServices.getUserToken(
    user.email,
    user.id,
    user.role.id
  );

  // Save Refresh Token
  await this.userRepository.update(
    user.id,
    {
      refresh_token: tokens.refresh_token,
    },
  );
    return AuthRegisterResponse.decode({user})

}
// Login
async loginUser(loginUserInput:LoginUserInput): Promise<AuthLoginEntity> {
     const user = await this.authRepository.loginUser(loginUserInput);

     if(!user) {
        throw new NotFoundException("User Not Found")
     }
     return AuthLoginResponse.decode({user})
}
// Refresh Token
async refreshToken(userId: number, refreshToken: string): Promise<RefreshToken> {
    const refreshTokenResponse= await this.authRepository.refreshToken(userId, refreshToken);

    return RefreshTokenResponse.decode(refreshTokenResponse)
}
// /**
//  * @description Forgot Password functionality can be implemented here in the future, which would involve generating a password reset token, sending it to the user's email, and allowing them to reset their password using that token.
//  * @param forgotPasswordInput 
//  * @returns
//  */
// async forgotPassword(forgotPasswordInput: ForgotPasswordInput): Promise<BooleanMessage> {

//     const userEmail = await this.userRepository.findOne({
//         where: { email: forgotPasswordInput.email.toLowerCase() },
//     })
//     if(!userEmail) throw new NotFoundException("User Not Found")

//     const checkPassword = await bcrypt.compare(forgotPasswordInput.password, userEmail.password);

//     if(checkPassword) throw new ConflictException("New password cannot be the same as the old password")

//         const salt = await bcrypt.genSalt(10);

//         const changePassword = await bcrypt.hash(forgotPasswordInput.password, salt);

//         await this.userRepository.save({ ...userEmail, password: changePassword });

//         return new BooleanMessage(true, "Password changed successfully");
// }
// /**
//  * @description logout functionality can be implemented here in the future, which would involve invalidating the user's refresh token in the database, effectively logging them out and preventing further use of that token for authentication.
//  * @param userId 
//  * @returns
//  */
// async logout(userId: number): Promise<BooleanMessage> {
//     const user = await this.userRepository.findOne({ where: { id: userId } });
//     if (!user) {
//         throw new NotFoundException("User Not Found");
//     }   
//     await this.userRepository.delete(userId);

//     return new BooleanMessage(true, "User logged out successfully");
// }
}