import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Grade, GradeRelations} from '../models';

export class GradeRepository extends DefaultCrudRepository<
  Grade,
  typeof Grade.prototype.id,
  GradeRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Grade, dataSource);
  }
}
