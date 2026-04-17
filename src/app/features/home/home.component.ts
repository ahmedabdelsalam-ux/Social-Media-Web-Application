import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Router, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { CreatpostComponent } from '../../shared/components/creatpost/creatpost.component';
import { FrindComponent } from '../suggestfriends/components/frind/frind.component';
import { Suggestion } from '../suggestfriends/models/frindes-data.interface';
import { FrindesService } from '../suggestfriends/services/frindes.service';

@Component({
  selector: 'app-home',
  imports: [CreatpostComponent, RouterOutlet, RouterLinkWithHref, RouterLinkActive, FrindComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly frindesService = inject(FrindesService);
  private readonly platId = inject(PLATFORM_ID);

  AllFrindes: WritableSignal<Suggestion[]> = signal([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platId)) {
      this.getAllFrindes();
    }
  }

  getAllFrindes(): void {
    this.frindesService.getFollowSuggestions().subscribe({
      next: (res) => {
        if (res.success === true) {
          this.AllFrindes.set(res.data.suggestions);
        }
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }
}
