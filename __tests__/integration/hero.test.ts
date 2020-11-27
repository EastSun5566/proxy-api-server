import { Server } from 'http';
import request from 'supertest';
import { Hero } from '../../src/domains';
import { createServer } from '../../src/server';
import { UnauthenticatedError, NotFoundError } from '../../src/utils/errors';

const toBeHero = (hero: Hero, { id = '', isAuth = false } = {}) => {
  expect(hero).toMatchObject({
    id: id || expect.any(String),
    name: expect.any(String),
    image: expect.any(String),
    ...(isAuth && {
      profile: {
        str: expect.any(Number),
        int: expect.any(Number),
        agi: expect.any(Number),
        luk: expect.any(Number),
      },
    }),
  });
};

describe('Hero resource', () => {
  jest.setTimeout(10000);

  const validAuthHeader = { name: 'hahow', password: 'rocks' };
  const inValidAuthHeader = { name: 'hahow', password: 'rockssss' };
  const heroId = '1';

  let server: Server;

  beforeAll(() => {
    server = createServer();
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /heroes', () => {
    it('should return 200 with heroes', async () => {
      const res = await request(server).get('/heroes');

      expect(res.status).toBe(200);
      res.body.heroes.forEach((hero: Hero) => toBeHero(hero));
    });

    it('should return 200 with auth heroes when has auth headers', async () => {
      const res = await request(server)
        .get('/heroes')
        .set(validAuthHeader);

      expect(res.status).toBe(200);
      res.body.heroes.forEach((hero: Hero) => toBeHero(hero, { isAuth: true }));
    });

    it('should return 401 when has invalid auth headers', async () => {
      const res = await request(server)
        .get('/heroes')
        .set(inValidAuthHeader);

      expect(res.status).toBe(401);
      expect(res.body).toMatchObject({ message: new UnauthenticatedError().message });
    });
  });

  describe('GET /heroes/:heroId', () => {
    it(`should return 200 with hero which id is ${heroId}`, async () => {
      const res = await request(server).get(`/heroes/${heroId}`);

      expect(res.status).toBe(200);
      toBeHero(res.body, { id: heroId });
    });

    it(`should return 200 with auth hero which id is ${heroId} when has auth headers`, async () => {
      const res = await request(server)
        .get(`/heroes/${heroId}`)
        .set(validAuthHeader);

      expect(res.status).toBe(200);
      toBeHero(res.body, { id: heroId, isAuth: true });
    });

    it('should return 401 when has invalid auth headers', async () => {
      const res = await request(server)
        .get(`/heroes/${heroId}`)
        .set(inValidAuthHeader);

      expect(res.status).toBe(401);
      expect(res.body).toMatchObject({ message: new UnauthenticatedError().message });
    });

    it('should return 404 when no hero id is 999', async () => {
      const res = await request(server).get('/heroes/999');

      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({ message: new NotFoundError().message });
    });
  });
});
