import { Component, inject, OnInit } from '@angular/core';
import { SinglpostComponent } from '../../../../shared/components/singlpost/singlpost.component';
import { MyPostsService } from './services/my-posts.service';

@Component({
  selector: 'app-my-posts',
  imports: [SinglpostComponent],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent implements OnInit {
  private readonly myPostsService = inject(MyPostsService);

  myPost = this.myPostsService.myposts;

  ngOnInit(): void {
    this.myPostsService.getMyPostData();
  }
}
