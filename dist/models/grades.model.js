"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grades = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Grades = class Grades extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Grades.prototype, "grade", void 0);
Grades = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Grades);
exports.Grades = Grades;
//# sourceMappingURL=grades.model.js.map