import 'reflect-metadata';
import { getRepository } from 'typeorm';
import AppError from '../../../shared/error/AppError';
import IShortUrl from '../infra/typeorm/entities/ShortUrl';

interface IRequest {
  id: string;
}

class DeleteUrlService {
  public async execute({ id }: IRequest): Promise<IShortUrl> {
    try {
      const urlsRepository = await getRepository(IShortUrl);
      if (!id || id.length === 0) {
        throw new AppError('Id inválido!!!', 400);
      }
      const link = await urlsRepository.findOne({
        where: { id },
      });

      if (!link) {
        throw new AppError('A url não existe!!!', 400);
      }

      await urlsRepository.delete(id);

      return link;
    } catch (err) {
      return err;
    }
  }
}
export default DeleteUrlService;
