import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ListUserComponent } from './list-user/list-user.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ListUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  data: any = [];
  selectedProduct!: string;

  constructor() {}

  ngOnInit(): void {}
}
