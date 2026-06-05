import { plainToInstance, Type } from "class-transformer";
// import { Status } from "src/user/database/status.entity";
import { Gender } from "src/user/enums/gender.enums";
import { UserRole } from "src/user/enums/role.enums";

export class RegisterUserResponse {
    full_name: string;
    email: string ;
    mobile: string;
    gender:Gender;
    profile_image: string;
    role: UserRole;
    // status: Status;
    created_at: Date;
    updated_at: Date;
}
export class AuthRegisterResponse {
    @Type(() => RegisterUserResponse)
    user: RegisterUserResponse;
 
    static decode(input: any): AuthRegisterResponse {
        return plainToInstance(this, input);
    }
}