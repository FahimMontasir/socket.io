import express from 'express';
import { UserRoutes } from '../modules/rest/user/user.routes';

const router = express.Router();

// the routes of socket sever is inside socket.server.ts

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.map(r => router.use(r.path, r.route));

export default router;
