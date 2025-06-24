import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private _spinnerService: NgxSpinnerService) { }

  /**
   * The function verSpinner() calls the show() function of the spinnerService
   */
  public verSpinner(){
    this._spinnerService.show();
  }

  /**
  * It hides the spinner.
  */
  public cerrarSpinner(){
    this._spinnerService.hide();
  }
}
