import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Test, TestRelations, Question} from '../models';
import {QuestionRepository} from './question.repository';

export class TestRepository extends DefaultCrudRepository<
  Test,
  typeof Test.prototype.id,
  TestRelations
> {

  public readonly questions: HasManyRepositoryFactory<Question, typeof Test.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('QuestionRepository') protected questionRepositoryGetter: Getter<QuestionRepository>,
  ) {
    super(Test, dataSource);
    this.questions = this.createHasManyRepositoryFactoryFor('questions', questionRepositoryGetter,);
    this.registerInclusionResolver('questions', this.questions.inclusionResolver);
  }
}
