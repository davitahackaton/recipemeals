import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealkitproviderComponent } from './mealkitprovider.component';

describe('MealkitproviderComponent', () => {
  let component: MealkitproviderComponent;
  let fixture: ComponentFixture<MealkitproviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealkitproviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealkitproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
