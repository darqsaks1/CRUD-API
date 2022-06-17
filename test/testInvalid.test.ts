const supertest = require('supertest');
import { server } from '../src/index';
import { HTTP_STATUS } from '../src/utils/constants';
const request = supertest(server);
const notFound = 'a23423423423423423efqef9df5b87-8764-42e6-9069-8474237b1598';
jest.useRealTimers()

describe('Test 1: Not succsess  round for user ', () => {

    it('GET should retun BAD_RESPONSE if id is invalid', async () => {
        await request
            .get(`/api/users/${notFound}`)
            .set('Accept', 'application/json')
            .expect(HTTP_STATUS.BAD_RESPONSE)
            .expect('Content-Type', /json/);
    });
    it('DELETE should retun BAD_RESPONSE if id is invalid', async () => {
        await request
            .delete(`/api/users/${notFound}`)
            .set('Accept', 'application/json')
            .expect(HTTP_STATUS.BAD_RESPONSE)
            .expect('Content-Type', /json/);
    });
    it('PUT should retun BAD_RESPONSE if id is invalid', async () => {
        await request
            .put(`/api/users/${notFound}`)
            .set('Accept', 'application/json')
            .expect(HTTP_STATUS.BAD_RESPONSE)
            .expect('Content-Type', /json/);
    });
});
