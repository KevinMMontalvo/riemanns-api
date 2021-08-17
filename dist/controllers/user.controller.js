"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const repositories_2 = require("../repositories");
let UserController = class UserController {
    constructor(userRepository, classroomRepository) {
        this.userRepository = userRepository;
        this.classroomRepository = classroomRepository;
    }
    async create(user) {
        const emailFilter = { where: { email: user.email } };
        const userByEmail = await this.userRepository.findOne(emailFilter);
        if (userByEmail) {
            throw new rest_1.HttpErrors.Conflict('El correo ya se encuentra en uso.');
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const password = await bcrypt_1.default.hash(user.password, salt);
        user.password = password;
        return this.userRepository.create(user);
    }
    async count(where) {
        return this.userRepository.count(where);
    }
    async find(filter) {
        return this.userRepository.find(filter);
    }
    async updateAll(user, where) {
        return this.userRepository.updateAll(user, where);
    }
    async findById(id, filter) {
        return this.userRepository.findById(id, filter);
    }
    async updateById(id, user) {
        if (user.password) {
            const salt = await bcrypt_1.default.genSalt(10);
            const password = await bcrypt_1.default.hash(user.password, salt);
            user.password = password;
        }
        await this.userRepository.updateById(id, user);
    }
    async replaceById(id, user) {
        await this.userRepository.replaceById(id, user);
    }
    async deleteById(id) {
        const classrooms = await this.classroomRepository.find();
        for (let i = 0; i < classrooms.length; i++) {
            let classroom = classrooms[i];
            if (classroom.students != null && classroom.students.find(s => s === id) != null) {
                let index = classroom.students.indexOf(id);
                classroom.students.splice(index, 1);
                await this.classroomRepository.updateById(classroom.id, classroom);
            }
        }
        await this.userRepository.deleteById(id);
    }
    async authenticate(credentials) {
        const emailFilter = { where: { email: credentials.email } };
        const user = await this.userRepository.findOne(emailFilter);
        if (!user) {
            throw new rest_1.HttpErrors.NotFound('Usuario no registrado.');
        }
        const authorized = await bcrypt_1.default.compare(credentials.password, user.password);
        if (!authorized) {
            throw new rest_1.HttpErrors.Unauthorized('Correo o contraseña incorrectos');
        }
        return user;
    }
    async findByProfile(profile) {
        const profileFilter = { where: { profile } };
        return this.userRepository.find(profileFilter);
    }
};
tslib_1.__decorate([
    rest_1.post('/users', {
        responses: {
            '200': {
                description: 'User model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.User) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.User, {
                    title: 'NewUser',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/users/count', {
        responses: {
            '200': {
                description: 'User model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.User)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/users', {
        responses: {
            '200': {
                description: 'Array of User model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.User, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.User)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/users', {
        responses: {
            '200': {
                description: 'User PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.User, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.User)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.User, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/users/{id}', {
        responses: {
            '200': {
                description: 'User model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.User, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.User, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/users/{id}', {
        responses: {
            '204': {
                description: 'User PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.User, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/users/{id}', {
        responses: {
            '204': {
                description: 'User PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.User]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/users/{id}', {
        responses: {
            '204': {
                description: 'User DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.post('/users/authenticate', {
        responses: {
            '200': {
                description: 'User model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.User) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                credentials: models_1.Credentials,
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Credentials]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "authenticate", null);
tslib_1.__decorate([
    rest_1.get('/usersByProfile/{profile}', {
        responses: {
            '200': {
                description: 'User model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.User, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('profile')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findByProfile", null);
UserController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_2.UserRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.ClassroomRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_2.UserRepository,
        repositories_1.ClassroomRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map