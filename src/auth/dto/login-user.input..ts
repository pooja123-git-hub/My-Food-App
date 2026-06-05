import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class LoginUserInput {

  @Field(()=>String ,{description:"Email of the User" , nullable:false})  
  @IsEmail()
  email: string;

  @Field(()=>String ,{description:"Password of the User" , nullable:false})  
  @MinLength(6)
  @IsString()
  password: string;
  
}