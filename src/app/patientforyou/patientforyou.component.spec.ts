import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientforyouComponent } from './patientforyou.component';

describe('PatientforyouComponent', () => {
  let component: PatientforyouComponent;
  let fixture: ComponentFixture<PatientforyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientforyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientforyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
