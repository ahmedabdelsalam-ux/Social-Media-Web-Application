import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatpostComponent } from './creatpost.component';

describe('CreatpostComponent', () => {
  let component: CreatpostComponent;
  let fixture: ComponentFixture<CreatpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatpostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
