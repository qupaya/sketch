import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectOptionsSampleComponent } from './select-options-sample.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SelectOptionsSampleComponent', () => {
  let component: SelectOptionsSampleComponent;
  let fixture: ComponentFixture<SelectOptionsSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectOptionsSampleComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectOptionsSampleComponent);
    component = fixture.componentInstance;
    const componentRef = fixture.componentRef;
    componentRef.setInput('show', true);
    componentRef.setInput('options', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
