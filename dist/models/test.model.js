"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Test = class Test extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Test.prototype, "tet", void 0);
Test = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Test);
exports.Test = Test;
//# sourceMappingURL=test.model.js.map