/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '@ntig9/products';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {


  Users: User[] = [];

  deleteProduct(id:string) {
    console.log(id);
  }
  productImage(image:string) {
    console.log(typeof image);
    const newData = image.split('\\')
    return newData[newData.length -1]
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor( private userService: UsersService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers() {
    this.userService.getUsers().subscribe(Users => {
      this.Users = Users.data;
    });
  }
  userDelete(userID:string | undefined):void {
    this.userService.deleteUser(userID).subscribe(() => {
      this.Users = this.Users.filter(user => user._id !== userID);
      this.toastr.success('Success', 'User Deleted', {
        timeOut: 3000,
      });
    },
    () => this.toastr.error('Error', "couldn't delete"));
  }
  cancelbtn():void {
    this.toastr.info('Item Deletion was Canceled', 'Cancel', {
      timeOut: 3000,
    });
  }

}
