import { subscriptionDTO, SubscriptionDTO } from '~/common/dtos/subs.dto';
import { db } from '~/db';
import { subscription } from '~/db/schemas/subscription.schema';
import { SubscriptionInsert } from '~/db/types/sub.type';

export class SubsRepository {
  _db = db;

  async getAll(): Promise<SubscriptionDTO[]> {
    const data = await this._db.query.subscription.findMany({
      with: {
        company: true,
      },
    });

    console.log({ data });

    return data.map((d) => subscriptionDTO.parse(d));
  }

  async create(payload: SubscriptionInsert) {
    const results = await this._db
      .insert(subscription)
      .values(payload)
      .returning({ id: subscription.id });

    return results[0].id;
  }
}
