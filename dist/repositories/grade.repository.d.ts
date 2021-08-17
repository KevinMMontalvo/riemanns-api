import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDataSource } from '../datasources';
import { Grade, GradeRelations } from '../models';
export declare class GradeRepository extends DefaultCrudRepository<Grade, typeof Grade.prototype.id, GradeRelations> {
    constructor(dataSource: MongoDataSource);
}
