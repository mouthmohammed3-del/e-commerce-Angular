import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';

export const authinterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  // 1. استخدام inject للوصول إلى خدمة المصادقة
  const userAuthService = inject(UserAuthService);
  const token = userAuthService.getToken();

  // 2. إذا كان هناك توكن، ننسخ الطلب الأصلي ونضيف التوكن في الهيدر
  if (token) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(modifiedReq);
  }

  // 3. إذا لم يكن هناك توكن، نمرر الطلب كما هو
  return next(req);
};
