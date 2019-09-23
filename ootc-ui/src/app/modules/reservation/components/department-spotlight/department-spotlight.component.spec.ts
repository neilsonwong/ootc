import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSpotlightComponent } from './department-spotlight.component';

describe('DepartmentSpotlightComponent', () => {
  let component: DepartmentSpotlightComponent;
  let fixture: ComponentFixture<DepartmentSpotlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentSpotlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSpotlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
