import { Entity } from '@loopback/repository';
export declare class Grade extends Entity {
    id?: string;
    grade: any[];
    userId?: string;
    classroomId?: string;
    constructor(data?: Partial<Grade>);
}
export interface GradeRelations {
}
export declare type GradeWithRelations = Grade & GradeRelations;
