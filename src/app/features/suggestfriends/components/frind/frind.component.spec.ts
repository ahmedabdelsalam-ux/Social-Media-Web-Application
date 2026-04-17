import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrindComponent } from './frind.component';

describe('FrindComponent', () => {
  let component: FrindComponent;
  let fixture: ComponentFixture<FrindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrindComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrindComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
