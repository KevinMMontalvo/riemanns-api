import {
	Count,
	CountSchema,
	Filter,
	FilterExcludingWhere,
	repository,
	Where,
} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody} from '@loopback/rest';
import {Classroom, File, User} from '../models';
import {ClassroomRepository, FileRepository, UserRepository} from '../repositories';

export class ClassroomController
{
	constructor(
		@repository(ClassroomRepository)
		public classroomRepository: ClassroomRepository,
		@repository(UserRepository)
		public userRepository: UserRepository,
		@repository(FileRepository)
		public fileRepository: FileRepository,
	)
	{
	}

	@post('/classrooms', {
		responses: {
			'200': {
				description: 'Classroom model instance',
				content: {'application/json': {schema: getModelSchemaRef(Classroom)}},
			},
		},
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Classroom, {
						title: 'NewClassroom',
						exclude: ['id'],
					}),
				},
			},
		})
			classroom: Omit<Classroom, 'id'>,
	): Promise<Classroom>
	{
		return this.classroomRepository.create(classroom);
	}

	@get('/classrooms/count', {
		responses: {
			'200': {
				description: 'Classroom model count',
				content: {'application/json': {schema: CountSchema}},
			},
		},
	})
	async count(
		@param.where(Classroom) where?: Where<Classroom>,
	): Promise<Count>
	{
		return this.classroomRepository.count(where);
	}

	@get('/classrooms', {
		responses: {
			'200': {
				description: 'Array of Classroom model instances',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: getModelSchemaRef(Classroom, {includeRelations: true}),
						},
					},
				},
			},
		},
	})
	async find(
		@param.filter(Classroom) filter?: Filter<Classroom>,
	): Promise<Classroom[]>
	{
		const classrooms = await this.classroomRepository.find(filter);
		for (const classroom of classrooms)
		{
			if (classroom.students)
			{
				const students: User[] = [];
				for (const student of classroom.students)
				{
					students.push(await this.userRepository.findById(student.toString()));
				}
				classroom.students = students;
				classroom.teacher = await this.userRepository.findById(classroom.teacher.toString());
			}
		}
		return classrooms;
	}

	@patch('/classrooms', {
		responses: {
			'200': {
				description: 'Classroom PATCH success count',
				content: {'application/json': {schema: CountSchema}},
			},
		},
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Classroom, {partial: true}),
				},
			},
		})
			classroom: Classroom,
		@param.where(Classroom) where?: Where<Classroom>,
	): Promise<Count>
	{
		return this.classroomRepository.updateAll(classroom, where);
	}

	@get('/classrooms/{id}', {
		responses: {
			'200': {
				description: 'Classroom model instance',
				content: {
					'application/json': {
						schema: getModelSchemaRef(Classroom, {includeRelations: true}),
					},
				},
			},
		},
	})
	async findById(
		@param.path.string('id') id: string,
		@param.filter(Classroom, {exclude: 'where'}) filter?: FilterExcludingWhere<Classroom>,
	): Promise<Classroom>
	{
		return this.classroomRepository.findById(id, filter);
	}

	@patch('/classrooms/{id}', {
		responses: {
			'204': {
				description: 'Classroom PATCH success',
			},
		},
	})
	async updateById(
		@param.path.string('id') id: string,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Classroom, {partial: true}),
				},
			},
		})
			classroom: Classroom,
	): Promise<void>
	{
		await this.classroomRepository.updateById(id, classroom);
	}

	@put('/classrooms/{id}', {
		responses: {
			'204': {
				description: 'Classroom PUT success',
			},
		},
	})
	async replaceById(
		@param.path.string('id') id: string,
		@requestBody() classroom: Classroom,
	): Promise<void>
	{
		await this.classroomRepository.replaceById(id, classroom);
	}

	@del('/classrooms/{id}', {
		responses: {
			'204': {
				description: 'Classroom DELETE success',
			},
		},
	})
	async deleteById(@param.path.string('id') id: string): Promise<void>
	{
		await this.classroomRepository.deleteById(id);
	}

	@get('/classrooms/byTeacher/{id}', {
		responses: {
			'200': {
				description: 'Array of Classroom model instances',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: getModelSchemaRef(Classroom, {includeRelations: true}),
						},
					},
				},
			},
		},
	})
	async findByTeacherId(
		@param.path.string('id') id: string,
		@param.filter(Classroom) filter?: Filter<Classroom>,
	): Promise<Classroom[]>
	{
		const teacherFilter: Filter<Classroom> = {where: {teacher: id}};
		const classrooms = await this.classroomRepository.find({...filter, ...teacherFilter});
		for (const classroom of classrooms)
		{
			if (classroom.students)
			{
				const students: User[] = [];
				for (const student of classroom.students)
				{
					students.push(await this.userRepository.findById(student.toString()));
				}
				classroom.students = students;
			}
			if (classroom.files)
			{
				const files: File[] = [];
				for (const file of classroom.files)
				{
					files.push(await this.fileRepository.findById(file.toString()));
				}
				classroom.files = files;
			}
			if (classroom.videos)
			{
				const videos: File[] = [];
				for (const video of classroom.videos)
				{
					videos.push(await this.fileRepository.findById(video.toString()));
				}
				classroom.videos = videos;
			}
			classroom.teacher = await this.userRepository.findById(classroom.teacher.toString());
		}
		return classrooms;
	}

	@get('/classrooms/byStudent/{id}', {
		responses: {
			'200': {
				description: 'Array of Classroom model instances',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: getModelSchemaRef(Classroom, {includeRelations: true}),
						},
					},
				},
			},
		},
	})
	async findByStudentId(
		@param.path.string('id') id: string,
		@param.filter(Classroom) filter?: Filter<Classroom>,
	): Promise<Classroom[]>
	{
		const classrooms = await this.classroomRepository.find(filter);
		const classroomsByStudent: Classroom[] = [];
		for (const classroom of classrooms)
		{
			if (classroom.students)
			{
				for (const student of classroom.students)
				{
					if (student === id)
					{
						classroomsByStudent.push(classroom);
						break;
					}
				}
			}
		}
		for (const classroom of classroomsByStudent)
		{
			if (classroom.students)
			{
				const students: User[] = [];
				for (const student of classroom.students)
				{
					students.push(await this.userRepository.findById(student.toString()));
				}
				classroom.students = students;
			}
			if (classroom.files)
			{
				const files: File[] = [];
				for (const file of classroom.files)
				{
					files.push(await this.fileRepository.findById(file.toString()));
				}
				classroom.files = files;
			}
			if (classroom.videos)
			{
				const videos: File[] = [];
				for (const video of classroom.videos)
				{
					videos.push(await this.fileRepository.findById(video.toString()));
				}
				classroom.videos = videos;
			}
			classroom.teacher = await this.userRepository.findById(classroom.teacher.toString());
		}
		return classroomsByStudent;
	}

	@patch('/classrooms/addIntervention/{forumId}/{classroomId}', {
		responses: {
			'204': {
				description: 'Classroom PATCH success',
			},
		},
	})
	async addIntervention(
		@param.path.string('forumId') forumId: string,
		@param.path.string('classroomId') classroomId: string,
		@requestBody({
			content: {
				'application/json': {},
			},
		})
			intervention: any,
	): Promise<void>
	{
		let classroom = await this.classroomRepository.findById(classroomId);
		if (classroom.forums)
		{
			const index = classroom.forums.findIndex(f => f.id === forumId);
			if (index > -1)
			{
				if (classroom.forums[index].interventions)
				{
					classroom.forums[index].interventions.push(intervention);
				}
				else
				{
					classroom.forums[index].interventions = [intervention];
				}
			}
		}
		await this.classroomRepository.updateById(classroomId, classroom);
	}

	@patch('/classrooms/addActivity/{activityId}/{classroomId}', {
		responses: {
			'204': {
				description: 'Classroom PATCH success',
			},
		},
	})
	async addActivity(
		@param.path.string('activityId') activityId: string,
		@param.path.string('classroomId') classroomId: string,
		@requestBody({
			content: {
				'application/json': {},
			},
		})
			activity: any,
	): Promise<void>
	{
		let classroom = await this.classroomRepository.findById(classroomId);
		if (classroom.activities)
		{
			const index = classroom.activities.findIndex(f => f.id === activityId);
			if (index > -1)
			{
				if (classroom.activities[index].studentActivities)
				{
					classroom.activities[index].studentActivities.push(activity);
				}
				else
				{
					classroom.activities[index].studentActivities = [activity];
				}
			}
		}
		await this.classroomRepository.updateById(classroomId, classroom);
	}

	@patch('/classrooms/addQuiz/{quizId}/{classroomId}', {
		responses: {
			'204': {
				description: 'Classroom PATCH success',
			},
		},
	})
	async addQuiz(
		@param.path.string('quizId') quizId: string,
		@param.path.string('classroomId') classroomId: string,
		@requestBody({
			content: {
				'application/json': {},
			},
		})
			quiz: any,
	): Promise<void>
	{
		let classroom = await this.classroomRepository.findById(classroomId);
		if (classroom.quizzes)
		{
			const index = classroom.quizzes.findIndex(f => f.id === quizId);
			if (index > -1)
			{
				if (classroom.quizzes[index].studentsAnwers)
				{
					classroom.quizzes[index].studentsAnwers.push(quiz);
				}
				else
				{
					classroom.quizzes[index].studentsAnwers = [quiz];
				}
			}
		}
		await this.classroomRepository.updateById(classroomId, classroom);
	}
}
