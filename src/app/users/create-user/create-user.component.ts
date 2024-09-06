import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { ProvinvesService } from '../../core/services/provinces.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { validarCedula } from '../../shared/helpers/validations';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit {
  id: string = '';
  userForm: FormGroup;
  provinces: any = [];
  imageSrc: string | ArrayBuffer | null = '';
  selectedFile: File | null = null;

  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: string = 'success';

  constructor(
    private fb: FormBuilder,
    private _users: UsersService,
    private _provinces: ProvinvesService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      last_name: ['', [Validators.required]],
      dni: ['', [Validators.required, validarCedula]],
      province: ['', [Validators.required]],
      date_birth: ['', [Validators.required]],
      date_start: ['', [Validators.required]],
      role: ['', [Validators.required]],
      department: ['', [Validators.required]],
      province_work: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      part_time: ['0'],
      observation: [''],
      observation_work: [''],
    });
  }

  ngOnInit(): void {
    this.id = this._activateRoute.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.getUserById();
    }
    this.getProvinces();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onlyNumbers(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  triggerAlert(message: string, type: string = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  onSubmit() {
    const formData = new FormData();
    Object.keys(this.userForm.controls).forEach((key) => {
      formData.append(key, this.userForm.get(key)?.value);
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.id) {
      this.updateUsers(this.userForm.value, this.id);
    } else {
      this.postUsers(formData);
    }
  }

  getProvinces() {
    this._provinces.getProvinces().subscribe({
      next: (result) => {
        this.provinces = result;
      },
      error: (err) => {
        this.triggerAlert('Algo salió mal', 'danger');
      },
    });
  }

  getUserById() {
    this._users.getUserById(this.id).subscribe({
      next: (data) => {
        this.userForm.patchValue({
          name: data.name,
          email: data.email,
          last_name: data.last_name,
          dni: data.dni,
          province: data.province,
          date_birth: data.date_birth.split(' ')[0],
          date_start: data.date_start.split(' ')[0],
          role: data.role,
          department: data.department,
          province_work: data.province_work,
          salary: data.salary,
          part_time: data.part_time ? '1' : '0',
          observation: data.observation || '',
          observation_work: data.observation_work || '',
        });
        this.imageSrc = data.image;
      },
      error: (err) => {
        this.triggerAlert('Algo salió mal', 'danger');
      },
    });
  }

  postUsers(data: any) {
    this._users.postUsers(data).subscribe({
      next: (result) => {
        this._router.navigate(['/users/list']);
      },
      error: (err) => {
        this.triggerAlert('Algo salió mal', 'danger');
      },
    });
  }

  updateUsers(data: any, id: string) {
    this._users.putUser(data, id).subscribe({
      next: (result) => {
        this.triggerAlert('Operación exitosa', 'success');
      },
      error: (err) => {
        this.triggerAlert('Algo salió mal', 'danger');
      },
    });
  }
}
