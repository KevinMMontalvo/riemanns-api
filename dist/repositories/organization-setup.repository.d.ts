import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDataSource } from '../datasources';
import { OrganizationSetup, OrganizationSetupRelations } from '../models';
export declare class OrganizationSetupRepository extends DefaultCrudRepository<OrganizationSetup, typeof OrganizationSetup.prototype.id, OrganizationSetupRelations> {
    constructor(dataSource: MongoDataSource);
}
