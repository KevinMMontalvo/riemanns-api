import { Filter } from '@loopback/repository';
import { Grade } from '../models';
import { ClassroomRepository } from '../repositories';
export declare class ClassroomGradeController {
    protected classroomRepository: ClassroomRepository;
    constructor(classroomRepository: ClassroomRepository);
    find(id: string, filter?: Filter<Grade>): Promise<Grade[]>;
}
