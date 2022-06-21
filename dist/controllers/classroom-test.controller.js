"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomTestController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ClassroomTestController = class ClassroomTestController {
    constructor(classroomRepository) {
        this.classroomRepository = classroomRepository;
    }
    async find(id, filter) {
        return this.classroomRepository.tests(id).find(filter);
    }
    async create(id, test) {
        return this.classroomRepository.tests(id).create(test);
    }
    async patch(id, test, where) {
        return this.classroomRepository.tests(id).patch(test, where);
    }
    async delete(id, where) {
        return this.classroomRepository.tests(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/classrooms/{id}/tests', {
        responses: {
            '200': {
                description: 'Array of Classroom has many Test',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Test) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomTestController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/classrooms/{id}/tests', {
        responses: {
            '200': {
                description: 'Classroom model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Test) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Test, {
                    title: 'NewTestInClassroom',
                    exclude: ['id'],
                    optional: ['classroomId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomTestController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/classrooms/{id}/tests', {
        responses: {
            '200': {
                description: 'Classroom.Test PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Test, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Test))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomTestController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/classrooms/{id}/tests', {
        responses: {
            '200': {
                description: 'Classroom.Test DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Test))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomTestController.prototype, "delete", null);
ClassroomTestController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ClassroomRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ClassroomRepository])
], ClassroomTestController);
exports.ClassroomTestController = ClassroomTestController;
//# sourceMappingURL=classroom-test.controller.js.map