const { TaskController } = require("../controller/task");
const { TaskService } = require("../service/task");

jest.mock("@google-cloud/firestore", () => {
    return {
        Firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    update: jest.fn(() => Promise.resolve()),
                })),
            })),
        })),
    };
});

describe("Update tasks", () => {
    test("update task with correct status", async () => {
        let result = null;
        const req = { body: { id: 1, status: "todo" } };
        const res = {
            send: jest.fn((data) => {
                result = data;
            }),
            status: jest.fn().mockReturnThis(),
        };

        const controller = new TaskController(new TaskService())
        await controller.updateTaskStatus(req, res)

        expect(result).not.toBeNull();
        expect(res.status).toHaveBeenCalledWith(204);
    })

    test("update task with wrong status", async () => {
        let result = null;
        const req = { body: { id: 1, status: "asd" } };
        const res = {
            send: jest.fn((data) => {
                result = data;
            }),
            status: jest.fn().mockReturnThis(),
        };

        const controller = new TaskController(new TaskService())
        await controller.updateTaskStatus(req, res)

        expect(result).not.toBeNull();
        expect(res.status).toHaveBeenCalledWith(400);
    })
})
