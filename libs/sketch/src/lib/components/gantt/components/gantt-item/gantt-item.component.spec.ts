import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GanttItemComponent } from './gantt-item.component';

describe('GanttItemComponent', () => {
  let component: GanttItemComponent<unknown>;
  let fixture: ComponentFixture<GanttItemComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GanttItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
