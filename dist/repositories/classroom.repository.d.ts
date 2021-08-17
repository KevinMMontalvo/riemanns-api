import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Classroom, ClassroomRelations, Grade } from '../models';
import { MongoDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { GradeRepository } from './grade.repository';
export declare class ClassroomRepository extends DefaultCrudRepository<Classroom, typeof Classroom.prototype.id, ClassroomRelations> {
    protected gradeRepositoryGetter: Getter<GradeRepository>;
    readonly grades: HasManyRepositoryFactory<Grade, typeof Classroom.prototype.id>;
    constructor(dataSource: MongoDataSource, gradeRepositoryGetter: Getter<GradeRepository>);
}
