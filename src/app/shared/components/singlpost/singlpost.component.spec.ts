import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglpostComponent } from './singlpost.component';

describe('SinglpostComponent', () => {
  let component: SinglpostComponent;
  let fixture: ComponentFixture<SinglpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglpostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
