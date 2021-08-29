"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grade = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Grade = class Grade extends repository_1.Entity {
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
], Grade.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'any',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Grade.prototype, "grade", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Grade.prototype, "userId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Grade.prototype, "classroomId", void 0);
Grade = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Grade);
exports.Grade = Grade;
//# sourceMappingURL=grade.model.js.map