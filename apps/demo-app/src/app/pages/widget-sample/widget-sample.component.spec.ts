import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetSampleComponent } from './widget-sample.component';

describe('WidgetSampleComponent', () => {
  let component: WidgetSampleComponent;
  let fixture: ComponentFixture<WidgetSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetSampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
