import { Server } from 'http';
import request from 'supertest';
import { Hero } from '../../src/domains';

import { createServer } from '../../src/server';

const AUTH_HEADERS = {
  name: 'hahow',
  password: 'rocks',
};

const toBeHero = (hero: Hero, { id = '', isAuth = false } = {}) => {
  expect(hero).toEqual({
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

describe('Hero resourse', () => {
  jest.setTimeout(10000);
  let server: Server;

  beforeAll(() => {
    server = createServer();
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /heroes', () => {
    it('should get heroes', async () => {
      const res = await request(server).get('/heroes');

      expect(res.status).toBe(200);
      res.body.heroes.forEach((hero: Hero) => toBeHero(hero));
    });

    it('should get auth heroes', async () => {
      const res = await request(server)
        .get('/heroes')
        .set(AUTH_HEADERS);

      expect(res.status).toBe(200);
      res.body.heroes.forEach((hero: Hero) => toBeHero(hero, { isAuth: true }));
    });
  });

  describe('GET /heroes/:heroId', () => {
    it('should get hero with id 1', async () => {
      const res = await request(server).get('/heroes/1');

      expect(res.status).toBe(200);
      toBeHero(res.body, { id: '1' });
    });

    it('should get auth hero with id 1', async () => {
      const res = await request(server)
        .get('/heroes/1')
        .set(AUTH_HEADERS);

      expect(res.status).toBe(200);
      toBeHero(res.body, { id: '1', isAuth: true });
    });

    it('should be 404', async () => {
      const res = await request(server).get('/heroes/9999');

      expect(res.status).toBe(404);
    });
  });
});
