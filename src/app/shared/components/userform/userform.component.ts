import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Iuser } from '../../interface/interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {
  public userform !:FormGroup;
  public editUserId !:string;
  public canEdit :boolean=false;
  constructor(private _fb:FormBuilder,
              private _userService:UserService,
              private _router:Router,
              private _routes:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.createUserForm();
    this.editUser()
  }

  createUserForm(){
    this.userform = this._fb.group({
      name:new FormControl(null,[Validators.required]),
      age:new FormControl(null,[Validators.required]),
    })
  }

  onSubmitForm(){
    console.log(this.userform.value);
    let uObj = this.userform.value;
    let newObj:Iuser={
      ...uObj
    }
    console.log(newObj);
    this._userService.addNewUser(newObj).subscribe({
      next:(res)=>{
        console.log(res); 
        this._router.navigate(['userList'])
      },
      error : (err) =>{
        console.log(err); 
      }
    })
    
  }

  editUser(){
    this._routes.params.subscribe((params:Params)=>{
      console.log(params);
      this.editUserId = params['userId'];
      console.log(this.editUserId);
      if(this.editUserId){
        this.canEdit=true;
        this._userService.getSingleUser(this.editUserId).subscribe({
          next:(res)=>{
            console.log(res)
            this.userform.patchValue(res)
          },
          error:(err)=>console.log(err),
          
        })
 
      }
    })
  }

  updateUser(){
    let obj = this.userform.value;
    console.log(obj);
    let updatedObj:Iuser={
      name:this.userform.controls['name'].value,
      age:this.userform.controls['age'].value,
      id:this.editUserId
    }
    this._userService.getUpdateUser(updatedObj).subscribe({
      next:(res)=>{
        console.log(res);
        this._router.navigate(['userList'])
      },
      error:(err)=>console.log(err)
      
    })
    
    
  }

}
