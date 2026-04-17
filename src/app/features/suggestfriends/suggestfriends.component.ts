import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FrindComponent } from './components/frind/frind.component';
import { Suggestion } from './models/frindes-data.interface';
import { FrindesService } from './services/frindes.service';

@Component({
  selector: 'app-suggestfriends',
  imports: [FrindComponent, RouterLink],
  templateUrl: './suggestfriends.component.html',
  styleUrl: './suggestfriends.component.css',
})
export class SuggestfriendsComponent implements OnInit {
  private readonly frindesService = inject(FrindesService);
  private readonly platId = inject(PLATFORM_ID);

  AllFrindes: WritableSignal<Suggestion[]> = signal([]);
  filteredFriends: WritableSignal<Suggestion[]> = signal([]);
  searchQuery: WritableSignal<string> = signal('');

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
          this.filteredFriends.set(res.data.suggestions);
        }
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery.set(query);
    this.filteredFriends.set(
      this.AllFrindes().filter(
        (f) => f.name.toLowerCase().includes(query) || f.username?.toLowerCase().includes(query),
      ),
    );
  }
}
