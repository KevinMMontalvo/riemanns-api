/// <reference types="express" />
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { File } from '../models';
import { ClassroomRepository, FileRepository, UserRepository } from '../repositories';
export declare class FileController {
    fileRepository: FileRepository;
    classroomRepository: ClassroomRepository;
    userRepository: UserRepository;
    constructor(fileRepository: FileRepository, classroomRepository: ClassroomRepository, userRepository: UserRepository);
    create(file: Omit<File, 'id'>): Promise<File>;
    count(where?: Where<File>): Promise<Count>;
    find(filter?: Filter<File>): Promise<File[]>;
    updateAll(file: File, where?: Where<File>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<File>): Promise<File>;
    updateById(id: string, file: File): Promise<void>;
    replaceById(id: string, file: File): Promise<void>;
    deleteById(id: string): Promise<void>;
    uploadFileByClassroom(id: string, response: Response, request: Request): Promise<any>;
    uploadVideoByClassroom(id: string, response: Response, request: Request): Promise<any>;
    uploadFileByUser(id: string, response: Response, request: Request): Promise<any>;
    uploadProfilePhoto(id: string, response: Response, request: Request): Promise<any>;
    private GetMulterStorageConfig;
    private StoreFileToPath;
}
