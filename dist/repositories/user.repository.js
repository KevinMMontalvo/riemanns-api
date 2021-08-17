"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let UserRepository = class UserRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, gradeRepositoryGetter) {
        super(models_1.User, dataSource);
        this.gradeRepositoryGetter = gradeRepositoryGetter;
        this.grades = this.createHasManyRepositoryFactoryFor('grades', gradeRepositoryGetter);
        this.registerInclusionResolver('grades', this.grades.inclusionResolver);
    }
};
UserRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mongo')),
    tslib_1.__param(1, repository_1.repository.getter('GradeRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDataSource, Function])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map