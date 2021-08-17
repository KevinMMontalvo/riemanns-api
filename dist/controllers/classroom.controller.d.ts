import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Classroom } from '../models';
import { ClassroomRepository, FileRepository, UserRepository } from '../repositories';
export declare class ClassroomController {
    classroomRepository: ClassroomRepository;
    userRepository: UserRepository;
    fileRepository: FileRepository;
    constructor(classroomRepository: ClassroomRepository, userRepository: UserRepository, fileRepository: FileRepository);
    create(classroom: Omit<Classroom, 'id'>): Promise<Classroom>;
    count(where?: Where<Classroom>): Promise<Count>;
    find(filter?: Filter<Classroom>): Promise<Classroom[]>;
    updateAll(classroom: Classroom, where?: Where<Classroom>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Classroom>): Promise<Classroom>;
    updateById(id: string, classroom: Classroom): Promise<void>;
    replaceById(id: string, classroom: Classroom): Promise<void>;
    deleteById(id: string): Promise<void>;
    findByTeacherId(id: string, filter?: Filter<Classroom>): Promise<Classroom[]>;
    findByStudentId(id: string, filter?: Filter<Classroom>): Promise<Classroom[]>;
    addIntervention(forumId: string, classroomId: string, intervention: any): Promise<void>;
    addActivity(activityId: string, classroomId: string, activity: any): Promise<void>;
    addQuiz(quizId: string, classroomId: string, quiz: any): Promise<void>;
}
