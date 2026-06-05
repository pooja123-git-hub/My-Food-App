import { registerEnumType } from "@nestjs/graphql";
import { Gender } from "./gender.enums";

export enum UserRole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}

registerEnumType(UserRole, { name: 'UserRole' });