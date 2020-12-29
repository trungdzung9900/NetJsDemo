import {Test} from '@nestjs/testing';
import { GetTaskFilterDto } from '../tasks/dto/get-task-filter.dto';
import { TaskStatus } from '../tasks/task-status.enum';
import { Task } from 'src/tasks/task.entity';
import { TaskRepository } from '../tasks/task.repository';
import { TasksService } from '../tasks/tasks.service';
const mockUser = {id:12,username:'Test user'}
const mockTaskRepository = ()=>({
    getTask : jest.fn(),
    findOne : jest.fn()

})
describe('TaskService',()=>{
    let tasksService;
    let taskRepository;
   
    beforeEach( async() =>{
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                {provide : TaskRepository, useFactory: mockTaskRepository},
            ],
        }).compile();
        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });

    describe ('getTasks', ()=>{
        it ('get all task form the repository',async()=>{
            taskRepository.getTask.mockResolvedValue("someValue");
        
            expect(taskRepository.getTask).not.toHaveBeenCalled();
            const filters : GetTaskFilterDto = {status: TaskStatus.IN_PROGRESS,search:'Some search query'}
            const result = await tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTask).toHaveBeenCalled();
            expect(result).toEqual('someValue')
        })
    })
    describe ('getTaskById',()=>{
        it('calls task Repository.findOne() and succesffuly retreive and return the task',async()=>{
            const mockTask = {title: 'Test task',description: 'Test desc'}
            taskRepository.findOne.mockResolvedValue(mockTask);
            const result= await tasksService.getTaskById(1,mockUser);
            expect(result).toEqual(mockTask) 
            expect(taskRepository.findOne).toHaveBeenCalledWith({
                where:{
                id:1,
                userId: mockUser.id}}
                )
        })
        it ('throws an err as task is not found',()=>{

        })
    })
});
