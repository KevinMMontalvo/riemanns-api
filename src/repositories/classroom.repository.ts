import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Classroom, ClassroomRelations, Grade, Test} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GradeRepository} from './grade.repository';
import {TestRepository} from './test.repository';

export class ClassroomRepository extends DefaultCrudRepository<
  Classroom,
  typeof Classroom.prototype.id,
  ClassroomRelations
> {

  public readonly grades: HasManyRepositoryFactory<Grade, typeof Classroom.prototype.id>;

  public readonly tests: HasManyRepositoryFactory<Test, typeof Classroom.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('GradeRepository') protected gradeRepositoryGetter: Getter<GradeRepository>, @repository.getter('TestRepository') protected testRepositoryGetter: Getter<TestRepository>,
  ) {
    super(Classroom, dataSource);
    this.tests = this.createHasManyRepositoryFactoryFor('tests', testRepositoryGetter,);
    this.registerInclusionResolver('tests', this.tests.inclusionResolver);
    this.grades = this.createHasManyRepositoryFactoryFor('grades', gradeRepositoryGetter,);
    this.registerInclusionResolver('grades', this.grades.inclusionResolver);
  }
}
