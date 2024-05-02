import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GanttChartLineComponent } from './gantt-chart-line.component';

describe('GanttChartLineComponent', () => {
  let component: GanttChartLineComponent;
  let fixture: ComponentFixture<GanttChartLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttChartLineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttChartLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
