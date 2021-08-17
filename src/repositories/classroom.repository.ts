import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Classroom, ClassroomRelations, Grade} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GradeRepository} from './grade.repository';

export class ClassroomRepository extends DefaultCrudRepository<
  Classroom,
  typeof Classroom.prototype.id,
  ClassroomRelations
> {

  public readonly grades: HasManyRepositoryFactory<Grade, typeof Classroom.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('GradeRepository') protected gradeRepositoryGetter: Getter<GradeRepository>,
  ) {
    super(Classroom, dataSource);
    this.grades = this.createHasManyRepositoryFactoryFor('grades', gradeRepositoryGetter,);
    this.registerInclusionResolver('grades', this.grades.inclusionResolver);
  }
}
