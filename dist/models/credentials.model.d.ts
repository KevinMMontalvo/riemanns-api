import { Model } from '@loopback/repository';
export declare class Credentials extends Model {
    email: string;
    password: string;
    constructor(data?: Partial<Credentials>);
}
export interface CredentialsRelations {
}
export declare type CredentialsWithRelations = Credentials & CredentialsRelations;
