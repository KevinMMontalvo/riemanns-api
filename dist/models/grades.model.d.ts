import { Entity } from '@loopback/repository';
export declare class Grades extends Entity {
    grade: number;
    constructor(data?: Partial<Grades>);
}
export interface GradesRelations {
}
export declare type GradesWithRelations = Grades & GradesRelations;
