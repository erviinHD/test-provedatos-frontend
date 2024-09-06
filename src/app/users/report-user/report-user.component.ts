import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-report-user',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './report-user.component.html',
  styleUrl: './report-user.component.css',
})
export class ReportUserComponent {
  users: any = [];
  currentSortDirection: 'asc' | 'desc' = 'asc';

  constructor(private _getUsers: UsersService) {}
  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this._getUsers.getUsers().subscribe({
      next: (result) => {
        this.users = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sortByName(): void {
    this.currentSortDirection =
      this.currentSortDirection === 'asc' ? 'desc' : 'asc';

    this.users.sort((a: any, b: any) => {
      const nameA = (a.name + ' ' + a.last_name).toUpperCase();
      const nameB = (b.name + ' ' + b.last_name).toUpperCase();

      if (nameA < nameB) {
        return this.currentSortDirection === 'asc' ? -1 : 1;
      } else if (nameA > nameB) {
        return this.currentSortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
