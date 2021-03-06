"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let GradeController = class GradeController {
    constructor(gradeRepository) {
        this.gradeRepository = gradeRepository;
    }
    async create(grade) {
        return this.gradeRepository.create(grade);
    }
    async find(filter) {
        return this.gradeRepository.find(filter);
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
};
tslib_1.__decorate([
    (0, rest_1.post)('/grades'),
    (0, rest_1.response)(200, {
        description: 'Grade model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Grade) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Grade, {
                    title: 'NewGrade',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GradeController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/grades'),
    (0, rest_1.response)(200, {
        description: 'Array of Grade model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Grade, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Grade)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GradeController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.get)('/grades/{id}'),
    (0, rest_1.response)(200, {
        description: 'Grade model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Grade, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Grade, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GradeController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/grades/{id}'),
    (0, rest_1.response)(204, {
        description: 'Grade PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Grade, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Grade]),
    tslib_1.__metadata("design:returntype", Promise)
], GradeController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/grades/{id}'),
    (0, rest_1.response)(204, {
        description: 'Grade PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Grade]),
    tslib_1.__metadata("design:returntype", Promise)
], GradeController.prototype, "replaceById", null);
GradeController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.GradeRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.GradeRepository])
], GradeController);
exports.GradeController = GradeController;
//# sourceMappingURL=grade.controller.js.map