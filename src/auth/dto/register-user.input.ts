import { Field, InputType } from '@nestjs/graphql';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
// import { Status } from 'src/user/database/status.entity';
import { Gender } from 'src/user/enums/gender.enums';
import { UserRole } from 'src/user/enums/role.enums';

@InputType()
export class RegisteredUserInput {

  @Field(()=>String ,{description:"Full Name of the User" , nullable:false})  
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @Field(()=>String ,{description:"Email of the User" , nullable:false})  
  @IsEmail()
  email: string;

  @Field(()=>String ,{description:"Password of the User" , nullable:false})  
  @MinLength(6)
  @IsString()
  password: string;
  
  @Field(() => String, { nullable: true, description: "Mobile number of the user" })
  @IsOptional()
  @IsString()
  @Transform(({ value }: TransformFnParams) => value ? value.trim() : null)
  @IsNotEmpty()
  mobile: string;

  @Field(() => Gender, { description: "gender of the user" })
  gender:Gender;

  // @Field(() => Status, { description: "Status of the user" })
  // status: number;
 
  @Field(() => String, { nullable: true, description: "Profile image of the user" })
  @IsOptional()
  @IsString()
  profile_image: string;

  @Field(() => UserRole, { nullable: true, description: "Role of the user" })
  @IsOptional()
  @IsString()
  role: UserRole;


}