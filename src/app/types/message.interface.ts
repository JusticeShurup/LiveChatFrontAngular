import { IUser } from "./user.interface";

export interface IMessage {
    id : string,
    text : string,
    user : IUser
}