import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostsService } from '../shared/components/services/posts.service'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/components/main-layout/interfaces'; 
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/components/services/alert.service';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form!:FormGroup
  post!: Post
  submitted = false
  uSub!: Subscription

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService
    ) { }
    
    ngOnInit(): void {
      this.route.params.pipe( switchMap( (params: Params) =>{
        return this.postsService.getById(params['id'])
      })
      ).subscribe( (post:Post) => {
        this.post = post
        this.form = new FormGroup( {
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        })
      })
    }

    ngOnDestroy() {
      if (this.uSub) {
        this.uSub.unsubscribe()
      }
    }

    submit() {
      if(this.form.invalid) {
        return
      }

      this.submitted = true

      this.uSub = this.postsService.update( {
        ...this.post,
        text: this.form.value.text,
        title: this.form.value.title,
      }).subscribe( () => {
        this.submitted = false
        this.alert.success('Пост был обновлен')
      })
  
      const post: Post = {
        title: this.form.value.title,
        text: this.form.value.text,
        author: this.form.value.author,
        date: new Date()
      }
    }
    
  }
