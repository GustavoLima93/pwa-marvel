import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieslistComponent } from './serieslist.component';

describe('SerieslistComponent', () => {
  let component: SerieslistComponent;
  let fixture: ComponentFixture<SerieslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerieslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
