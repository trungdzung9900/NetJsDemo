import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService:TasksService){}

        @Get()
        getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto):Promise<Task[]>{
             return this.TasksService.getTasks(filterDto);
        }
        @Get('/:id')
        getTaskById(@Param('id',ParseIntPipe) id :number):Promise<Task>{  
          return this.TasksService.getTaskById(id);
        }

        @Post()
        @UsePipes(ValidationPipe)
        createTask(@Body()
            createTaskDto:CreateTaskDto):Promise<Task>{
            return this.TasksService.createTask(createTaskDto)
        }
        @Delete('/:id')
        deleteTask(@Param('id') id : number):Promise<void>{
          return this.TasksService.deleteTask(id);
        }

        @Patch('/:id/status')

        updateTaskStatus(
          @Param('id',ParseIntPipe) id: number,
          @Body('status',TaskStatusValidationPipe) status: TaskStatus,
        ){
          return this.TasksService.updateTaskStatus(id,status) 
        }
        
      
    }

