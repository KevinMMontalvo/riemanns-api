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
  User,
  Grade,
} from '../models';
import {UserRepository} from '../repositories';

export class UserGradeController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/grades', {
    responses: {
      '200': {
        description: 'Array of User has many Grade',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grade)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Grade>,
  ): Promise<Grade[]> {
    return this.userRepository.grades(id).find(filter);
  }

  @patch('/users/{id}/grades', {
    responses: {
      '200': {
        description: 'User.Grade PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grade, {partial: true}),
        },
      },
    })
    grade: Partial<Grade>,
    @param.query.object('where', getWhereSchemaFor(Grade)) where?: Where<Grade>,
  ): Promise<Count> {
    return this.userRepository.grades(id).patch(grade, where);
  }

  /*@del('/users/{id}/grades', {
    responses: {
      '200': {
        description: 'User.Grade DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grade)) where?: Where<Grade>,
  ): Promise<Count> {
    return this.userRepository.grades(id).delete(where);
  }*/
}
