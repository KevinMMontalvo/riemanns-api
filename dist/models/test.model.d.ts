import { Entity } from '@loopback/repository';
export declare class Test extends Entity {
    id?: string;
    name: string;
    time: number;
    constructor(data?: Partial<Test>);
}
export interface TestRelations {
}
export declare type TestWithRelations = Test & TestRelations;
