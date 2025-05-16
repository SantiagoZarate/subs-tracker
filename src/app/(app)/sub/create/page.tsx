import { companyService } from '~/services/company.service';
import { CreateSubForm } from './_components/create-sub-form';

export default async function CreateSubPage() {
  const companies = await companyService.getAll();

  return (
    <section className="max-w-tablet mx-auto flex flex-col gap-8">
      <header>
        <h2 className="text-xl font-medium">Create a new subscription</h2>
      </header>
      <CreateSubForm companies={companies} />
    </section>
  );
}
