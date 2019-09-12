import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeindetailComponent } from './recipeindetail.component';

describe('RecipeindetailComponent', () => {
  let component: RecipeindetailComponent;
  let fixture: ComponentFixture<RecipeindetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeindetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeindetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
