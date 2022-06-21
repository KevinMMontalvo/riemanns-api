"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ClassroomController = class ClassroomController {
    constructor(classroomRepository, userRepository, fileRepository) {
        this.classroomRepository = classroomRepository;
        this.userRepository = userRepository;
        this.fileRepository = fileRepository;
    }
    async create(classroom) {
        return this.classroomRepository.create(classroom);
    }
    async count(where) {
        return this.classroomRepository.count(where);
    }
    async find(filter) {
        const classrooms = await this.classroomRepository.find(filter);
        for (const classroom of classrooms) {
            if (classroom.students) {
                const students = [];
                for (const student of classroom.students) {
                    students.push(await this.userRepository.findById(student.toString()));
                }
                classroom.students = students;
                classroom.teacher = await this.userRepository.findById(classroom.teacher.toString());
            }
        }
        return classrooms;
    }
    async updateAll(classroom, where) {
        return this.classroomRepository.updateAll(classroom, where);
    }
    async findById(id, filter) {
        return this.classroomRepository.findById(id, filter);
    }
    async updateById(id, classroom) {
        await this.classroomRepository.updateById(id, classroom);
    }
    async replaceById(id, classroom) {
        await this.classroomRepository.replaceById(id, classroom);
    }
    async deleteById(id) {
        await this.classroomRepository.deleteById(id);
    }
    async findByTeacherId(id, filter) {
        const teacherFilter = { where: { teacher: id } };
        const classrooms = await this.classroomRepository.find({ ...filter, ...teacherFilter });
        for (const classroom of classrooms) {
            if (classroom.students) {
                const students = [];
                for (const student of classroom.students) {
                    students.push(await this.userRepository.findById(student.toString()));
                }
                classroom.students = students;
            }
            if (classroom.files) {
                const files = [];
                for (const file of classroom.files) {
                    files.push(await this.fileRepository.findById(file.toString()));
                }
                classroom.files = files;
            }
            if (classroom.videos) {
                const videos = [];
                for (const video of classroom.videos) {
                    videos.push(await this.fileRepository.findById(video.toString()));
                }
                classroom.videos = videos;
            }
            classroom.teacher = await this.userRepository.findById(classroom.teacher.toString());
        }
        return classrooms;
    }
    async findByStudentId(id, filter) {
        const classrooms = await this.classroomRepository.find(filter);
        const classroomsByStudent = [];
        for (const classroom of classrooms) {
            if (classroom.students) {
                for (const student of classroom.students) {
                    if (student === id) {
                        classroomsByStudent.push(classroom);
                        break;
                    }
                }
            }
        }
        for (const classroom of classroomsByStudent) {
            if (classroom.students) {
                const students = [];
                for (const student of classroom.students) {
                    students.push(await this.userRepository.findById(student.toString()));
                }
                classroom.students = students;
            }
            if (classroom.files) {
                const files = [];
                for (const file of classroom.files) {
                    files.push(await this.fileRepository.findById(file.toString()));
                }
                classroom.files = files;
            }
            if (classroom.videos) {
                const videos = [];
                for (const video of classroom.videos) {
                    videos.push(await this.fileRepository.findById(video.toString()));
                }
                classroom.videos = videos;
            }
            classroom.teacher = await this.userRepository.findById(classroom.teacher.toString());
        }
        return classroomsByStudent;
    }
    async addIntervention(forumId, classroomId, intervention) {
        let classroom = await this.classroomRepository.findById(classroomId);
        if (classroom.forums) {
            const index = classroom.forums.findIndex(f => f.id === forumId);
            if (index > -1) {
                if (classroom.forums[index].interventions) {
                    classroom.forums[index].interventions.push(intervention);
                }
                else {
                    classroom.forums[index].interventions = [intervention];
                }
            }
        }
        await this.classroomRepository.updateById(classroomId, classroom);
    }
    async addActivity(activityId, classroomId, activity) {
        let classroom = await this.classroomRepository.findById(classroomId);
        if (classroom.activities) {
            const index = classroom.activities.findIndex(f => f.id === activityId);
            if (index > -1) {
                if (classroom.activities[index].studentActivities) {
                    classroom.activities[index].studentActivities.push(activity);
                }
                else {
                    classroom.activities[index].studentActivities = [activity];
                }
            }
        }
        await this.classroomRepository.updateById(classroomId, classroom);
    }
    async addQuiz(quizId, classroomId, quiz) {
        let classroom = await this.classroomRepository.findById(classroomId);
        if (classroom.quizzes) {
            const index = classroom.quizzes.findIndex(f => f.id === quizId);
            if (index > -1) {
                if (classroom.quizzes[index].studentsAnwers) {
                    classroom.quizzes[index].studentsAnwers.push(quiz);
                }
                else {
                    classroom.quizzes[index].studentsAnwers = [quiz];
                }
            }
        }
        await this.classroomRepository.updateById(classroomId, classroom);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/classrooms', {
        responses: {
            '200': {
                description: 'Classroom model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Classroom) } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Classroom, {
                    title: 'NewClassroom',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/classrooms/count', {
        responses: {
            '200': {
                description: 'Classroom model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Classroom)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/classrooms', {
        responses: {
            '200': {
                description: 'Array of Classroom model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: (0, rest_1.getModelSchemaRef)(models_1.Classroom, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Classroom)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/classrooms', {
        responses: {
            '200': {
                description: 'Classroom PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Classroom, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Classroom)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Classroom, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/classrooms/{id}', {
        responses: {
            '200': {
                description: 'Classroom model instance',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.Classroom, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Classroom, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/classrooms/{id}', {
        responses: {
            '204': {
                description: 'Classroom PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Classroom, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Classroom]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/classrooms/{id}', {
        responses: {
            '204': {
                description: 'Classroom PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Classroom]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/classrooms/{id}', {
        responses: {
            '204': {
                description: 'Classroom DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, rest_1.get)('/classrooms/byTeacher/{id}', {
        responses: {
            '200': {
                description: 'Array of Classroom model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: (0, rest_1.getModelSchemaRef)(models_1.Classroom, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Classroom)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "findByTeacherId", null);
tslib_1.__decorate([
    (0, rest_1.get)('/classrooms/byStudent/{id}', {
        responses: {
            '200': {
                description: 'Array of Classroom model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: (0, rest_1.getModelSchemaRef)(models_1.Classroom, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Classroom)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "findByStudentId", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/classrooms/addIntervention/{forumId}/{classroomId}', {
        responses: {
            '204': {
                description: 'Classroom PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('forumId')),
    tslib_1.__param(1, rest_1.param.path.string('classroomId')),
    tslib_1.__param(2, (0, rest_1.requestBody)({
        content: {
            'application/json': {},
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "addIntervention", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/classrooms/addActivity/{activityId}/{classroomId}', {
        responses: {
            '204': {
                description: 'Classroom PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('activityId')),
    tslib_1.__param(1, rest_1.param.path.string('classroomId')),
    tslib_1.__param(2, (0, rest_1.requestBody)({
        content: {
            'application/json': {},
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "addActivity", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/classrooms/addQuiz/{quizId}/{classroomId}', {
        responses: {
            '204': {
                description: 'Classroom PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('quizId')),
    tslib_1.__param(1, rest_1.param.path.string('classroomId')),
    tslib_1.__param(2, (0, rest_1.requestBody)({
        content: {
            'application/json': {},
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ClassroomController.prototype, "addQuiz", null);
ClassroomController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ClassroomRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__param(2, (0, repository_1.repository)(repositories_1.FileRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ClassroomRepository,
        repositories_1.UserRepository,
        repositories_1.FileRepository])
], ClassroomController);
exports.ClassroomController = ClassroomController;
//# sourceMappingURL=classroom.controller.js.map