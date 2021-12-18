import { Router } from 'express';
import { createConnection } from 'typeorm';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.router';

import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';

createConnection();
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
