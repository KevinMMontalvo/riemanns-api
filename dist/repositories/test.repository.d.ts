import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDataSource } from '../datasources';
import { Test, TestRelations } from '../models';
export declare class TestRepository extends DefaultCrudRepository<Test, typeof Test.prototype.id, TestRelations> {
    constructor(dataSource: MongoDataSource);
}
