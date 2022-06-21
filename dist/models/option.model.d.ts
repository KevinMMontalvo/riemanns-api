import { Entity } from '@loopback/repository';
export declare class Option extends Entity {
    id?: string;
    text: string;
    isCorrect: boolean;
    constructor(data?: Partial<Option>);
}
export interface OptionRelations {
}
export declare type OptionWithRelations = Option & OptionRelations;
