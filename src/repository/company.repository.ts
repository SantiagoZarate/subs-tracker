import { companyDTO } from '~/common/dtos/company.dto';
import { db } from '~/db';

export class CompanyRepository {
  private readonly _db = db;

  async getAll() {
    const data = await this._db.query.company.findMany();
    return data.map((d) => companyDTO.parse(d));
  }
}
