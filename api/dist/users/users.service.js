"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const todo_entity_1 = require("./entities/todo.entity");
let UsersService = class UsersService {
    constructor(userRepo, todoRepo, entityManager) {
        this.userRepo = userRepo;
        this.todoRepo = todoRepo;
        this.entityManager = entityManager;
    }
    async create(createUserDto) {
        const newUser = new user_entity_1.User({
            ...createUserDto,
            todos: []
        });
        await this.userRepo.save(newUser);
        return {
            newUser
        };
    }
    async findAll() {
        return this.userRepo.find({ relations: { todos: true } });
    }
    async findOne(id) {
        const user = await this.userRepo.findOne({ where: { id }, relations: ['todos'] });
        if (!user) {
            throw new common_1.ForbiddenException(`No Such User With ID of: ${id}`);
        }
        return {
            user
        };
    }
    async update(id, updateUserDto) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new common_1.ForbiddenException(`No Such User With ID of: ${id}`);
        }
        user.firstname = updateUserDto.firstname;
        user.lastname = updateUserDto.lastname;
        this.userRepo.save(user);
        return {
            user
        };
    }
    async remove(id) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new common_1.ForbiddenException(`No Such User With ID of: ${id}`);
        }
        this.userRepo.delete(id);
        return `User with id ${id} deleted successfully`;
    }
    async todo_add(id, createTodoDto) {
        const user = await this.userRepo.findOne({ where: { id }, relations: ['todos'] });
        if (!user) {
            throw new common_1.ForbiddenException(`No Such User With ID of: ${id}`);
        }
        const todo = createTodoDto.todos.map(t => new todo_entity_1.Todo(t));
        user.todos = [...user.todos, ...todo];
        this.userRepo.save(user);
        return {
            user
        };
    }
    async todo_update(id) {
        const todo = await this.todoRepo.findOneBy({ id });
        if (!todo) {
            throw new common_1.ForbiddenException(`No Such Todo With ID of: ${id}`);
        }
        if (todo.done) {
            todo.done = false;
        }
        else {
            todo.done = true;
        }
        this.todoRepo.save(todo);
        return {
            todo
        };
    }
    async todo_delete(id) {
        const todo = await this.todoRepo.findOneBy({ id });
        if (!todo) {
            throw new common_1.ForbiddenException(`No Such Todo With ID of: ${id}`);
        }
        this.todoRepo.delete(id);
        return `Todo with id ${id} deleted successfully`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.EntityManager])
], UsersService);
//# sourceMappingURL=users.service.js.map