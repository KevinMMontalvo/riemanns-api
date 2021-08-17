import {DefaultCrudRepository} from '@loopback/repository';
import {File, FileRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class FileRepository extends DefaultCrudRepository<
  File,
  typeof File.prototype.id,
  FileRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(File, dataSource);
  }
}
