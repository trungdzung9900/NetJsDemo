import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
// import { Task, TaskStatus } from './tasks.mode';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
        constructor(
            @InjectRepository(TaskRepository)
            private taskRepository : TaskRepository
        ){}

        async getTasks(filterDto: GetTaskFilterDto, user:User):Promise<Task[]>{
          return this.taskRepository.getTasks(filterDto,user)
        
        }
        async getTaskById(id:number,user: User): Promise<Task>{
            const found = await this.taskRepository.findOne({where :{id,userId:user.id}});
            if (!found){
                            throw new NotFoundException(`Taks with ID ${id} not found`)
                        }
            return found;            
        }

        async deleteTask(id:number,
          user:User
          ):Promise<void>{
          const result = await this.taskRepository.delete({id,userId: user.id});
          
          if(result.affected === 0){
            throw new NotFoundException(`Tasks with ID ${id} not found`)
          }
        }


        async createTask(createTaskDto: CreateTaskDto,
          user:User
          ):Promise<Task>{
         return this.taskRepository.createTask(createTaskDto,user);
        }
//     getTaskWithFilter(filterDto:GetTaskFilterDto):Task[]{
//        const {status, search} = filterDto;
//        let tasks = this.getAllTask();
//        if (status){
//            tasks = tasks.filter(task =>task.status === status);
//        }
//        if (search){
//            tasks = tasks.filter(task=>
//             task.title.includes(search)|| task.description.includes(search)
//             )
//        }
//        return tasks;
//     }
      
        async updateTaskStatus(id : number, status: TaskStatus, user: User): Promise<Task>{
          const task = await this.getTaskById(id,user);
          task.status= status;
          await task.save();
          return task;
        }
    // async updateTaskStatus(id:number, status: TaskStatus,user:User):Task{
    //     const task = this.getTaskById(id,user);
    //     task.status = status;
    //     await task.save()
    //     return task;
    // }
}

