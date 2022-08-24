import { Response, Request } from 'express';

export const createAuthCookie = (res: Response, TOKEN: string) => {
  res.cookie('Authentication', TOKEN, {
    //TODO: 배포시 .env 파일에 보관할것
    maxAge: 86400000, // 1d
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
};

export const getCookie = (req: Request, cookieName: string) => {
  let cookie = null;

  if (req && req.cookies) {
    cookie = req.cookies[cookieName];
  }
  return cookie;
};
