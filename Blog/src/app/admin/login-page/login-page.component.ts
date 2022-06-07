import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/components/services/auth.service';import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/components/main-layout/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup
  submited = false
  message!: string

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( (params) => {
      if(params['loginAgain']) {
        this.message = 'Пожалуйста введите данные'
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла. Введите данные заново'
      }
    })
    this.form = new FormGroup( {
      email: new FormControl ( null, [
        Validators.required, 
        Validators.email
      ]),
      password: new FormControl ( null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submitForm() {
    if(this.form.invalid) {
      return
    }

    this.submited = true 

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe( () => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submited = false
    }, () => this.submited = false)
  }

}
