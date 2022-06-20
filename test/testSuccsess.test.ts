const supertest = require('supertest');
import { server } from '../src/index';
import { HTTP_STATUS } from '../src/utils/constants';
const content = 'Content-Type'
const API_USERS = '/api/users'
const request = supertest(server);
const res = [];
const test = 'username=GENAgg&age=23&hobbies=drug%2C%20sex'
const testUpdate = 'username=Grisha&age=35&hobbies=drug%2C%20sex'
jest.useRealTimers()


describe('Test 1: Succsess  round for user ', () => {
    jest.setTimeout(35000)

    it('Must return empty array of users for first GET all call', async () => {
        await request.get(API_USERS)
            .expect(HTTP_STATUS.OK)
            .expect(content, /json/)
            .then((response) => {
                expect(response.body).toEqual(res);
            });
    });
    it('POST create a new object', async () => {
        jest.setTimeout(35000)

        await request
            .post(API_USERS)
            .set('Accept', 'application/json')
            .send(test)
            .expect('Content-Type', 'application/json')
            .expect(HTTP_STATUS.CREATED)
            .then((response) => {
                expect(response.body).toEqual(`User was saved on "CRUD-API/data/users.json" base.   `);
            });
    });
    it('GET one must return First User from List', async () => {
        jest.setTimeout(35000)
        let id;
        await request
            .get(API_USERS)
            .expect(HTTP_STATUS.OK)
            .then((response) => {
                id = response.body.map((e) => e.id);
            });
        await request
            .get(`${API_USERS}/${id.join()}`)
            .set('Accept', 'application/json')
            .expect(HTTP_STATUS.OK)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body[0].id).toEqual(id.join());
            });
    });
    it('PUT should update object keys', async () => {
        jest.setTimeout(40000)

        let id;
        await request
            .get(API_USERS)
            .expect(HTTP_STATUS.OK)
            .then((response) => {
                id = response.body.map((element) => element.id);
            });
        await request
            .put(`${API_USERS}/${id.join()}`)
            .set('Accept', 'application/json')
            .send(testUpdate)
            .expect(HTTP_STATUS.OK)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(`User was updated`);
            });
    });
    it('DELETE must remove obj from json', async () => {
        let userID;
        await request
            .get(API_USERS)
            .expect(HTTP_STATUS.OK)
            .then((response) => {
                userID = response.body.map((element) => element.id);
            });
        await request
            .delete(`${API_USERS}/${userID.join()}`)
            .set('Accept', 'application/json')
            .expect(HTTP_STATUS.DELETED)
            .expect('Content-Type', /json/);
        await request
            .get(`/api/users/${userID.join()}`)
            .set('Accept', 'application/json')
            .expect(HTTP_STATUS.NOT_FOUND)
            .expect('Content-Type', /json/);
    });
});

