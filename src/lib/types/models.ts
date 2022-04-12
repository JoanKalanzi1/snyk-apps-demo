export interface Org {
  id: string;
  name: string;
}

export interface User {
  userId: string;
  orgId: string;
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  nonce: string;
  refresh_token: string;
}
