import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from 'rxjs/operators';
import { MessagesservicesService } from '../services/messagesservices.service';
import { SpinnerService } from '../services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralinterceptorService {

  constructor(private _spinner: SpinnerService,
    private _mensages: MessagesservicesService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Se muestra el spinner
    this._spinner.verSpinner();

    // Se agrega headers a las petiticiones 
    // const token: string = sessionStorage.getItem('token');
    // let request = req;
    // if (token) {
    //   request = req.clone({
    //     setHeaders: {
    //       authorization: `Bearer \${token}`
    //     }
    //   });
    // }

    // para el manejo de errores por peticiones http.
    return next.handle(req).pipe(
      catchError(error => {
        console.error('Error en la petición:', error.error.mensaje);
        this._mensages.showError(error.error.mensaje);
        // Se oculta el spinner en caso de error
        this._spinner.cerrarSpinner();
        throw error;
      }),
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Se oculta el spinner al finalizar la peticion
          this._spinner.cerrarSpinner();
        }
      })
    );
  }
}
