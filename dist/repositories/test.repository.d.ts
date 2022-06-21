import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { MongoDataSource } from '../datasources';
import { Test, TestRelations, Question } from '../models';
import { QuestionRepository } from './question.repository';
export declare class TestRepository extends DefaultCrudRepository<Test, typeof Test.prototype.id, TestRelations> {
    protected questionRepositoryGetter: Getter<QuestionRepository>;
    readonly questions: HasManyRepositoryFactory<Question, typeof Test.prototype.id>;
    constructor(dataSource: MongoDataSource, questionRepositoryGetter: Getter<QuestionRepository>);
}
