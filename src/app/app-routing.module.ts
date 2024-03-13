import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './shared/components/user-list/user-list.component';
import { UserformComponent } from './shared/components/userform/userform.component';

const routes: Routes = [
  {
    path:"", component:UserListComponent
  },
  {
    path:"userList", component:UserListComponent
  },
  {
    path:"userList/:userId/editUser",component:UserformComponent
  },
  {
    path:"addUser", component:UserformComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
