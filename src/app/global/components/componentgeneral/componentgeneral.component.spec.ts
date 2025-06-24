import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentgeneralComponent } from './componentgeneral.component';

describe('ComponentgeneralComponent', () => {
  let component: ComponentgeneralComponent;
  let fixture: ComponentFixture<ComponentgeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentgeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentgeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
