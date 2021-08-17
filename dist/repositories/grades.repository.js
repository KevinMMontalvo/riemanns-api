"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradesRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let GradesRepository = class GradesRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Grades, dataSource);
    }
};
GradesRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mongo')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDataSource])
], GradesRepository);
exports.GradesRepository = GradesRepository;
//# sourceMappingURL=grades.repository.js.map