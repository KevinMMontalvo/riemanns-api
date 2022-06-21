import { Entity } from '@loopback/repository';
import { Option } from './option.model';
export declare class Question extends Entity {
    id?: string;
    text: string;
    options: Option[];
    testId: string;
    constructor(data?: Partial<Question>);
}
export interface QuestionRelations {
}
export declare type QuestionWithRelations = Question & QuestionRelations;
