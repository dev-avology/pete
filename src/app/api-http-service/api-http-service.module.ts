import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ApiHttpService { 
  private actionUrl: string;
  constructor(private http: HttpClient){
    this.actionUrl = `${environment.API_URL}`;
  }

  getMenuList<T>(): Observable<T> {
    return this.http.get<T>(this.actionUrl+'/websitemenulist?token=jKGXPaXlEPkqzVIQmjy3');
  }
  
  getPagebyId<T>(pageID: any): Observable<T> {
    return this.http.get<T>(this.actionUrl+"/getpagebyid/"+pageID+"?token=jKGXPaXlEPkqzVIQmjy3")
  }

  getEventList<T>(): Observable<T> {
    return this.http.get<T>(this.actionUrl+"/events/list?token=jKGXPaXlEPkqzVIQmjy3")
  }
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req);
    }
}

