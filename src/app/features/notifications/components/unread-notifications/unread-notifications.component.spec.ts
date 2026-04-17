import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreadNotificationsComponent } from './unread-notifications.component';

describe('UnreadNotificationsComponent', () => {
  let component: UnreadNotificationsComponent;
  let fixture: ComponentFixture<UnreadNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnreadNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnreadNotificationsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
