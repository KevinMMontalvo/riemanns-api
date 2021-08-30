import { Entity } from '@loopback/repository';
import { Grade } from './grade.model';
export declare class User extends Entity {
    id?: string;
    name: string;
    email: string;
    password: string;
    idCard: string;
    comment?: string;
    profile: string;
    photo?: string;
    grades: Grade[];
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export declare type UserWithRelations = User & UserRelations;
