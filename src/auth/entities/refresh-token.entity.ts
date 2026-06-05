import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RefreshToken {
    @Field(() => String, { nullable: true, description: "access token of user" })
    access_token?: string;

    @Field(() => String, { nullable: true, description: "refresh token of user" })
    refresh_token?: string;
}