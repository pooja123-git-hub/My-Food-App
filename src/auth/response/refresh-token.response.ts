import { plainToInstance, Type } from "class-transformer";

export class RefreshTokenResponse {
  
    access_token :string ;
    refresh_token :string ;


 
    static decode(input: any): RefreshTokenResponse {
        return plainToInstance(this, input);
    }
}