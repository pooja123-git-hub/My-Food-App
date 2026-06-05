import { plainToInstance, Type } from "class-transformer";

export class LoginUserResponse {
    email: string ;
    access_token :string ;
    refresh_token :string ;
    message :string ;
}
export class AuthLoginResponse {
    @Type(() => LoginUserResponse)
    user: LoginUserResponse;
 
    static decode(input: any): AuthLoginResponse {
        return plainToInstance(this, input);
    }
}