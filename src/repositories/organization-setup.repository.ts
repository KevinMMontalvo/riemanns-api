import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {OrganizationSetup, OrganizationSetupRelations} from '../models';

export class OrganizationSetupRepository extends DefaultCrudRepository<
  OrganizationSetup,
  typeof OrganizationSetup.prototype.id,
  OrganizationSetupRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(OrganizationSetup, dataSource);
  }
}
