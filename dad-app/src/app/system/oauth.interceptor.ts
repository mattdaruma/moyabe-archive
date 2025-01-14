import { HttpInterceptorFn } from '@angular/common/http';

export const oauthInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
