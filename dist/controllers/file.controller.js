"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const multer_1 = tslib_1.__importDefault(require("multer"));
const path_1 = tslib_1.__importDefault(require("path"));
const lib_1 = require("../lib");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
(0, multer_1.default)({
    limits: { fileSize: lib_1.UploadFilesKeys.MAX_FILE_SIZE },
});
let FileController = class FileController {
    constructor(fileRepository, classroomRepository, userRepository) {
        this.fileRepository = fileRepository;
        this.classroomRepository = classroomRepository;
        this.userRepository = userRepository;
    }
    async create(file) {
        return this.fileRepository.create(file);
    }
    async count(where) {
        return this.fileRepository.count(where);
    }
    async find(filter) {
        return this.fileRepository.find(filter);
    }
    async updateAll(file, where) {
        return this.fileRepository.updateAll(file, where);
    }
    async findById(id, filter) {
        return this.fileRepository.findById(id, filter);
    }
    async updateById(id, file) {
        await this.fileRepository.updateById(id, file);
    }
    async replaceById(id, file) {
        await this.fileRepository.replaceById(id, file);
    }
    async deleteById(id) {
        const classrooms = await this.classroomRepository.find();
        for (let i = 0; i < classrooms.length; i++) {
            let classroom = classrooms[i];
            if (classroom.videos != null && classroom.files.find(s => s === id) != null) {
                let index = classroom.files.indexOf(id);
                classroom.files.splice(index, 1);
                await this.classroomRepository.updateById(classroom.id, classroom);
            }
            else if (classroom.videos != null && classroom.videos.find(s => s === id) != null) {
                let index = classroom.videos.indexOf(id);
                classroom.videos.splice(index, 1);
                await this.classroomRepository.updateById(classroom.id, classroom);
            }
        }
        await this.fileRepository.deleteById(id);
    }
    async uploadFileByClassroom(id, response, request) {
        const classroom = await this.classroomRepository.findById(id);
        if (classroom) {
            const filePath = path_1.default.join(__dirname, lib_1.UploadFilesKeys.FILES_PATH);
            let res = await this.StoreFileToPath(filePath, lib_1.UploadFilesKeys.FIELDNAME, request, response, lib_1.UploadFilesKeys.ACCEPTED_EXT);
            if (res) {
                const file = {
                    name: request.file.originalname,
                    size: request.file.size,
                    type: request.file.mimetype,
                    uploaded: new Date().toDateString(),
                    url: 'https://' + request.headers.host + '/' + request.file.filename,
                    user: classroom.teacher.toString(),
                    extension: request.file.originalname.substr(request.file.originalname.lastIndexOf('.') + 1),
                };
                const files = classroom.files ? classroom.files : [];
                const createdFile = await this.fileRepository.create(file);
                files.push(createdFile.getId());
                classroom.files = files;
                await this.classroomRepository.updateById(classroom.getId(), classroom);
                return createdFile;
            }
        }
        else {
            throw new rest_1.HttpErrors.NotFound('El curso al que se desea subir archivos no existe.');
        }
    }
    async uploadVideoByClassroom(id, response, request) {
        const classroom = await this.classroomRepository.findById(id);
        if (classroom) {
            const filePath = path_1.default.join(__dirname, lib_1.UploadFilesKeys.FILES_PATH);
            let res = await this.StoreFileToPath(filePath, lib_1.UploadFilesKeys.FIELDNAME, request, response, lib_1.UploadFilesKeys.ACCEPTED_EXT);
            if (res) {
                const file = {
                    name: request.file.originalname,
                    size: request.file.size,
                    type: request.file.mimetype,
                    uploaded: new Date().toDateString(),
                    url: 'https://' + request.headers.host + '/' + request.file.filename,
                    user: classroom.teacher.toString(),
                    extension: request.file.originalname.substr(request.file.originalname.lastIndexOf('.') + 1),
                };
                const videos = classroom.videos ? classroom.videos : [];
                const createdVideo = await this.fileRepository.create(file);
                videos.push(createdVideo.getId());
                classroom.videos = videos;
                await this.classroomRepository.updateById(classroom.getId(), classroom);
                return createdVideo;
            }
        }
        else {
            throw new rest_1.HttpErrors.NotFound('El curso al que se desea subir archivos no existe.');
        }
    }
    async uploadFileByUser(id, response, request) {
        const user = await this.userRepository.findById(id);
        if (user) {
            const filePath = path_1.default.join(__dirname, lib_1.UploadFilesKeys.FILES_PATH);
            let res = await this.StoreFileToPath(filePath, lib_1.UploadFilesKeys.FIELDNAME, request, response, lib_1.UploadFilesKeys.ACCEPTED_EXT);
            if (res) {
                const file = {
                    name: request.file.originalname,
                    size: request.file.size,
                    type: request.file.mimetype,
                    uploaded: new Date().toDateString(),
                    url: 'https://' + request.headers.host + '/' + request.file.filename,
                    user: user.getId(),
                    extension: request.file.originalname.substr(request.file.originalname.lastIndexOf('.') + 1),
                };
                const createdFile = await this.fileRepository.create(file);
                return createdFile;
            }
        }
        else {
            throw new rest_1.HttpErrors.NotFound('El curso al que se desea subir archivos no existe.');
        }
    }
    async uploadProfilePhoto(id, response, request) {
        let user = await this.userRepository.findById(id);
        if (!user) {
            throw new rest_1.HttpErrors.NotFound('El usuario no existe');
        }
        const filePath = path_1.default.join(__dirname, lib_1.UploadFilesKeys.FILES_PATH + 'profilePhotos/');
        let res = await this.StoreFileToPath(filePath, lib_1.UploadFilesKeys.FIELDNAME, request, response, lib_1.UploadFilesKeys.ACCEPTED_EXT);
        if (res) {
            const file = {
                name: request.file.originalname,
                size: request.file.size,
                type: request.file.mimetype,
                uploaded: new Date().toDateString(),
                url: 'http://' + request.headers.host + '/profilePhotos/' + request.file.filename,
                user: user.toString(),
                extension: request.file.originalname.substr(request.file.originalname.lastIndexOf('.') + 1),
            };
            const createdFile = await this.fileRepository.create(file);
            user.photo = file.url;
            await this.userRepository.updateById(user.getId(), user);
            return createdFile;
        }
    }
    // almacenamiento
    GetMulterStorageConfig(storagePath) {
        var filename = '';
        const storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, storagePath);
            },
            filename: function (req, file, cb) {
                filename = `${Date.now()}-${file.originalname}`;
                cb(null, filename);
            },
        });
        return storage;
    }
    StoreFileToPath(storePath, fieldname, request, response, acceptedExt) {
        return new Promise((resolve, reject) => {
            const storage = this.GetMulterStorageConfig(storePath);
            const upload = (0, multer_1.default)({
                storage: storage,
                fileFilter: function (req, file, callback) {
                    var ext = path_1.default.extname(file.originalname).toUpperCase();
                    if (acceptedExt.includes(ext)) {
                        return callback(null, true);
                    }
                    return callback(new rest_1.HttpErrors[400]('This format file is not supported.'));
                },
                limits: {
                    fileSize: lib_1.UploadFilesKeys.MAX_FILE_SIZE,
                },
            }).single(fieldname);
            upload(request, response, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/files', {
        responses: {
            '200': {
                description: 'File model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.File) } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.File, {
                    title: 'NewFile',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/files/count', {
        responses: {
            '200': {
                description: 'File model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.File)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/files', {
        responses: {
            '200': {
                description: 'Array of File model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: (0, rest_1.getModelSchemaRef)(models_1.File, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.File)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/files', {
        responses: {
            '200': {
                description: 'File PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.File, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.File)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.File, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/files/{id}', {
        responses: {
            '200': {
                description: 'File model instance',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.File, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.File, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/files/{id}', {
        responses: {
            '204': {
                description: 'File PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.File, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.File]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/files/{id}', {
        responses: {
            '204': {
                description: 'File PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.File]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/files/{id}', {
        responses: {
            '204': {
                description: 'File DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, rest_1.post)('/uploadFile/byClassroom/{id}', {
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                        },
                    },
                },
                description: 'Upload file',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, rest_1.requestBody.file()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "uploadFileByClassroom", null);
tslib_1.__decorate([
    (0, rest_1.post)('/uploadVideo/byClassroom/{id}', {
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                        },
                    },
                },
                description: 'Upload video',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, rest_1.requestBody.file()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "uploadVideoByClassroom", null);
tslib_1.__decorate([
    (0, rest_1.post)('/uploadFile/byUser/{id}', {
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                        },
                    },
                },
                description: 'Upload file',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, rest_1.requestBody.file()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "uploadFileByUser", null);
tslib_1.__decorate([
    (0, rest_1.post)('/uploadProfilePhoto/{userId}'),
    tslib_1.__param(0, rest_1.param.path.string('userId')),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, rest_1.requestBody.file()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "uploadProfilePhoto", null);
FileController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.FileRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.ClassroomRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FileRepository,
        repositories_1.ClassroomRepository,
        repositories_1.UserRepository])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map