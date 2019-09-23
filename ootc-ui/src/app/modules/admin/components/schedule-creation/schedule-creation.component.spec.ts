import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCreationComponent } from './schedule-creation.component';

describe('ScheduleCreationComponent', () => {
  let component: ScheduleCreationComponent;
  let fixture: ComponentFixture<ScheduleCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
