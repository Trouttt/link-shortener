import { Router } from 'express';
import ensureAuthenticate from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

import UrlsController from '../controllers/UrlsController';

const urlsRouter = Router();
const urlsController = new UrlsController();

urlsRouter.get('/:userId', ensureAuthenticate, urlsController.getUserUrls);
urlsRouter.get('/', urlsController.getMoreVisited);
urlsRouter.post('/', urlsController.create);
urlsRouter.put('/', urlsController.update);
urlsRouter.delete('/', urlsController.delete);

export default urlsRouter;
