import { Entity } from '@loopback/repository';
import { Question } from './question.model';
export declare class Test extends Entity {
    id?: string;
    name: string;
    time: number;
    classroomId?: string;
    questions: Question[];
    constructor(data?: Partial<Test>);
}
export interface TestRelations {
}
export declare type TestWithRelations = Test & TestRelations;
