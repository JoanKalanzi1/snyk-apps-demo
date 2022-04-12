import type { AxiosError, AxiosRequestConfig } from 'axios';
import { Envars } from '../../types';
import { DateTime } from 'luxon';
import User from '../../utils/db/dbmodel';
import { EncryptDecrypt } from '../encrypt-decrypt';
import { refreshAuthToken } from '../apiRequests';
import axios from 'axios';

/**
 * An axios interceptor that will refresh the auth token
 * using the refresh token when the auth token expires
 * @param {AxiosRequestConfig} request that can be used in the interceptor
 * for conditional checks
 * @returns Axios request interceptor
 */
export async function refreshTokenReqInterceptor(request: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  // Read the latest data(auth token, refresh token and expiry)

  //TODO : FIX LATER TO GET THE CORRECT USER
  //get all users in the database
  const users = await User.findAll();
  const data = users[0];

  // Data used to calculate the expiry
  const expiresIn = data.expire_in;
  const updatedDate = data.updatedAt;
  const stringUpdated = DateTime.fromISO(updatedDate.toString());
  // Used npm library luxon to parse the date and calculate expiry

  const expirationDate = stringUpdated.plus({ seconds: expiresIn });

  // Check if expired
  if (expirationDate < DateTime.now()) {
    await refreshAndUpdateDb(data);
  }
  return request;
}

export async function refreshTokenRespInterceptor(error: AxiosError): Promise<AxiosError> {
  const status = error.response ? error.response.status : null;

  // Only refresh & retry the token on 401 Unauthorized, in case the access-token is
  //  invalidated before it expires, such as the signing key being rotated in an emergency.
  if (status === 401) {
    // Read the latest data(auth token, refresh token and expiry)
    //TODO : FIX LATER TO GET THE CORRECT USER
    //get all users in the database
    const users = await User.findAll();
    const data = users[0];

    const newAccessToken = await refreshAndUpdateDb(data);

    // Use the new access token to retry the failed request
    error.config.headers['Authorization'] = `${data.token_type} ${newAccessToken}`;
    return axios.request(error.config);
  }

  return Promise.reject(error);
}

/**
 * Refreshes the access-token for a given DB record, and updates the DB again
 * @param {User} data database entry with authentication info
 * @returns string Newly refreshed access-token
 */
async function refreshAndUpdateDb(data: User): Promise<string> {
  // Create a instance for encryption and decryption
  const eD = new EncryptDecrypt(process.env[Envars.EncryptionSecret] as string);
  // Make request to refresh token
  const { access_token, expires_in, refresh_token, scope, token_type } = await refreshAuthToken(
    eD.decryptString(data.refresh_token),
  );
  // Update the access and refresh token with the newly fetched access and refresh token
  // along with the expiry and other required info
  await User.update(
    {
      access_token: eD.encryptString(access_token),
      expires_in,
      refresh_token: eD.encryptString(refresh_token),
      token_type,
    },
    {
      where: { userId: data.userId },
    },
  );

  return access_token;
}
