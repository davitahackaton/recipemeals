import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleinfoComponent } from './scheduleinfo.component';

describe('ScheduleinfoComponent', () => {
  let component: ScheduleinfoComponent;
  let fixture: ComponentFixture<ScheduleinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
