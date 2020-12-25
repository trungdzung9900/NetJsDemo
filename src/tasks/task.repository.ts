import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    async createTask(createTaskDto: CreateTaskDto):Promise<Task>{
        const {title, description} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
      }
    async getTasks(filterDto:GetTaskFilterDto):Promise<Task[]>{
        const {status,search} = filterDto;
        const query = this.createQueryBuilder('task');
        if (status){    
            query.andWhere('task.status = :status',{status});

        }
        
        
        if (search){
            query.andWhere( '(task.title LIKE :search OR task.description LIKE :search)',{ search : `%${search}%`});
            // query.where("task.title = :title",{title: `"${search}"`})
            // .andWhere("task.description = :description",{description:`${search}`})
        }
        const task = await query.getMany();
        
        return task
    }
} 