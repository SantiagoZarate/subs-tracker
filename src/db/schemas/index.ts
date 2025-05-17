import { account, session, user, verification } from './auth.schema';
import { company, companyRelations } from './company.schema';
import { subscription, subscriptionRelations } from './subscription.schema';

export const schema = {
  subscription,
  user,
  company,
  companyRelations,
  subscriptionRelations,
  account,
  session,
  verification,
};
