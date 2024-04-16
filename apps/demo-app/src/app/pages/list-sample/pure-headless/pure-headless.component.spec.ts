import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PureHeadlessComponent } from './pure-headless.component';
import { RouterModule } from '@angular/router';

describe('PureHeadlessComponent', () => {
  let component: PureHeadlessComponent;
  let fixture: ComponentFixture<PureHeadlessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PureHeadlessComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PureHeadlessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
