"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Option = class Option extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Option.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Option.prototype, "text", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Option.prototype, "isCorrect", void 0);
Option = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Option);
exports.Option = Option;
//# sourceMappingURL=option.model.js.map