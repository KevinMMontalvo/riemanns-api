import { Filter, FilterExcludingWhere } from '@loopback/repository';
import { Grade } from '../models';
import { GradeRepository } from '../repositories';
export declare class GradeController {
    gradeRepository: GradeRepository;
    constructor(gradeRepository: GradeRepository);
    create(grade: Omit<Grade, 'id'>): Promise<Grade>;
    find(filter?: Filter<Grade>): Promise<Grade[]>;
    findById(id: string, filter?: FilterExcludingWhere<Grade>): Promise<Grade>;
    updateById(id: string, grade: Grade): Promise<void>;
    replaceById(id: string, grade: Grade): Promise<void>;
}
