import 'reflect-metadata';
import { getRepository } from 'typeorm';
import AppError from '../../../shared/error/AppError';

import IShortUrl from '../infra/typeorm/entities/ShortUrl';

interface IRequest {
  shortUrl: string;
}
class GetUrlFromShortUrlService {
  public async execute({ shortUrl }: IRequest): Promise<IShortUrl> {
    try {
      const urlsRepository = await getRepository(IShortUrl);

      const link = await urlsRepository.findOne({
        where: { shortUrl },
      });

      if (!link) {
        throw new AppError('Erro ao buscar links!!!', 400);
      }

      return link;
    } catch (err) {
      return err;
    }
  }
}
export default GetUrlFromShortUrlService;
