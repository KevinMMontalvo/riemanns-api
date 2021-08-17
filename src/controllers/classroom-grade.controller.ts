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
  Grade,
} from '../models';
import {ClassroomRepository} from '../repositories';

export class ClassroomGradeController {
  constructor(
    @repository(ClassroomRepository) protected classroomRepository: ClassroomRepository,
  ) { }

  @get('/classrooms/{id}/grades', {
    responses: {
      '200': {
        description: 'Array of Classroom has many Grade',
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
    return this.classroomRepository.grades(id).find(filter);
  }

  /*@del('/classrooms/{id}/grades', {
    responses: {
      '200': {
        description: 'Classroom.Grade DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grade)) where?: Where<Grade>,
  ): Promise<Count> {
    return this.classroomRepository.grades(id).delete(where);
  }*/
}
