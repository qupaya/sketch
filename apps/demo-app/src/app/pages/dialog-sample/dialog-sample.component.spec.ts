import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogSampleComponent } from './dialog-sample.component';

describe('DialogSampleComponent', () => {
  let component: DialogSampleComponent;
  let fixture: ComponentFixture<DialogSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
