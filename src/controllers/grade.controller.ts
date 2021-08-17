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
import {Grade} from '../models';
import {GradeRepository} from '../repositories';

export class GradeController {
  constructor(
    @repository(GradeRepository)
    public gradeRepository : GradeRepository,
  ) {}

  @post('/grades')
  @response(200, {
    description: 'Grade model instance',
    content: {'application/json': {schema: getModelSchemaRef(Grade)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grade, {
            title: 'NewGrade',
            exclude: ['id'],
          }),
        },
      },
    })
    grade: Omit<Grade, 'id'>,
  ): Promise<Grade> {
    return this.gradeRepository.create(grade);
  }

  @get('/grades')
  @response(200, {
    description: 'Array of Grade model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Grade, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Grade) filter?: Filter<Grade>,
  ): Promise<Grade[]> {
    return this.gradeRepository.find(filter);
  }

  @get('/grades/{id}')
  @response(200, {
    description: 'Grade model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Grade, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Grade, {exclude: 'where'}) filter?: FilterExcludingWhere<Grade>
  ): Promise<Grade> {
    return this.gradeRepository.findById(id, filter);
  }

  @patch('/grades/{id}')
  @response(204, {
    description: 'Grade PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grade, {partial: true}),
        },
      },
    })
    grade: Grade,
  ): Promise<void> {
    await this.gradeRepository.updateById(id, grade);
  }

  @put('/grades/{id}')
  @response(204, {
    description: 'Grade PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() grade: Grade,
  ): Promise<void> {
    await this.gradeRepository.replaceById(id, grade);
  }

  /*@del('/grades/{id}')
  @response(204, {
    description: 'Grade DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gradeRepository.deleteById(id);
  }*/
}
