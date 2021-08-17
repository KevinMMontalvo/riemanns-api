import { Count, Filter, Where } from '@loopback/repository';
import { Grade } from '../models';
import { UserRepository } from '../repositories';
export declare class UserGradeController {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    find(id: string, filter?: Filter<Grade>): Promise<Grade[]>;
    patch(id: string, grade: Partial<Grade>, where?: Where<Grade>): Promise<Count>;
}
