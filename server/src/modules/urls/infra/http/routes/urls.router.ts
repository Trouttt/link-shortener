import { Router } from 'express';
import ensureAuthenticate from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

import UrlsController from '../controllers/UrlsController';

const urlsRouter = Router();
const urlsController = new UrlsController();

urlsRouter.post('/user', ensureAuthenticate, urlsController.getUserUrls);
urlsRouter.get('/', urlsController.getMoreVisited);
urlsRouter.post('/', urlsController.create);
urlsRouter.post('/find', urlsController.getUrlFromShortUrl);
urlsRouter.put('/', urlsController.update);
urlsRouter.delete('/:id', ensureAuthenticate, urlsController.delete);

export default urlsRouter;
