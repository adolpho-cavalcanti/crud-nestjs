import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';
import { Task } from './task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {

    }

    async getAll() {
        return await this.taskModel.find().exec();
        // return this.tasks;
    }
    async getById(id: string) {
        return this.taskModel.findById(id).exec();
        // const taskId = this.tasks.find(task => task.id == id);
        // return taskId;
    }
    async create(task: Task) {
        const createTask = new this.taskModel(task);
        return await createTask.save();
        // let lastId = 0;
        // if(this.tasks.length > 0) {
        //     lastId = this.tasks[this.tasks.length - 1].id;
        // }
        // task.id = lastId + 1;
        // this.tasks.push(task)
        // return task;
    }
    async update(id: string, task: Task) {
        await this.taskModel.updateOne({ _id: id }, task).exec();
        return this.getById(id);
        // const araryTask = this.getById(task.id);
        // if(araryTask) {
        //     araryTask.description = task.description;
        //     araryTask.completed = task.completed;
        // }
        // return araryTask;
    }

    async delete(id: string) {
        return await this.taskModel.deleteOne({ _id: id }).exec();
        // const indexTask = this.tasks.findIndex(task => task.id == id);
        // this.tasks.splice(indexTask, 1);
    }
}
