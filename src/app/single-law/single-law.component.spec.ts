import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLawComponent } from './single-law.component';

describe('SingleLawComponent', () => {
  let component: SingleLawComponent;
  let fixture: ComponentFixture<SingleLawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
