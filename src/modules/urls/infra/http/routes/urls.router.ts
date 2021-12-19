import { Router } from 'express';

import UrlsController from '../controllers/UrlsController';

const urlsRouter = Router();
const urlsController = new UrlsController();

urlsRouter.post('/', urlsController.create);

export default urlsRouter;
