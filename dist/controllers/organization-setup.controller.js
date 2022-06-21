"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSetupController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let OrganizationSetupController = class OrganizationSetupController {
    constructor(organizationSetupRepository) {
        this.organizationSetupRepository = organizationSetupRepository;
    }
    /*@post('/organization-setups')
    @response(200, {
      description: 'OrganizationSetup model instance',
      content: {'application/json': {schema: getModelSchemaRef(OrganizationSetup)}},
    })
    async create(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(OrganizationSetup, {
              title: 'NewOrganizationSetup',
              exclude: ['id'],
            }),
          },
        },
      })
      organizationSetup: Omit<OrganizationSetup, 'id'>,
    ): Promise<OrganizationSetup> {
      return this.organizationSetupRepository.create(organizationSetup);
    }*/
    async find(filter) {
        return this.organizationSetupRepository.find(filter);
    }
    async findById(id, filter) {
        return this.organizationSetupRepository.findById(id, filter);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/organization-setups'),
    (0, rest_1.response)(200, {
        description: 'Array of OrganizationSetup model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.OrganizationSetup, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.OrganizationSetup)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrganizationSetupController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.get)('/organization-setups/{id}'),
    (0, rest_1.response)(200, {
        description: 'OrganizationSetup model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.OrganizationSetup, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.OrganizationSetup, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrganizationSetupController.prototype, "findById", null);
OrganizationSetupController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.OrganizationSetupRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.OrganizationSetupRepository])
], OrganizationSetupController);
exports.OrganizationSetupController = OrganizationSetupController;
//# sourceMappingURL=organization-setup.controller.js.map