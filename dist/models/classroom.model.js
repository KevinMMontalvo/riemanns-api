"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Classroom = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const event_model_1 = require("./event.model");
const grade_model_1 = require("./grade.model");
const test_model_1 = require("./test.model");
let Classroom = class Classroom extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Classroom.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Classroom.prototype, "code", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Classroom.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Classroom.prototype, "students", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Classroom.prototype, "files", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Classroom.prototype, "videos", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Classroom.prototype, "teacher", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: event_model_1.Event,
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Classroom.prototype, "events", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'any',
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Classroom.prototype, "blogs", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'any',
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Classroom.prototype, "forums", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'any',
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Classroom.prototype, "quizzes", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'any',
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], Classroom.prototype, "activities", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => grade_model_1.Grade),
    tslib_1.__metadata("design:type", Array)
], Classroom.prototype, "grades", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => test_model_1.Test),
    tslib_1.__metadata("design:type", Array)
], Classroom.prototype, "tests", void 0);
Classroom = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Classroom);
exports.Classroom = Classroom;
//# sourceMappingURL=classroom.model.js.map