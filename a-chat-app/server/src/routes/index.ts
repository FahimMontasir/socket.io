import express, { Router } from 'express';
import { UserRoutes } from '../modules/rest/user/user.routes';
import { FriendInvitationRoutes } from '../modules/rest/friendInvitation/friendInvitation.routes';

const router = express.Router();

type IModuleRoutes = {
  path: string;
  route: Router;
}[];

// the routes/events of socket sever is inside socket.server.ts
// route started with /api/v1
const moduleRoutes: IModuleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/friend-invitation',
    route: FriendInvitationRoutes,
  },
];

moduleRoutes.map(r => router.use(r.path, r.route));

export default router;
