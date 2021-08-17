"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let GradesController = class GradesController {
    constructor(gradeRepository) {
        this.gradeRepository = gradeRepository;
    }
    async create(grade) {
        return this.gradeRepository.create(grade);
    }
    async count(where) {
        return this.gradeRepository.count(where);
    }
    async find(filter) {
        return this.gradeRepository.find(filter);
    }
    async updateAll(grade, where) {
        return this.gradeRepository.updateAll(grade, where);
    }
    async findById(id, filter) {
        return this.gradeRepository.findById(id, filter);
    }
    async updateById(id, grade) {
        await this.gradeRepository.updateById(id, grade);
    }
    async replaceById(id, grade) {
        await this.gradeRepository.replaceById(id, grade);
    }
    async deleteById(id) {
        await this.gradeRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/grades'),
    rest_1.response(200, {
        description: 'Grade model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Grade) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Grade, {
                    title: 'NewGrade',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GradesController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/grades/count'),
    rest_1.response(200, {
        description: 'Grade model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Grade)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GradesController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/grades'),
    rest_1.response(200, {
        description: 'Array of Grade model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Grade, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Grade)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GradesController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/grades'),
    rest_1.response(200, {
        description: 'Grade PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Grade, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Grade)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Grade, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GradesController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/grades/{id}'),
    rest_1.response(200, {
        description: 'Grade model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Grade, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Grade, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GradesController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/grades/{id}'),
    rest_1.response(204, {
        description: 'Grade PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Grade, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Grade]),
    tslib_1.__metadata("design:returntype", Promise)
], GradesController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/grades/{id}'),
    rest_1.response(204, {
        description: 'Grade PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Grade]),
    tslib_1.__metadata("design:returntype", Promise)
], GradesController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/grades/{id}'),
    rest_1.response(204, {
        description: 'Grade DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GradesController.prototype, "deleteById", null);
GradesController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.GradeRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.GradeRepository])
], GradesController);
exports.GradesController = GradesController;
//# sourceMappingURL=grades.controller.js.map