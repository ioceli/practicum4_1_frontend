import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessagesservicesService } from 'src/app/core/services/messagesservices.service';


@Component({
  selector: 'app-componentgeneral',
  templateUrl: './componentgeneral.component.html',
  styleUrls: ['./componentgeneral.component.css']
})
export class ComponentgeneralComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  displayedColumns = ['id', 'name', 'progress', 'accion'];

  constructor(private _messageService: MessagesservicesService) { }

  ngOnInit(): void {
  }

  mensajeExito(mensaje: string){
    this._messageService.showSuccess(mensaje);
  }

  mensajeInfo(mensaje: string){
    this._messageService.showInfo(mensaje);
  }

  mensajeAdvertencia(mensaje: string){
    this._messageService.showWarnning(mensaje);
  }

  mensajeError(mensaje: string){
    this._messageService.showError(mensaje);
  }

}
