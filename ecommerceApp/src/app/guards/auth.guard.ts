import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

//   let _UserAuthService = inject(UserAuthService);
//    let router = inject(Router);
//
//   if (_UserAuthService.getUserlogged()) {
//     return true;
//   }else{
//     router.navigateByUrl('/login')
//     return false;
//
//   }
return true;

};
