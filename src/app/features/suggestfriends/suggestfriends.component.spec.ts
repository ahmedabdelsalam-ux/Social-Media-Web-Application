import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestfriendsComponent } from './suggestfriends.component';

describe('SuggestfriendsComponent', () => {
  let component: SuggestfriendsComponent;
  let fixture: ComponentFixture<SuggestfriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestfriendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestfriendsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
