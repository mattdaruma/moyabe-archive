import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ProgressService } from './progress.service';
import { delay, finalize, from } from 'rxjs';

export const progressInterceptor: HttpInterceptorFn = (req, next) => {
  let svc = inject(ProgressService)
  svc.HttpRequestBegin()
  return next(req).pipe(finalize(()=>{svc.HttpRequestEnd()}));
};