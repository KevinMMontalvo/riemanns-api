import { Count, Filter, Where } from '@loopback/repository';
import { Test, Question } from '../models';
import { TestRepository } from '../repositories';
export declare class TestQuestionController {
    protected testRepository: TestRepository;
    constructor(testRepository: TestRepository);
    find(id: string, filter?: Filter<Question>): Promise<Question[]>;
    create(id: typeof Test.prototype.id, question: Omit<Question, 'id'>): Promise<Question>;
    patch(id: string, question: Partial<Question>, where?: Where<Question>): Promise<Count>;
    delete(id: string, where?: Where<Question>): Promise<Count>;
}
