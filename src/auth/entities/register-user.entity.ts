import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { User } from "src/user/database/user.entity";
// import { Status } from "src/user/database/status.entity";
import { Gender } from "src/user/enums/gender.enums";
import { UserRole } from "src/user/enums/role.enums";


@ObjectType()
export class UserRegisterStatusEntity {

  @Field(() => Int)
  id: number

  @Field(() => String, { nullable: true })
  name: string;
}

@ObjectType()
export class UserRegisterRoleEntity {

  @Field(() => Int)
  id: number

  @Field(() => String, { nullable: true })
  name: string;
}


@ObjectType()
export class RegisterUserEntity {

  @Field(()=>String ,{description:"Full Name of the User" ,})
  full_name: string;

  @Field(()=>String ,{description:"Email of the User" , })
  email: string;

  @Field(() => String, { nullable: true })
  mobile: string;

  @Field(() => Gender, { nullable: true })
  gender: Gender

  
  @Field(() => String, { nullable: true })
  profile_image: string;


  @Field(() => Date, { nullable: true })
  created_at: Date;

  @Field(() => UserRegisterStatusEntity, { nullable: true })
  status: UserRegisterStatusEntity

   @Field(() => UserRegisterRoleEntity, { nullable: true })
  role: UserRegisterRoleEntity

  @Field(() => Date, { nullable: true })
  updated_at: Date;

}
@ObjectType()
export class AuthRegisterEntity {
    @Field(() => RegisterUserEntity ,)
    user: RegisterUserEntity;
}