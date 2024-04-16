import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WithStyleComponent } from './with-style.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

describe('WithStyleComponent', () => {
  let component: WithStyleComponent;
  let fixture: ComponentFixture<WithStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WithStyleComponent,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WithStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
