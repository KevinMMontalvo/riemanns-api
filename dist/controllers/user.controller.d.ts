import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Credentials, User } from '../models';
import { ClassroomRepository } from '../repositories';
import { UserRepository } from '../repositories';
export declare class UserController {
    userRepository: UserRepository;
    classroomRepository: ClassroomRepository;
    constructor(userRepository: UserRepository, classroomRepository: ClassroomRepository);
    create(user: Omit<User, 'id'>): Promise<User>;
    count(where?: Where<User>): Promise<Count>;
    find(filter?: Filter<User>): Promise<User[]>;
    updateAll(user: User, where?: Where<User>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<User>): Promise<User>;
    updateById(id: string, user: User): Promise<void>;
    replaceById(id: string, user: User): Promise<void>;
    deleteById(id: string): Promise<void>;
    authenticate(credentials: Credentials): Promise<User>;
    findByProfile(profile: string): Promise<User[]>;
}
