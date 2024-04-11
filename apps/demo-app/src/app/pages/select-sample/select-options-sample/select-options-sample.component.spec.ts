import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectOptionsSampleComponent } from './select-options-sample.component';

describe('SelectOptionsSampleComponent', () => {
  let component: SelectOptionsSampleComponent;
  let fixture: ComponentFixture<SelectOptionsSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectOptionsSampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectOptionsSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
