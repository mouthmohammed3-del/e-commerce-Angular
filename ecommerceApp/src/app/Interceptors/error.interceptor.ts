import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { UserAuthService } from '../services/user-auth.service';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const userAuthService = inject(UserAuthService);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred.';

      if (error.error instanceof ErrorEvent) {
        // Client-side or Network error
        errorMessage = `Network Error: ${error.error.message}`;
      } else {
        // Server-side response error codes
        switch (error.status) {
          case 0:
            errorMessage = 'Unable to connect to server. Please check your internet connection.';
            break;
          case 400:
            errorMessage = error.error?.message || 'Bad Request: Please check your input.';
            break;
          case 401:
            errorMessage = 'Your session has expired. Please log in again.';
            userAuthService.logout();
            router.navigate(['/login']);
            break;
          case 403:
            errorMessage = 'Access Denied: You do not have permission to perform this action.';
            break;
          case 404:
            errorMessage = error.error?.message || 'The requested resource was not found.';
            break;
          case 500:
            errorMessage = 'Internal Server Error. Please try again later.';
            break;
          default:
            errorMessage = error.error?.message || `HTTP Error ${error.status}: ${error.statusText || 'Unknown'}`;
            break;
        }
      }

      Toast.fire({
        icon: 'error',
        title: errorMessage
      });

      return throwError(() => error);
    })
  );
};
