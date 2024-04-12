import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCollectionComponent } from './list-collection.component';

describe('ListComponent', () => {
  let component: ListCollectionComponent;
  let fixture: ComponentFixture<ListCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCollectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
