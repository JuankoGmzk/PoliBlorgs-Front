import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/Users/user.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User[];
  currentUser = null;
  msgError = '';
  closeModal: string;

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userService.getCustomers().subscribe((data: User[]) => {
      this.user = data;
    })
  }


  triggerModal(content: any, val: User) {

    this.currentUser = val
    this.retrieveBook(this.currentUser.id)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  retrieveBook(val: string): void {
    this.userService.get(val)
      .subscribe(
        data => {
          this.currentUser = data;
          console.log(data);
        },
        error => {
          this.msgError = error.message + ' \n ' + error.error.message;
          console.log(error);
        });
  }

  deleteNewsById(val1: string): void {
    this.userService.delete(val1)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateBook(): void {
    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        data => {
          this.refreshList();
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  
  refreshList(): void {
    this.ngOnInit();
  }

}
