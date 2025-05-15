import { db } from '~/db';

export class SubsRepository {
  _db = db;

  async getAll() {
    const data = await this._db.query.user.findMany();
    return data;
  }
}
