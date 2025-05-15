import { SubsRepository } from '~/repository/subs.repository';

class SubsService {
  constructor(private subsRepository: SubsRepository) {}

  async getAll() {
    const data = await this.subsRepository.getAll();
    return data;
  }
}

export const subsService = new SubsService(new SubsRepository());
