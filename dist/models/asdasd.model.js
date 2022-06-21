"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asdasd = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Asdasd = class Asdasd extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Asdasd.prototype, "options", void 0);
Asdasd = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Asdasd);
exports.Asdasd = Asdasd;
//# sourceMappingURL=asdasd.model.js.map