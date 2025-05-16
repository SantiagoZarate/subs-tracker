import { CompanyRepository } from '~/repository/company.repository';

class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  public async getAll() {
    const data = await this.companyRepository.getAll();
    return data;
  }
}

export const companyService = new CompanyService(new CompanyRepository());
