import { companyService } from '~/services/company.service';
import { CreateSubForm } from './_components/create-sub-form';

export default async function CreateSubPage() {
  const companies = await companyService.getAll();

  return (
    <section className="max-w-tablet mx-auto">
      <header>Create a new subscription</header>
      <CreateSubForm companies={companies} />
    </section>
  );
}
