import { registerEnumType } from "@nestjs/graphql";
import { Gender } from "./gender.enums";

export enum UserRole {
    ADMIN = 1,
    USER = 2,
}

registerEnumType(UserRole, { name: 'UserRole' });