import 'reflect-metadata';
import { getRepository } from 'typeorm';
import AppError from '../../../shared/error/AppError';

import IShortUrl from '../infra/typeorm/entities/ShortUrl';

class GetShortUrlMoreVisitedService {
  public async execute(): Promise<Array<IShortUrl>> {
    try {
      const urlsRepository = await getRepository(IShortUrl);

      const links = await urlsRepository.find({
        order: { visited: 'DESC' },
        take: 100,
      });

      if (!links) {
        throw new AppError('Erro ao buscar links!!!', 400);
      }

      return links;
    } catch (err) {
      return err;
    }
  }
}
export default GetShortUrlMoreVisitedService;
