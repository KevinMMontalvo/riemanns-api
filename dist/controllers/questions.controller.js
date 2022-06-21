"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let QuestionsController = class QuestionsController {
    constructor(questionRepository) {
        this.questionRepository = questionRepository;
    }
    async create(question) {
        return this.questionRepository.create(question);
    }
    async createMultiple(questions) {
        return this.questionRepository.createAll(questions);
    }
    async count(where) {
        return this.questionRepository.count(where);
    }
    async find(filter) {
        return this.questionRepository.find(filter);
    }
    async updateAll(question, where) {
        return this.questionRepository.updateAll(question, where);
    }
    async findById(id, filter) {
        return this.questionRepository.findById(id, filter);
    }
    async updateById(id, question) {
        await this.questionRepository.updateById(id, question);
    }
    async replaceById(id, question) {
        await this.questionRepository.replaceById(id, question);
    }
    async deleteById(id) {
        await this.questionRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/questions'),
    (0, rest_1.response)(200, {
        description: 'Question model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Question) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Question, {
                    title: 'NewQuestion',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionsController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.post)('/questions/postMultiple'),
    (0, rest_1.response)(200),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {},
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionsController.prototype, "createMultiple", null);
tslib_1.__decorate([
    (0, rest_1.get)('/questions/count'),
    (0, rest_1.response)(200, {
        description: 'Question model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Question)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionsController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/questions'),
    (0, rest_1.response)(200, {
        description: 'Array of Question model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Question, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Question)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionsController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/questions'),
    (0, rest_1.response)(200, {
        description: 'Question PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Question, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Question)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Question, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionsController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/questions/{id}'),
    (0, rest_1.response)(200, {
        description: 'Question model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Question, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Question, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionsController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/questions/{id}'),
    (0, rest_1.response)(204, {
        description: 'Question PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Question, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Question]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionsController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/questions/{id}'),
    (0, rest_1.response)(204, {
        description: 'Question PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Question]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionsController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/questions/{id}'),
    (0, rest_1.response)(204, {
        description: 'Question DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], QuestionsController.prototype, "deleteById", null);
QuestionsController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.QuestionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.QuestionRepository])
], QuestionsController);
exports.QuestionsController = QuestionsController;
//# sourceMappingURL=questions.controller.js.map