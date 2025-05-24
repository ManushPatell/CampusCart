import sql from './db.ts';

export const registerToken = async (refreshToken: string): Promise<string> => {
  try {
    const token = await sql`
    INSERT INTO refresh_tokens (token)
    VALUES (${refreshToken})
    RETURNING token;
    `;
    return token[0][0];
  } catch (err) {
    throw new Error(String(err));
  }
};

export const deleteToken = async (refreshToken: string): Promise<string> => {
  try {
    const token = await sql`
        DELETE FROM refresh_tokens
        WHERE token=${refreshToken}
        `;
    return token[0][0];
  } catch (err) {
    throw new Error(String(err));
  }
};

export const isTokenRegistered = async (
  refreshToken: string
): Promise<boolean> => {
  try {
    const isRegistered = sql``
  } catch (err) {
    throw new Error(String(err));
  }
};
