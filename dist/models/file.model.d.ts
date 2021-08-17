import { Entity } from '@loopback/repository';
export declare class File extends Entity {
    id?: string;
    url?: string;
    uploaded?: string;
    type: string;
    name: string;
    extension: string;
    user: string;
    size: number;
    constructor(data?: Partial<File>);
}
export interface FileRelations {
}
export declare type FileWithRelations = File & FileRelations;
