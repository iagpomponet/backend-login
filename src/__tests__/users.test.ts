import request from "supertest"
import jwt from 'jsonwebtoken';
import app from "../server"


describe("User routes tests", () => {
    it("it should login and return a valid token", async () => {
        const response = await request(app)
        .post('/users/login')
        .send({
            email: "iagosilbernagel2@hotmail.com",
            password: "123"
        });

        const token = response.header['set-cookie'][0].split('backend_login_token=')[1];
        console.log('response', response.header['set-cookie'][0]);
        console.log('token', token);
        const isTokenValid = jwt.verify(token, process.env.SECRET!);

        console.log('isTokenValid :>> ', isTokenValid);

        expect(isTokenValid).toBeTruthy();
    })
})