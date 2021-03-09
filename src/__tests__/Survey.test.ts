import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });
    it("should be able to create a new surveys", async() => {
        const response = await request(app).post("/surveys")
        .send({
            title: "Robin example",
            description: "Robin exemple"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });
    it("should be able to get all surveys", async() => {
        await request(app).post("/surveys")
        .send({
            title: "Robin example2",
            description: "Robin exemple2"
        });

        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    })
});