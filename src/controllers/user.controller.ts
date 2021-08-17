import {
	Count,
	CountSchema,
	Filter,
	FilterExcludingWhere,
	repository,
	Where,
} from '@loopback/repository';
import {
	del, get,
	getModelSchemaRef,
	HttpErrors, param,
	patch, post,
	put,
	requestBody,
} from '@loopback/rest';
import bcrypt from 'bcrypt';
import {Credentials, User} from '../models';
import {ClassroomRepository} from '../repositories';
import {UserRepository} from '../repositories';

export class UserController
{
	constructor(@repository(UserRepository) public userRepository: UserRepository,
				@repository(ClassroomRepository) public classroomRepository: ClassroomRepository)
	{
	}

	@post('/users', {
		responses: {
			'200': {
				description: 'User model instance',
				content: {'application/json': {schema: getModelSchemaRef(User)}},
			},
		},
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(User, {
						title: 'NewUser',
						exclude: ['id'],
					}),
				},
			},
		})
			user: Omit<User, 'id'>,
	): Promise<User>
	{
		const emailFilter: Filter<User> = {where: {email: user.email}};
		const userByEmail = await this.userRepository.findOne(emailFilter);
		if (userByEmail)
		{
			throw new HttpErrors.Conflict('El correo ya se encuentra en uso.');
		}
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(user.password, salt);
		user.password = password;
		return this.userRepository.create(user);
	}

	@get('/users/count', {
		responses: {
			'200': {
				description: 'User model count',
				content: {'application/json': {schema: CountSchema}},
			},
		},
	})
	async count(
		@param.where(User) where?: Where<User>,
	): Promise<Count>
	{
		return this.userRepository.count(where);
	}

	@get('/users', {
		responses: {
			'200': {
				description: 'Array of User model instances',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: getModelSchemaRef(User, {includeRelations: true}),
						},
					},
				},
			},
		},
	})
	async find(
		@param.filter(User) filter?: Filter<User>,
	): Promise<User[]>
	{
		return this.userRepository.find(filter);
	}

	@patch('/users', {
		responses: {
			'200': {
				description: 'User PATCH success count',
				content: {'application/json': {schema: CountSchema}},
			},
		},
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(User, {partial: true}),
				},
			},
		})
			user: User,
		@param.where(User) where?: Where<User>,
	): Promise<Count>
	{
		return this.userRepository.updateAll(user, where);
	}

	@get('/users/{id}', {
		responses: {
			'200': {
				description: 'User model instance',
				content: {
					'application/json': {
						schema: getModelSchemaRef(User, {includeRelations: true}),
					},
				},
			},
		},
	})
	async findById(
		@param.path.string('id') id: string,
		@param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
	): Promise<User>
	{
		return this.userRepository.findById(id, filter);
	}

	@patch('/users/{id}', {
		responses: {
			'204': {
				description: 'User PATCH success',
			},
		},
	})
	async updateById(
		@param.path.string('id') id: string,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(User, {partial: true}),
				},
			},
		})
			user: User,
	): Promise<void>
	{
		if (user.password)
		{
			const salt = await bcrypt.genSalt(10);
			const password = await bcrypt.hash(user.password, salt);
			user.password = password;
		}
		await this.userRepository.updateById(id, user);
	}

	@put('/users/{id}', {
		responses: {
			'204': {
				description: 'User PUT success',
			},
		},
	})
	async replaceById(
		@param.path.string('id') id: string,
		@requestBody() user: User,
	): Promise<void>
	{
		await this.userRepository.replaceById(id, user);
	}

	@del('/users/{id}', {
		responses: {
			'204': {
				description: 'User DELETE success',
			},
		},
	})
	async deleteById(@param.path.string('id') id: string): Promise<void>
	{
		const classrooms = await this.classroomRepository.find();
		for (let i = 0; i < classrooms.length; i++)
		{
			let classroom = classrooms[i];
			if (classroom.students != null && (classroom.students as string[]).find(s => s === id) != null)
			{
				let index = (classroom.students as string[]).indexOf(id);
				(classroom.students as string[]).splice(index, 1);
				await this.classroomRepository.updateById(classroom.id, classroom);
			}

		}
		await this.userRepository.deleteById(id);
	}

	@post('/users/authenticate', {
		responses: {
			'200': {
				description: 'User model instance',
				content: {'application/json': {schema: getModelSchemaRef(User)}},
			},
		},
	})
	async authenticate(
		@requestBody({
			content: {
				'application/json': {
					credentials: Credentials,
				},
			},
		})
			credentials: Credentials,
	): Promise<User>
	{
		const emailFilter: Filter<User> = {where: {email: credentials.email}};
		const user = await this.userRepository.findOne(emailFilter);
		if (!user)
		{
			throw new HttpErrors.NotFound('Usuario no registrado.');
		}
		const authorized = await bcrypt.compare(credentials.password, user.password);
		if (!authorized)
		{
			throw new HttpErrors.Unauthorized('Correo o contraseña incorrectos');
		}
		return user;
	}

	@get('/usersByProfile/{profile}', {
		responses: {
			'200': {
				description: 'User model instance',
				content: {
					'application/json': {
						schema: getModelSchemaRef(User, {includeRelations: true}),
					},
				},
			},
		},
	})
	async findByProfile(
		@param.path.string('profile') profile: string,
	): Promise<User[]>
	{
		const profileFilter: Filter<User> = {where: {profile}};
		return this.userRepository.find(profileFilter);
	}
}
