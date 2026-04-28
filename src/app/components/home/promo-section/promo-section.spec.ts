import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoSection } from './promo-section';

describe('PromoSection', () => {
  let component: PromoSection;
  let fixture: ComponentFixture<PromoSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoSection],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
