import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesdetailsComponent } from './heroesdetails.component';

describe('HeroesdetailsComponent', () => {
  let component: HeroesdetailsComponent;
  let fixture: ComponentFixture<HeroesdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
