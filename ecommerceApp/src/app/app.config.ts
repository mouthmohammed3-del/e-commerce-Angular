import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import { authinterceptor } from './Interceptors/authinterceptor.service';
import { loadingInterceptor } from './Interceptors/loading.interceptor';
import { errorInterceptor } from './Interceptors/error.interceptor';
import { provideStore } from '@ngrx/store';
import { counterreducer, languageReducer } from './store/counter/counter.reducer';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// دالة لتحميل ملفات الترجمة (en.json, ar.json)
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(
      withFetch(), 
      withInterceptors([authinterceptor, loadingInterceptor, errorInterceptor])
    ),
    provideStore({
      counter: counterreducer,
      language: languageReducer
    }),
    // تفعيل إعدادات الترجمة هنا
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};
