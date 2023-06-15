const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const server = app.listen(8080, () => console.log("lets get ready to test"));
const Todo = require("../models/todo");
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  mongoServer.stop();
  server.close();
});

describe("Test the todos endpoints", () => {
  test("It should create a new todo", async () => {
    const response = await request(app)
      .post("/todos")
      .send({ title: "Gym", description: "jog 30 minutes" });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toEqual("Gym");
    expect(response.body.description).toEqual("jog 30 minutes");
    expect(response.body.completed).toEqual(false);
  });

  test("It should return an array of todos", async () => {
    const todos = [
      {
        title: "Gym",
        description: "jog 30 minutes",
      },
      {
        title: "study",
        description: "study for an hour",
      },
    ];

    Todo.find = jest.fn().mockResolvedValue(todos);

    const response = await request(app).get("/todos");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(todos);
  });

  test("It should update a todo", async () => {
    const todo = new Todo({ title: "gym", description: "jog" });
    await todo.save();

    const response = await request(app)
      .put(`/todos/${todo._id}`)
      .send({ title: "study", description: "homework" });

    expect(response.statusCode).toBe(200);
  });
});
describe("Test the todos endpoints for edge cases", () => {
  test("It should not create a todo", async () => {
    const response = await request(app)
      .post("/todos")
      .send({ description: "jog 30 minutes" });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual("Title is required");
  });

  test("It should return no documents found", async () => {
    const todos = [];
    Todo.find = jest.fn().mockResolvedValue(todos);

    const response = await request(app).get("/todos");
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("No todos");
  });

  test("It should not update a todo", async () => {
    const todo = new Todo({ title: "study", description: "hw" });
    const randomId = new mongoose.Types.ObjectId();
    await todo.save();

    const response = await request(app)
      .put(`/todos/${randomId}`)
      .send({ title: "study", description: "homework" });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual("No todo to update");
  });
});
