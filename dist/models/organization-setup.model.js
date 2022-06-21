"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSetup = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let OrganizationSetup = class OrganizationSetup extends repository_1.Entity {
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
], OrganizationSetup.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], OrganizationSetup.prototype, "key", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], OrganizationSetup.prototype, "value", void 0);
OrganizationSetup = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], OrganizationSetup);
exports.OrganizationSetup = OrganizationSetup;
//# sourceMappingURL=organization-setup.model.js.map