"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let TestRepository = class TestRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, questionRepositoryGetter) {
        super(models_1.Test, dataSource);
        this.questionRepositoryGetter = questionRepositoryGetter;
        this.questions = this.createHasManyRepositoryFactoryFor('questions', questionRepositoryGetter);
        this.registerInclusionResolver('questions', this.questions.inclusionResolver);
    }
};
TestRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongo')),
    tslib_1.__param(1, repository_1.repository.getter('QuestionRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDataSource, Function])
], TestRepository);
exports.TestRepository = TestRepository;
//# sourceMappingURL=test.repository.js.map