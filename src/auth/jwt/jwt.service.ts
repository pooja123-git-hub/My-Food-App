import { JwtService } from "@nestjs/jwt";
import { Token } from "../type/token.type";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtTokenServices{
    constructor(
        private readonly jwtService :JwtService
    )
    {}
    async getUserToken(email:string,userId:number) :Promise<Token> {
        const payload= {
            email:email,
            id:userId
        }
        const accessToken =await this.jwtService.signAsync(payload,{
            secret:process.env.JWT_SECRET_KEY,
            expiresIn:'15m'
        })
        // console.log("Access Token:", accessToken);
        
        const refreshToken =await this.jwtService.signAsync(payload,{
            secret:process.env.JWT_REFRESH_SECRET_KEY,
            expiresIn:'7d'
        })
        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }
}