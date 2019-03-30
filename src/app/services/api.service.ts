import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CONFIG} from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient) {
  }

  sendRequest(data: { user: string; description: string }): Observable<any> {
    return this.http.post(CONFIG.sendRequests, data, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getRequests(): Observable<any> {
    return this.http.get(CONFIG.getRequests, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // In a real world app, we might use a remote logging infrastructure
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // return an ErrorObservable with a user-facing error message
    return of([]);
  }
}
