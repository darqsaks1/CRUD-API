const supertest = require('supertest');
import { server } from '../src/index';
import { HTTP_STATUS } from '../src/utils/constants';
const API_USERS = '/api/users'
const request = supertest(server);
const testUnvalid = 'fssd=GENAgg&age=23&hobbies=drug%2C%20sex'
const notFound = 'a9df5b87-8764-42e6-9069-8474237b1598';
jest.useRealTimers()

describe('Test 1: Not succsess  round for user ', () => {

    it('POST must return error with invalid response', async () => {
        jest.setTimeout(35000)

        await request
            .post(API_USERS)
            .set('Accept', 'application/json')
            .send(testUnvalid)
            .expect('Content-Type', 'application/json')
            .expect(HTTP_STATUS.BAD_RESPONSE)

    });
    it('GET should retun NOT FOUND if id is not invalid', async () => {
        jest.setTimeout(35000)

        await request
            .get(`/api/users/${notFound}`)
            .set('Accept', 'application/json')
            .expect(HTTP_STATUS.NOT_FOUND)
            .expect('Content-Type', /json/);
    });
    it('DELETE should retun NOT FOUND if id is not invalid', async () => {
        await request
            .delete(`/api/users/${notFound}`)
            .set('Accept', 'application/json')
            .expect(HTTP_STATUS.NOT_FOUND)
            .expect('Content-Type', /json/);
    });
    it('PUT should retun NOT FOUND if id is not invalid', async () => {
        await request
            .put(`/api/users/${notFound}`)
            .set('Accept', 'application/json')
            .expect(HTTP_STATUS.NOT_FOUND)
            .expect('Content-Type', /json/);
    });
});

