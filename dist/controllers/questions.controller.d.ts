import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Question } from '../models';
import { QuestionRepository } from '../repositories';
export declare class QuestionsController {
    questionRepository: QuestionRepository;
    constructor(questionRepository: QuestionRepository);
    create(question: Omit<Question, 'id'>): Promise<Question>;
    createMultiple(questions: Array<Question>): Promise<Question[]>;
    count(where?: Where<Question>): Promise<Count>;
    find(filter?: Filter<Question>): Promise<Question[]>;
    updateAll(question: Question, where?: Where<Question>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Question>): Promise<Question>;
    updateById(id: string, question: Question): Promise<void>;
    replaceById(id: string, question: Question): Promise<void>;
    deleteById(id: string): Promise<void>;
}
