const { TaskController } = require("../controller/task");
const { TaskService } = require("../service/task");
const { Task } = require("../types/task");

jest.mock("@google-cloud/firestore", () => {
    const mockTask = { description: "Desc", responsable: "Res", status: "todo" }
    return {
        Firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    set: jest.fn(() => Promise.resolve()),
                    get: jest.fn(() =>
                        Promise.resolve({
                            exists: true,
                            data: jest.fn(() => mockTask),
                        }),
                    ),
                })),
            })),
        })),
    };
});

describe("Insert task", function() {
    test("create and insert task with all info", async () => {
        const mockTask = new Task("Descrição", "Responsável", "todo");
        let result = null;
        const req = { body: mockTask };
        const res = {
            send: jest.fn((data) => {
                result = data;
            }),
            status: jest.fn().mockReturnThis(),
        };

        const controller = new TaskController(new TaskService());

        await controller.insertTask(req, res);

        expect(result).not.toBeNull();
        expect(res.status).toHaveBeenCalledWith(201);
    });

    test("new task with no description", async () => {
        const mockTask = new Task("", "Responsável", "todo");
        mockTask.validate();

        expect(mockTask.errors).toHaveLength(1);
    });

    test("new task with no responsable", async () => {
        const mockTask = new Task("Descrição", "", "todo");
        mockTask.validate();

        expect(mockTask.errors).toHaveLength(1);
    });

    test("new task with no status", async () => {
        const mockTask = new Task("Descrição", "Responsável", "");
        mockTask.validate();

        expect(mockTask.errors).toHaveLength(1);
    });
});
