import {inject} from '@loopback/core';
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
	HttpErrors, param, patch,
	post, put,
	Request,
	requestBody,
	Response,
	RestBindings,
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {UploadFilesKeys} from '../lib';
import {File} from '../models';
import {ClassroomRepository, FileRepository, UserRepository} from '../repositories';


multer({
	limits: {fileSize: UploadFilesKeys.MAX_FILE_SIZE},
});

export class FileController
{
	constructor(
		@repository(FileRepository)
		public fileRepository: FileRepository,
		@repository(ClassroomRepository)
		public classroomRepository: ClassroomRepository,
		@repository(UserRepository)
		public userRepository: UserRepository,
	)
	{
	}

	@post('/files', {
		responses: {
			'200': {
				description: 'File model instance',
				content: {'application/json': {schema: getModelSchemaRef(File)}},
			},
		},
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(File, {
						title: 'NewFile',
						exclude: ['id'],
					}),
				},
			},
		})
			file: Omit<File, 'id'>,
	): Promise<File>
	{
		return this.fileRepository.create(file);
	}

	@get('/files/count', {
		responses: {
			'200': {
				description: 'File model count',
				content: {'application/json': {schema: CountSchema}},
			},
		},
	})
	async count(
		@param.where(File) where?: Where<File>,
	): Promise<Count>
	{
		return this.fileRepository.count(where);
	}

	@get('/files', {
		responses: {
			'200': {
				description: 'Array of File model instances',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: getModelSchemaRef(File, {includeRelations: true}),
						},
					},
				},
			},
		},
	})
	async find(
		@param.filter(File) filter?: Filter<File>,
	): Promise<File[]>
	{
		return this.fileRepository.find(filter);
	}

	@patch('/files', {
		responses: {
			'200': {
				description: 'File PATCH success count',
				content: {'application/json': {schema: CountSchema}},
			},
		},
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(File, {partial: true}),
				},
			},
		})
			file: File,
		@param.where(File) where?: Where<File>,
	): Promise<Count>
	{
		return this.fileRepository.updateAll(file, where);
	}

	@get('/files/{id}', {
		responses: {
			'200': {
				description: 'File model instance',
				content: {
					'application/json': {
						schema: getModelSchemaRef(File, {includeRelations: true}),
					},
				},
			},
		},
	})
	async findById(
		@param.path.string('id') id: string,
		@param.filter(File, {exclude: 'where'}) filter?: FilterExcludingWhere<File>,
	): Promise<File>
	{
		return this.fileRepository.findById(id, filter);
	}

	@patch('/files/{id}', {
		responses: {
			'204': {
				description: 'File PATCH success',
			},
		},
	})
	async updateById(
		@param.path.string('id') id: string,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(File, {partial: true}),
				},
			},
		})
			file: File,
	): Promise<void>
	{
		await this.fileRepository.updateById(id, file);
	}

	@put('/files/{id}', {
		responses: {
			'204': {
				description: 'File PUT success',
			},
		},
	})
	async replaceById(
		@param.path.string('id') id: string,
		@requestBody() file: File,
	): Promise<void>
	{
		await this.fileRepository.replaceById(id, file);
	}

	@del('/files/{id}', {
		responses: {
			'204': {
				description: 'File DELETE success',
			},
		},
	})
	async deleteById(@param.path.string('id') id: string): Promise<void>
	{

		const classrooms = await this.classroomRepository.find();
		for (let i = 0; i < classrooms.length; i++)
		{
			let classroom = classrooms[i];
			if (classroom.videos != null && (classroom.files as string[]).find(s => s === id) != null)
			{
				let index = (classroom.files as string[]).indexOf(id);
				(classroom.files as string[]).splice(index, 1);
				await this.classroomRepository.updateById(classroom.id, classroom);
			}
			else if (classroom.videos != null && (classroom.videos as string[]).find(s => s === id) != null)
			{
				let index = (classroom.videos as string[]).indexOf(id);
				(classroom.videos as string[]).splice(index, 1);
				await this.classroomRepository.updateById(classroom.id, classroom);
			}
		}

		await this.fileRepository.deleteById(id);
	}

	@post('/uploadFile/byClassroom/{id}', {
		responses: {
			200: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
						},
					},
				},
				description: 'Upload file',
			},
		},
	})
	async uploadFileByClassroom(
		@param.path.string('id') id: string,
		@inject(RestBindings.Http.RESPONSE) response: Response,
		@requestBody.file() request: Request,
	): Promise<any>
	{
		const classroom = await this.classroomRepository.findById(id);
		if (classroom)
		{
			const filePath = path.join(__dirname, UploadFilesKeys.FILES_PATH);
			let res = await this.StoreFileToPath(filePath, UploadFilesKeys.FIELDNAME, request, response, UploadFilesKeys.ACCEPTED_EXT);
			if (res)
			{
				const file: Partial<File> = {
					name: request.file.originalname,
					size: request.file.size,
					type: request.file.mimetype,
					uploaded: new Date().toDateString(),
					url: 'https://' + request.headers.host + '/' + request.file.filename,
					user: classroom.teacher.toString(),
					extension: request.file.originalname.substr(request.file.originalname.lastIndexOf('.') + 1),
				};
				const files = classroom.files ? classroom.files : [];
				const createdFile = await this.fileRepository.create(file);
				files.push(createdFile.getId());
				classroom.files = files;
				await this.classroomRepository.updateById(classroom.getId(), classroom);
				return createdFile;
			}
		}
		else
		{
			throw new HttpErrors.NotFound('El curso al que se desea subir archivos no existe.');
		}
	}

	@post('/uploadVideo/byClassroom/{id}', {
		responses: {
			200: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
						},
					},
				},
				description: 'Upload video',
			},
		},
	})
	async uploadVideoByClassroom(
		@param.path.string('id') id: string,
		@inject(RestBindings.Http.RESPONSE) response: Response,
		@requestBody.file() request: Request,
	): Promise<any>
	{
		const classroom = await this.classroomRepository.findById(id);
		if (classroom)
		{
			const filePath = path.join(__dirname, UploadFilesKeys.FILES_PATH);
			let res = await this.StoreFileToPath(filePath, UploadFilesKeys.FIELDNAME, request, response, UploadFilesKeys.ACCEPTED_EXT);
			if (res)
			{
				const file: Partial<File> = {
					name: request.file.originalname,
					size: request.file.size,
					type: request.file.mimetype,
					uploaded: new Date().toDateString(),
					url: 'https://' + request.headers.host + '/' + request.file.filename,
					user: classroom.teacher.toString(),
					extension: request.file.originalname.substr(request.file.originalname.lastIndexOf('.') + 1),
				};
				const videos = classroom.videos ? classroom.videos : [];
				const createdVideo = await this.fileRepository.create(file);
				videos.push(createdVideo.getId());
				classroom.videos = videos;
				await this.classroomRepository.updateById(classroom.getId(), classroom);
				return createdVideo;
			}
		}
		else
		{
			throw new HttpErrors.NotFound('El curso al que se desea subir archivos no existe.');
		}
	}

	@post('/uploadFile/byUser/{id}', {
		responses: {
			200: {
				content: {
					'application/json': {
						schema: {
							type: 'object',
						},
					},
				},
				description: 'Upload file',
			},
		},
	})
	async uploadFileByUser(
		@param.path.string('id') id: string,
		@inject(RestBindings.Http.RESPONSE) response: Response,
		@requestBody.file() request: Request,
	): Promise<any>
	{
		const user = await this.userRepository.findById(id);
		if (user)
		{
			const filePath = path.join(__dirname, UploadFilesKeys.FILES_PATH);
			let res = await this.StoreFileToPath(filePath, UploadFilesKeys.FIELDNAME, request, response, UploadFilesKeys.ACCEPTED_EXT);
			if (res)
			{
				const file: Partial<File> = {
					name: request.file.originalname,
					size: request.file.size,
					type: request.file.mimetype,
					uploaded: new Date().toDateString(),
					url: 'https://' + request.headers.host + '/' + request.file.filename,
					user: user.getId(),
					extension: request.file.originalname.substr(request.file.originalname.lastIndexOf('.') + 1),
				};
				const createdFile = await this.fileRepository.create(file);
				return createdFile;
			}
		}
		else
		{
			throw new HttpErrors.NotFound('El curso al que se desea subir archivos no existe.');
		}
	}

	@post('/uploadProfilePhoto/{userId}')
	async uploadProfilePhoto(
		@param.path.string('userId') id: string,
		@inject(RestBindings.Http.RESPONSE) response: Response,
		@requestBody.file() request: Request,
	): Promise<any>
	{
		let user = await this.userRepository.findById(id);
		if (!user)
		{
			throw new HttpErrors.NotFound('El usuario no existe');
		}

		const filePath = path.join(__dirname, UploadFilesKeys.FILES_PATH + 'profilePhotos/');
		let res = await this.StoreFileToPath(filePath, UploadFilesKeys.FIELDNAME, request, response, UploadFilesKeys.ACCEPTED_EXT);
		if (res)
		{
			const file: Partial<File> = {
				name: request.file.originalname,
				size: request.file.size,
				type: request.file.mimetype,
				uploaded: new Date().toDateString(),
				url: 'http://' + request.headers.host + '/profilePhotos/' + request.file.filename,
				user: user.toString(),
				extension: request.file.originalname.substr(request.file.originalname.lastIndexOf('.') + 1),
			};
			const createdFile = await this.fileRepository.create(file);
			user.photo = file.url;
			await this.userRepository.updateById(user.getId(), user);
			return createdFile;
		}

	}

	// almacenamiento

	private GetMulterStorageConfig(storagePath: string)
	{
		var filename: string = '';
		const storage = multer.diskStorage({
			destination: function(req, file, cb)
			{
				cb(null, storagePath);
			},
			filename: function(req, file, cb)
			{
				filename = `${Date.now()}-${file.originalname}`;
				cb(null, filename);
			},
		});
		return storage;
	}

	private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response,
							acceptedExt: string[]): Promise<object>
	{
		return new Promise<object>((resolve, reject) =>
		{
			const storage = this.GetMulterStorageConfig(storePath);
			const upload = multer({
					storage: storage,
					fileFilter: function(req, file, callback)
					{
						var ext = path.extname(file.originalname).toUpperCase();
						if (acceptedExt.includes(ext))
						{
							return callback(null, true);
						}
						return callback(new HttpErrors[400]('This format file is not supported.'));
					},
					limits: {
						fileSize: UploadFilesKeys.MAX_FILE_SIZE,
					},
				},
			).single(fieldname);
			upload(request, response, (err: any) =>
			{
				if (err)
				{
					reject(err);
				}
				resolve(response);
			});
		});
	}

}
