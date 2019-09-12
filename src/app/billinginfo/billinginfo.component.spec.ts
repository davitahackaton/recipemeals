import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillinginfoComponent } from './billinginfo.component';

describe('BillinginfoComponent', () => {
  let component: BillinginfoComponent;
  let fixture: ComponentFixture<BillinginfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillinginfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillinginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
