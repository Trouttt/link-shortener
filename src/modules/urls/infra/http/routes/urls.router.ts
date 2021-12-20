import { Router } from 'express';

import UrlsController from '../controllers/UrlsController';

const urlsRouter = Router();
const urlsController = new UrlsController();

urlsRouter.get('/', urlsController.getMoreVisited);
urlsRouter.post('/', urlsController.create);
urlsRouter.put('/', urlsController.update);

export default urlsRouter;
