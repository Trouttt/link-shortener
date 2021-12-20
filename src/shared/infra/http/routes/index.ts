import { Router } from 'express';
import { createConnection } from 'typeorm';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.router';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import urlsRouter from '../../../../modules/urls/infra/http/routes/urls.router';

createConnection();
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/urls', urlsRouter);

export default routes;
