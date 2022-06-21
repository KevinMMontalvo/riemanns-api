"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let ClassroomRepository = class ClassroomRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, gradeRepositoryGetter, testRepositoryGetter) {
        super(models_1.Classroom, dataSource);
        this.gradeRepositoryGetter = gradeRepositoryGetter;
        this.testRepositoryGetter = testRepositoryGetter;
        this.tests = this.createHasManyRepositoryFactoryFor('tests', testRepositoryGetter);
        this.registerInclusionResolver('tests', this.tests.inclusionResolver);
        this.grades = this.createHasManyRepositoryFactoryFor('grades', gradeRepositoryGetter);
        this.registerInclusionResolver('grades', this.grades.inclusionResolver);
    }
};
ClassroomRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mongo')),
    tslib_1.__param(1, repository_1.repository.getter('GradeRepository')),
    tslib_1.__param(2, repository_1.repository.getter('TestRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDataSource, Function, Function])
], ClassroomRepository);
exports.ClassroomRepository = ClassroomRepository;
//# sourceMappingURL=classroom.repository.js.map