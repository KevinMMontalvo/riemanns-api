import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Grade} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GradeRepository} from './grade.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly grades: HasManyRepositoryFactory<Grade, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('GradeRepository') protected gradeRepositoryGetter: Getter<GradeRepository>,
  ) {
    super(User, dataSource);
    this.grades = this.createHasManyRepositoryFactoryFor('grades', gradeRepositoryGetter,);
    this.registerInclusionResolver('grades', this.grades.inclusionResolver);
  }
}
