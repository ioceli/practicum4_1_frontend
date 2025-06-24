import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeserrorComponent } from './mensajeserror.component';

describe('MensajeserrorComponent', () => {
  let component: MensajeserrorComponent;
  let fixture: ComponentFixture<MensajeserrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeserrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeserrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
