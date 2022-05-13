import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Classroom, ClassroomRelations, Grade, Test } from '../models';
import { MongoDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { GradeRepository } from './grade.repository';
import { TestRepository } from './test.repository';
export declare class ClassroomRepository extends DefaultCrudRepository<Classroom, typeof Classroom.prototype.id, ClassroomRelations> {
    protected gradeRepositoryGetter: Getter<GradeRepository>;
    protected testRepositoryGetter: Getter<TestRepository>;
    readonly grades: HasManyRepositoryFactory<Grade, typeof Classroom.prototype.id>;
    readonly tests: HasManyRepositoryFactory<Test, typeof Classroom.prototype.id>;
    constructor(dataSource: MongoDataSource, gradeRepositoryGetter: Getter<GradeRepository>, testRepositoryGetter: Getter<TestRepository>);
}
