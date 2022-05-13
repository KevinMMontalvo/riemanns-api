import { Count, Filter, Where } from '@loopback/repository';
import { Classroom, Test } from '../models';
import { ClassroomRepository } from '../repositories';
export declare class ClassroomTestController {
    protected classroomRepository: ClassroomRepository;
    constructor(classroomRepository: ClassroomRepository);
    find(id: string, filter?: Filter<Test>): Promise<Test[]>;
    create(id: typeof Classroom.prototype.id, test: Omit<Test, 'id'>): Promise<Test>;
    patch(id: string, test: Partial<Test>, where?: Where<Test>): Promise<Count>;
    delete(id: string, where?: Where<Test>): Promise<Count>;
}
