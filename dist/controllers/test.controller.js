"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let TestController = class TestController {
    constructor(testRepository) {
        this.testRepository = testRepository;
    }
    async create(test) {
        return this.testRepository.create(test);
    }
    async count(where) {
        return this.testRepository.count(where);
    }
    async find(filter) {
        return this.testRepository.find(filter);
    }
    async updateAll(test, where) {
        return this.testRepository.updateAll(test, where);
    }
    async findById(id, filter) {
        return this.testRepository.findById(id, filter);
    }
    async updateById(id, test) {
        await this.testRepository.updateById(id, test);
    }
    async replaceById(id, test) {
        await this.testRepository.replaceById(id, test);
    }
    async deleteById(id) {
        await this.testRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/tests'),
    (0, rest_1.response)(200, {
        description: 'Test model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Test) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Test, {
                    title: 'NewTest',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/tests/count'),
    (0, rest_1.response)(200, {
        description: 'Test model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Test)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/tests'),
    (0, rest_1.response)(200, {
        description: 'Array of Test model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Test, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Test)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/tests'),
    (0, rest_1.response)(200, {
        description: 'Test PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Test, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Test)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Test, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/tests/{id}'),
    (0, rest_1.response)(200, {
        description: 'Test model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Test, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Test, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/tests/{id}'),
    (0, rest_1.response)(204, {
        description: 'Test PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Test, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Test]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/tests/{id}'),
    (0, rest_1.response)(204, {
        description: 'Test PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Test]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/tests/{id}'),
    (0, rest_1.response)(204, {
        description: 'Test DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TestController.prototype, "deleteById", null);
TestController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.TestRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TestRepository])
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=test.controller.js.map