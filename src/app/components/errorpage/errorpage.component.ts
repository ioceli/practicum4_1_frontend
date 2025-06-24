import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.css']
})
export class ErrorpageComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  /**
   * The goBack() function is a function that is called when the user clicks the back button
   */
  goBack(){
    this._location.back();
  }
  
}
