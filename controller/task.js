const { TaskService } = require("../service/task");
const { ApiResponse } = require("../types/apiResponse");
const { Task } = require("../types/task");

class TaskController {
    constructor(service) {
        this.service = service;

        Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter((method) => typeof this[method] === "function")
            .forEach((method) => {
                this[method] = this[method].bind(this);
            });
    }

    async getTasks(req, res) {
        try {
            const result = await this.service.getAllTasks();
            res.status(200).send(new ApiResponse(result));
        } catch (e) {
            res.status(500).send(new ApiResponse([], false, [e.message]));
        }
    }

    async insertTask(req, res) {
        try {
            const taskBody = req.body;
            let task = new Task(
                taskBody.description,
                taskBody.responsable,
                taskBody.status,
            );

            if (!task.validate())
                res.status(400).send(new ApiResponse(null, false, task.errors));

            const result = await this.service.insertTask(task);

            res.status(201).send(new ApiResponse(result));
        } catch (e) {
            res.status(500).send(new ApiResponse([], false, [e.message]));
        }
    }

    async updateTaskStatus(req, res) {
        try {
            const id = req.body.id;
            const status = req.body.status;

            if (!Task.validateStatus(status))
                res.status(400).send(new ApiResponse(null, false, ["Status inválido"]));

            const result = await this.service.updateTaskStatus(id, status);

            res.status(204).send(new ApiResponse(result));
        } catch (e) {
            res.status(500).send(new ApiResponse([], false, [e.message]));
        }
    }
}

const setTaskRoutes = (app) => {
    const service = new TaskService();
    const controller = new TaskController(service);

    app.get("/get-tasks", controller.getTasks);
    app.post("/insert-tasks", controller.insertTask);
    app.put("/update-tasks", controller.updateTaskStatus);
};

module.exports = { setTaskRoutes };
