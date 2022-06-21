"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestQuestionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let TestQuestionController = class TestQuestionController {
    constructor(testRepository) {
        this.testRepository = testRepository;
    }
    async find(id, filter) {
        return this.testRepository.questions(id).find(filter);
    }
    async create(id, question) {
        return this.testRepository.questions(id).create(question);
    }
    async patch(id, question, where) {
        return this.testRepository.questions(id).patch(question, where);
    }
    async delete(id, where) {
        return this.testRepository.questions(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/tests/{id}/questions', {
        responses: {
            '200': {
                description: 'Array of Test has many Question',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Question) },
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
], TestQuestionController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/tests/{id}/questions', {
        responses: {
            '200': {
                description: 'Test model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Question) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Question, {
                    title: 'NewQuestionInTest',
                    exclude: ['id'],
                    optional: ['testId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TestQuestionController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/tests/{id}/questions', {
        responses: {
            '200': {
                description: 'Test.Question PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Question, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Question))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TestQuestionController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/tests/{id}/questions', {
        responses: {
            '200': {
                description: 'Test.Question DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Question))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TestQuestionController.prototype, "delete", null);
TestQuestionController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.TestRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TestRepository])
], TestQuestionController);
exports.TestQuestionController = TestQuestionController;
//# sourceMappingURL=test-question.controller.js.map