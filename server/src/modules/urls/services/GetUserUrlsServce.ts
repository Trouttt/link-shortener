import 'reflect-metadata';
import { getRepository } from 'typeorm';
import AppError from '../../../shared/error/AppError';

import IShortUrl from '../infra/typeorm/entities/ShortUrl';

interface IRequest {
  user_id: string;
}
class GetUserShortUrlService {
  public async execute({ user_id }: IRequest): Promise<Array<IShortUrl>> {
    try {
      const urlsRepository = await getRepository(IShortUrl);

      const links = await urlsRepository.find({
        order: { visited: 'DESC' },
        where: { user_id },
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
export default GetUserShortUrlService;
