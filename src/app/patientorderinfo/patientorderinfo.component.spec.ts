import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientorderinfoComponent } from './patientorderinfo.component';

describe('PatientorderinfoComponent', () => {
  let component: PatientorderinfoComponent;
  let fixture: ComponentFixture<PatientorderinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientorderinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientorderinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
