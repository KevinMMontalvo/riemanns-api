import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { User, UserRelations, Grade } from '../models';
import { MongoDataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { GradeRepository } from './grade.repository';
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, UserRelations> {
    protected gradeRepositoryGetter: Getter<GradeRepository>;
    readonly grades: HasManyRepositoryFactory<Grade, typeof User.prototype.id>;
    constructor(dataSource: MongoDataSource, gradeRepositoryGetter: Getter<GradeRepository>);
}
