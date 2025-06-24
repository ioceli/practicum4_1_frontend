import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajeserror',
  templateUrl: './mensajeserror.component.html',
  styleUrls: ['./mensajeserror.component.css']
})
export class MensajeserrorComponent {

  @Input("control")
    control: any;
    
}
