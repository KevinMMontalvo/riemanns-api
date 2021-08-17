import { DefaultCrudRepository } from '@loopback/repository';
import { Profile, ProfileRelations } from '../models';
import { MongoDataSource } from '../datasources';
export declare class ProfileRepository extends DefaultCrudRepository<Profile, typeof Profile.prototype.id, ProfileRelations> {
    constructor(dataSource: MongoDataSource);
}
