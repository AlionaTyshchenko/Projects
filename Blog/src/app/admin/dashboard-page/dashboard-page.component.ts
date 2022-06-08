import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../shared/components/services/posts.service';
import { Post } from 'src/app/shared/components/main-layout/interfaces'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  pSub!: Subscription
  dSub!: Subscription
  searchStr = ''

  constructor(
    private postsService: PostsService,
  ) { }
  
  ngOnInit(): void {
    this.pSub = this.postsService.getAllPosts().subscribe( posts => {
      this.posts = posts
    })
  }

  ngOnDestroy(): void {
    if(this.pSub) {
      this.pSub.unsubscribe()
    }
    
    if(this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
