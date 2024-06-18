import { HttpInterceptorFn } from '@angular/common/http';
import { authentication } from '../../types/constants/authentication';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(authentication.token);
  const validToken = token && token.length > 0;
  if(validToken) {
    req = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });
  }
  return next(req);
};
