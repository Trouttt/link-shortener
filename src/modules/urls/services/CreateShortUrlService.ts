import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import IShortUrl from '../infra/typeorm/entities/ShortUrl';
import AppError from '../../../shared/error/AppError';

interface IRequest {
  url: string;
  shortUrl: string;
  user_id: string;
  visited: number;
}

class CreateUserService {
  public async execute({ url, user_id }: IRequest): Promise<IShortUrl> {
    try {
      const urlsRepository = await getRepository(IShortUrl);

      if (url.length === 0 || !url) {
        throw new AppError('Campo URL está vazio!!!', 400);
      }

      const idRandom = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
        .substr(0, 5);

      const link = await urlsRepository.create({
        url,
        shortUrl: `localhost:8080/${idRandom}`,
        user_id,
        visited: 0,
      });

      await urlsRepository.save(link);

      return link;
    } catch (err) {
      return err;
    }
  }
}
export default CreateUserService;
