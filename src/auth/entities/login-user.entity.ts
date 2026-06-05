import { Field, ObjectType } from "@nestjs/graphql";
import { Type } from "class-transformer";

@ObjectType()
export class LoginUserEntity {

  @Field(()=>String ,{description:"Email of the User" , })
  email: string;


  @Field(()=>String , {description:"Access token of user" ,nullable:true})
  access_token :string;

  @Field(()=>String ,{description :"Refresh token of user",nullable:true})
  refresh_token :string

  @Field(()=>String ,{description:"Message for sucess login" ,defaultValue :"Login Sucessfully:)"})
  message :string
}
@ObjectType()
export class AuthLoginEntity {
    @Field(() => LoginUserEntity ,)
    user: LoginUserEntity;
}