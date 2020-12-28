import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private TasksService: TasksService) { }

  @Get()
  getTasks(
  @Query(ValidationPipe) filterDto: GetTaskFilterDto,
  @GetUser() user: User
  ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all task. Filter: ${JSON.stringify(filterDto)}`);
    return this.TasksService.getTasks(filterDto, user);
  }
  @Get('/:id')
  getTaskById(
  @Param('id', ParseIntPipe) id: number,
  @GetUser() user : User
  ): Promise<Task> {
    return this.TasksService.getTaskById(id,user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    console.log(user);
    return this.TasksService.createTask(createTaskDto,user)
  }
  @Delete('/:id')
  deleteTask(
  @Param('id') id: number,
  @GetUser() user:User,
  ): Promise<void> {
    return this.TasksService.deleteTask(id,user);
  }

  @Patch('/:id/status')

  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ):Promise<Task> {
    return this.TasksService.updateTaskStatus(id, status , user)
  }


}

