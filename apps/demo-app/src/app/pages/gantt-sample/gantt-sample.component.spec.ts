import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GanttSampleComponent } from './gantt-sample.component';

describe('GanttSampleComponent', () => {
  let component: GanttSampleComponent;
  let fixture: ComponentFixture<GanttSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttSampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
