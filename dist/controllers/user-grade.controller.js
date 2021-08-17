"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGradeController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UserGradeController = class UserGradeController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async find(id, filter) {
        return this.userRepository.grades(id).find(filter);
    }
    async patch(id, grade, where) {
        return this.userRepository.grades(id).patch(grade, where);
    }
};
tslib_1.__decorate([
    rest_1.get('/users/{id}/grades', {
        responses: {
            '200': {
                description: 'Array of User has many Grade',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: rest_1.getModelSchemaRef(models_1.Grade) },
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
], UserGradeController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/users/{id}/grades', {
        responses: {
            '200': {
                description: 'User.Grade PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Grade, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Grade))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserGradeController.prototype, "patch", null);
UserGradeController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], UserGradeController);
exports.UserGradeController = UserGradeController;
//# sourceMappingURL=user-grade.controller.js.map