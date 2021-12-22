import { Router } from 'express';
import ensureAuthenticate from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.get('/', sessionsController.security, ensureAuthenticate);
sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
