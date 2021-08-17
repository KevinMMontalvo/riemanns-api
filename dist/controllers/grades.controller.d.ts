import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Grade } from '../models';
import { GradeRepository } from '../repositories';
export declare class GradesController {
    gradeRepository: GradeRepository;
    constructor(gradeRepository: GradeRepository);
    create(grade: Omit<Grade, 'id'>): Promise<Grade>;
    count(where?: Where<Grade>): Promise<Count>;
    find(filter?: Filter<Grade>): Promise<Grade[]>;
    updateAll(grade: Grade, where?: Where<Grade>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Grade>): Promise<Grade>;
    updateById(id: string, grade: Grade): Promise<void>;
    replaceById(id: string, grade: Grade): Promise<void>;
    deleteById(id: string): Promise<void>;
}
