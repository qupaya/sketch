import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectSampleComponent } from './select-sample.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SelectSampleComponent', () => {
  let component: SelectSampleComponent;
  let fixture: ComponentFixture<SelectSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSampleComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
