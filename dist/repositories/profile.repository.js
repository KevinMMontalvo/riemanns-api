"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let ProfileRepository = class ProfileRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Profile, dataSource);
    }
};
ProfileRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongo')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDataSource])
], ProfileRepository);
exports.ProfileRepository = ProfileRepository;
//# sourceMappingURL=profile.repository.js.map