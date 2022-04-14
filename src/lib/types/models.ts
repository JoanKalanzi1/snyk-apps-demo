
import { DateTime } from 'luxon';

export interface Org {
  id: string;
  name: string;
}
export interface  IUserAttributes {

  access_token: string;
  userId: string;
  orgs: string[];
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token: string;
  nonce : string;
  updatedAt: DateTime;
  createdAt: DateTime;
};

