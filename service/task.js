const { DB } = require("../firebase");
const { v4: uuidv4 } = require("uuid");
const os = require("os");

class TaskService {
    async getAllTasks() {
        const taskRef = DB.collection("tasks");
        const result = await taskRef.get();

        if (result.empty)
            return []
        
        return result.docs.map((task) => ({
            id: task.id,
            ...task.data()
        }))
    }

    async insertTask(task) {
        const id = uuidv4();
        task.id = id;
        task.computer = os.hostname();

        const taskRef = DB.collection("tasks").doc(id);
        await taskRef.set({
            id: task.id,
            description: task.description,
            computer: task.computer,
            status: task.status,
            responsable: task.responsable
        });

        const result = await taskRef.get();

        return { id, ...result.data() };
    }

    async updateTaskStatus(id, status) {
        const taskRef = DB.collection("tasks").doc(id);

        await taskRef.update({ status });

        return true;
    }
}

module.exports = { TaskService };
