import sql from './db.ts';

export const registerToken = async (
  refreshToken: string,
  userId: number
): Promise<string> => {
  const tokenRow = await sql<{ token: string }[]>`
  INSERT INTO refresh_tokens (token, user_id)
  VALUES (${refreshToken}, ${userId})
  RETURNING token;
  `;
  return !tokenRow[0] ? '' : tokenRow[0].token;
};

export const deleteTokenById = async (id: number): Promise<string> => {
  const token = await sql<{ token: string }[]>`
  DELETE FROM refresh_tokens
  WHERE user_id=${id}
  RETURNING token;`;
  return !token[0] ? '' : token[0].token;
};

export const deleteToken = async (token: string): Promise<string> => {
  const deletedToken = await sql<{ token: string }[]>`
  DELETE FROM refresh_tokens
  WHERE token=${token}
  RETURNING token;`;
  return !deletedToken[0] ? '' : deletedToken[0].token;
};

export const isRefreshTokenRegistered = async (
  refreshToken: string
): Promise<boolean> => {
  const isRegistered = await sql`
    SELECT COUNT(*) 
    FROM refresh_tokens 
    WHERE token=${refreshToken};`;
  return isRegistered ? true : false;
};
