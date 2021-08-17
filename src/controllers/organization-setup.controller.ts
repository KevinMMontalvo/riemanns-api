import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {OrganizationSetup} from '../models';
import {OrganizationSetupRepository} from '../repositories';

export class OrganizationSetupController {
  constructor(
    @repository(OrganizationSetupRepository)
    public organizationSetupRepository : OrganizationSetupRepository,
  ) {}

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

  @get('/organization-setups')
  @response(200, {
    description: 'Array of OrganizationSetup model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrganizationSetup, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrganizationSetup) filter?: Filter<OrganizationSetup>,
  ): Promise<OrganizationSetup[]> {
    return this.organizationSetupRepository.find(filter);
  }

  @get('/organization-setups/{id}')
  @response(200, {
    description: 'OrganizationSetup model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrganizationSetup, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrganizationSetup, {exclude: 'where'}) filter?: FilterExcludingWhere<OrganizationSetup>
  ): Promise<OrganizationSetup> {
    return this.organizationSetupRepository.findById(id, filter);
  }
}
