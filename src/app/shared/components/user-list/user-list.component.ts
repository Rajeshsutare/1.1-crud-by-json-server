import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Iuser } from '../../interface/interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public usersArray:Array<Iuser>=[];
  constructor(private _userService:UserService) { }

  ngOnInit(): void {

    this._userService.getAllUsers().subscribe({
      next :(res)=>{
        console.log(res);  
        this.usersArray=res;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  deleteUser(id:string){
    console.log(id);
    document.getElementById(id)?.remove()
    this._userService.getDeleteUser(id).subscribe({
      next : (res) =>{
        console.log(res);
      },
      error : (err) => {
        console.log(err); 
      }
    })
  }

}
