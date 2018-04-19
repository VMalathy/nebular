import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { NbAuthResult } from '../services/auth-result';
import { NbAuthStrategyOptions } from './auth-strategy-options';
import { deepExtend, getDeepFromObject } from '../helpers';

export abstract class NbAuthStrategy {

  protected defaultOptions: NbAuthStrategyOptions;
  protected options: NbAuthStrategyOptions;

  // we should keep this any and validation should be done in `register` method instead
  // otherwise it won't be possible to pass an empty object
  setOptions(options: any): void {
    this.options = deepExtend({}, this.defaultOptions, options);
  }

  getOption(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  getName(): string {
    return this.getOption('name');
  }

  abstract authenticate(data?: any): Observable<NbAuthResult>;

  abstract register(data?: any): Observable<NbAuthResult>;

  abstract requestPassword(data?: any): Observable<NbAuthResult>;

  abstract resetPassword(data?: any): Observable<NbAuthResult>;

  abstract logout(): Observable<NbAuthResult>;

  abstract refreshToken(): Observable<NbAuthResult>;

  protected createFailResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({ body: {}, status: 401 });
  }

  protected createSuccessResponse(data?: any): HttpResponse<Object> {
    return new HttpResponse<Object>({ body: {}, status: 200 });
  }
}
