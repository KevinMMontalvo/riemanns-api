"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomGradeController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ClassroomGradeController = class ClassroomGradeController {
    constructor(classroomRepository) {
        this.classroomRepository = classroomRepository;
    }
    async find(id, filter) {
        return this.classroomRepository.grades(id).find(filter);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/classrooms/{id}/grades', {
        responses: {
            '200': {
                description: 'Array of Classroom has many Grade',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Grade) },
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
], ClassroomGradeController.prototype, "find", null);
ClassroomGradeController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ClassroomRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ClassroomRepository])
], ClassroomGradeController);
exports.ClassroomGradeController = ClassroomGradeController;
//# sourceMappingURL=classroom-grade.controller.js.map