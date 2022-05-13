import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Classroom,
  Test,
} from '../models';
import {ClassroomRepository} from '../repositories';

export class ClassroomTestController {
  constructor(
    @repository(ClassroomRepository) protected classroomRepository: ClassroomRepository,
  ) { }

  @get('/classrooms/{id}/tests', {
    responses: {
      '200': {
        description: 'Array of Classroom has many Test',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Test)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Test>,
  ): Promise<Test[]> {
    return this.classroomRepository.tests(id).find(filter);
  }

  @post('/classrooms/{id}/tests', {
    responses: {
      '200': {
        description: 'Classroom model instance',
        content: {'application/json': {schema: getModelSchemaRef(Test)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Classroom.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Test, {
            title: 'NewTestInClassroom',
            exclude: ['id'],
            optional: ['classroomId']
          }),
        },
      },
    }) test: Omit<Test, 'id'>,
  ): Promise<Test> {
    return this.classroomRepository.tests(id).create(test);
  }

  @patch('/classrooms/{id}/tests', {
    responses: {
      '200': {
        description: 'Classroom.Test PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Test, {partial: true}),
        },
      },
    })
    test: Partial<Test>,
    @param.query.object('where', getWhereSchemaFor(Test)) where?: Where<Test>,
  ): Promise<Count> {
    return this.classroomRepository.tests(id).patch(test, where);
  }

  @del('/classrooms/{id}/tests', {
    responses: {
      '200': {
        description: 'Classroom.Test DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Test)) where?: Where<Test>,
  ): Promise<Count> {
    return this.classroomRepository.tests(id).delete(where);
  }
}
