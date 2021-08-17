import { DefaultCrudRepository } from '@loopback/repository';
import { File, FileRelations } from '../models';
import { MongoDataSource } from '../datasources';
export declare class FileRepository extends DefaultCrudRepository<File, typeof File.prototype.id, FileRelations> {
    constructor(dataSource: MongoDataSource);
}
