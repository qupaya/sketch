import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSampleComponent } from './list-sample.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ListService } from '@qupaya/sketch';

describe('ListSampleComponent', () => {
  let component: ListSampleComponent;
  let fixture: ComponentFixture<ListSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListSampleComponent,
        NoopAnimationsModule,
        RouterModule.forRoot([]),
      ],
      providers: [ListService],
    }).compileComponents();

    fixture = TestBed.createComponent(ListSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
