import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    private logger = new Logger('TaskRepository')
    async createTask(createTaskDto: CreateTaskDto,
        user: User):Promise<Task>{
        const {title, description} = createTaskDto;
        const task = new Task();
        console.log(user);
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        try{
            await task.save();
        }
        catch(err){
            this.logger.error(`Fail to create tasks for user: "${user.username}",Data: ${JSON.stringify(CreateTaskDto)}`,err.stack);
            
            throw new InternalServerErrorException();
        }
        
        delete task.user
        return task;
      }
    async getTasks(filterDto:GetTaskFilterDto,user:User):Promise<Task[]>{
        const {status,search} = filterDto;
        const query = this.createQueryBuilder('task');
        query.where('task.userId = :userId',{userId: user.id});
        if (status){    
            query.andWhere('task.status = :status',{status});
        }
        
        
        if (search){
            query.andWhere( '(task.title LIKE :search OR task.description LIKE :search)',{ search : `%${search}%`});
            // query.where("task.title = :title",{title: `"${search}"`})
            // .andWhere("task.description = :description",{description:`${search}`})
        }
        try{
        const task = await query.getMany();
        return task
        }catch(err){
            this.logger.error(`Fail to get tasks for user: "${user.username}",Filter: ${JSON.stringify(filterDto)}`,err.stack);
            
            throw new InternalServerErrorException();
        }
    }
} 