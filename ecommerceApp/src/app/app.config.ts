import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { authinterceptor } from './Interceptors/authinterceptor.service';
import { provideStore } from '@ngrx/store';
import { counterreducer, languageReducer } from './store/counter/counter.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch(), withInterceptors([authinterceptor])),

   provideStore({
    counter : counterreducer,
    language: languageReducer

   })]


};

