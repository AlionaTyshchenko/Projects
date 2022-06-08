import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from "./login-page/login-page.component";import { EditPageComponent } from './edit-page/edit-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { PostComponent } from './shared/components/post/post.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./shared/components/services/auth.service";
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './shared/components/services/auth.guard';
import { SearchPipe } from './shared/components/services/search.pipe';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    EditPageComponent,
    CreatePageComponent,
    DashboardPageComponent,
    PostComponent,
    SearchPipe
  ],
  imports:[
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [ 
        {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
        {path: 'login', component: LoginPageComponent},
        {path: 'dashboard', component: DashboardPageComponent,canActivate: [AuthGuard]},
        {path: 'create', component: CreatePageComponent,canActivate: [AuthGuard]},
        {path: 'post/:id/edit', component: EditPageComponent,canActivate: [AuthGuard]}
      ]}
    ])
  ],
  exports:[RouterModule],
  providers: [AuthGuard]
})

export class AdminModule{}