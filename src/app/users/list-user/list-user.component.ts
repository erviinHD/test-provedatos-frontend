import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, FooterComponent],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
})
export class ListUserComponent implements OnInit {
  users: any = [];
  name: string = '';
  code: string = '';

  constructor(private _getUsers: UsersService, private _router: Router) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._getUsers
      .getUsersByFilter({ name: this.name, code: this.code })
      .subscribe({
        next: (result) => {
          this.users = result;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  goToUpdate(id: string) {
    this._router.navigate(['users/update', id]);
  }
}
