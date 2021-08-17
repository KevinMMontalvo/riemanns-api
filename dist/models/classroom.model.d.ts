import { Entity } from '@loopback/repository';
import { Event } from './event.model';
import { File } from './file.model';
import { User } from './user.model';
import { Grade } from './grade.model';
export declare class Classroom extends Entity {
    id?: string;
    code?: string;
    name: string;
    students?: string[] | User[];
    files?: string[] | File[];
    videos?: string[] | File[];
    teacher: string | User;
    events?: Event[];
    blogs?: any[];
    forums?: any[];
    quizzes?: any[];
    activities?: any[];
    grades: Grade[];
    constructor(data?: Partial<Classroom>);
}
export interface ClassroomRelations {
}
export declare type ClassroomWithRelations = Classroom & ClassroomRelations;
