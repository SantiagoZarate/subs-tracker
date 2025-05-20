import { CreateSubFormSchema } from '@/(app)/sub/create/_components/form-schema';
import { format } from 'date-fns';
import { headers } from 'next/headers';
import { auth } from '~/lib/auth';
import { getEndDate } from '~/lib/get-end-date';
import { SubsRepository } from '~/repository/subs.repository';

class SubsService {
  constructor(private subsRepository: SubsRepository) {}

  async getAll() {
    const data = await this.subsRepository.getAll();
    return data;
  }

  async getAllMySubs() {
    const currentSession = await auth.api.getSession({
      headers: await headers(),
    });

    if (!currentSession?.user) {
      throw new Error('Unauthorized');
    }

    const data = await this.subsRepository.getAllMySubs({
      id: currentSession.user.id,
    });

    return data;
  }

  async create(payload: CreateSubFormSchema) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error('Unauthorized');
    }

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
      userId: session.user.id,
    });
    return data;
  }
}

export const subsService = new SubsService(new SubsRepository());
