import { CreateSubFormSchema } from '@/(app)/sub/create/_components/form-schema';
import { format } from 'date-fns';
import { getEndDate } from '~/lib/get-end-date';
import { SubsRepository } from '~/repository/subs.repository';

class SubsService {
  constructor(private subsRepository: SubsRepository) {}

  async getAll() {
    const data = await this.subsRepository.getAll();
    return data;
  }

  async create(payload: CreateSubFormSchema) {
    const startAtFormatted = format(payload.startAt, 'yyyy-MM-dd');
    const endDateFormatted = format(
      getEndDate(payload.startAt, payload.duration, payload.timeInterval),
      'yyyy-MM-dd',
    );

    const data = await this.subsRepository.create({
      notifyWhenCloseToFinish: payload.notifyWhenCloseToFinish,
      companyId: payload.service,
      finishAt: endDateFormatted,
      startAt: startAtFormatted,
      price: payload.price,
      name: payload.name,
    });
    return data;
  }
}

export const subsService = new SubsService(new SubsRepository());
