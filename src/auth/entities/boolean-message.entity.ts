import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BooleanMessage {
    @Field({ description: "It is run successfully true or not." })
    success: boolean;

    @Field({ description: "Message of the response" })
    message: string;

    constructor(success: boolean = true, message: string = "Task ran successfully") {
        this.success = success;
        this.message = message;
    }
}