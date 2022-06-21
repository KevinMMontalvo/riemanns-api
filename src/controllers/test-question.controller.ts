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
  Test,
  Question,
} from '../models';
import {TestRepository} from '../repositories';

export class TestQuestionController {
  constructor(
    @repository(TestRepository) protected testRepository: TestRepository,
  ) { }

  @get('/tests/{id}/questions', {
    responses: {
      '200': {
        description: 'Array of Test has many Question',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Question)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Question>,
  ): Promise<Question[]> {
    return this.testRepository.questions(id).find(filter);
  }

  @post('/tests/{id}/questions', {
    responses: {
      '200': {
        description: 'Test model instance',
        content: {'application/json': {schema: getModelSchemaRef(Question)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Test.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Question, {
            title: 'NewQuestionInTest',
            exclude: ['id'],
            optional: ['testId']
          }),
        },
      },
    }) question: Omit<Question, 'id'>,
  ): Promise<Question> {
    return this.testRepository.questions(id).create(question);
  }

  @patch('/tests/{id}/questions', {
    responses: {
      '200': {
        description: 'Test.Question PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Question, {partial: true}),
        },
      },
    })
    question: Partial<Question>,
    @param.query.object('where', getWhereSchemaFor(Question)) where?: Where<Question>,
  ): Promise<Count> {
    return this.testRepository.questions(id).patch(question, where);
  }

  @del('/tests/{id}/questions', {
    responses: {
      '200': {
        description: 'Test.Question DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Question)) where?: Where<Question>,
  ): Promise<Count> {
    return this.testRepository.questions(id).delete(where);
  }
}
