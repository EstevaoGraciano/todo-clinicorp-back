const { TaskController } = require("../controller/task");
const { TaskService } = require("../service/task");

jest.mock("@google-cloud/firestore", () => {
    const mockTasks = [
        { description: "Desc", responsable: "Res", status: "todo" },
    ];
    return {
        Firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                get: jest.fn(() =>
                    Promise.resolve({
                        empty: false,
                        docs: mockTasks.map((task, id) => ({
                            id,
                            data: jest.fn(() => task),
                        })),
                    }),
                ),
            })),
        })),
    };
});

describe("Get tasks", () => {
    test("get all tasks route", async () => {
        let result = null
        const req = {};
        const res = {
            send: jest.fn((data) => {
                result = data;
            }),
            status: jest.fn().mockReturnThis(),
        };

        const controller = new TaskController(new TaskService());

        await controller.getTasks(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.result).not.toBeNull();
    });
});
