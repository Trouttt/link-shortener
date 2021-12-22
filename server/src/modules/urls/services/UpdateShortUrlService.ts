import 'reflect-metadata';
import { getRepository } from 'typeorm';
import AppError from '../../../shared/error/AppError';
import IShortUrl from '../infra/typeorm/entities/ShortUrl';

interface IRequest {
  id: string;
}

class UpdateUrlService {
  public async execute({ id }: IRequest): Promise<IShortUrl> {
    try {
      const urlsRepository = await getRepository(IShortUrl);
      if (!id || id.length === 0) {
        throw new AppError('Id inválido!!!', 400);
      }
      const link = await urlsRepository.findOne({
        where: { id },
      });
      if (link) {
        link.visited += 1;
      } else {
        throw new AppError('A url não existe!!!', 400);
      }

      await urlsRepository.update(id, link);

      return link;
    } catch (err) {
      return err;
    }
  }
}
export default UpdateUrlService;
