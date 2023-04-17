import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableViewSearchbarComponent } from './table-view-searchbar.component';

describe('TableViewSearchbarComponent', () => {
  let component: TableViewSearchbarComponent;
  let fixture: ComponentFixture<TableViewSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableViewSearchbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableViewSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
