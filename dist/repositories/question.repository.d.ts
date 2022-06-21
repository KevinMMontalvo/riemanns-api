import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDataSource } from '../datasources';
import { Question, QuestionRelations } from '../models';
export declare class QuestionRepository extends DefaultCrudRepository<Question, typeof Question.prototype.id, QuestionRelations> {
    constructor(dataSource: MongoDataSource);
}
