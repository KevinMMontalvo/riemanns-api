import { DefaultCrudRepository } from '@loopback/repository';
import { MongoDataSource } from '../datasources';
import { Grades, GradesRelations } from '../models';
export declare class GradesRepository extends DefaultCrudRepository<Grades, typeof Grades.prototype.id, GradesRelations> {
    constructor(dataSource: MongoDataSource);
}
