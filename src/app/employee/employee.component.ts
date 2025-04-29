import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { employeedata } from './employee.model';
import { ApiService } from '../shared/api.service';
import { ReactiveFormsModule } from '@angular/forms';  // <-- For formGroup
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  showadd: boolean = false;
  showupdate: boolean = false;

  employeemodelobj: employeedata = new employeedata();
  formValue!: FormGroup;
  allemployeedata: any;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      designation: ['', Validators.required],
      avatar: ['']  // Make sure avatar is also part of the form controls
    });

    this.getdata();
  }

  // Adding the data
  add() {
    this.showadd = true;
    this.showupdate = false;
  }

  // Editing the data
  edit(data: any) {
    if (this.formValue) {  // Ensure form is initialized
      this.showupdate = true;
      this.showadd = false;
      this.employeemodelobj.id = data.id;
      
      // Ensure all fields are set correctly
      this.formValue.controls['name'].setValue(data.name);
      this.formValue.controls['company'].setValue(data.company);
      this.formValue.controls['email'].setValue(data.email);
      this.formValue.controls['contact'].setValue(data.contact);
      this.formValue.controls['designation'].setValue(data.designation);
      this.formValue.controls['avatar'].setValue(data.avatar);  
    } else {
      console.error('Form is not initialized yet');
    }
  }

  // Updating employee data
  update() {
    this.employeemodelobj.name = this.formValue.value.name;
    this.employeemodelobj.company = this.formValue.value.company;
    this.employeemodelobj.email = this.formValue.value.email;
    this.employeemodelobj.contact = this.formValue.value.contact;
    this.employeemodelobj.designation = this.formValue.value.designation;
    this.employeemodelobj.avatar = this.formValue.value.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;

    // Resetting the form
    this.formValue.reset();

    // Getting updated data
    this.getdata();

    // API call to update employee data
    this.api.updateemployee(this.employeemodelobj, this.employeemodelobj.id).subscribe(
      res => {
        alert("Record updated successfully");
        console.log(res);
        this.formValue.reset();  // Reset the form
        this.getdata();
      },
      err => {
        alert("Something went wrong");
      }
    );
  }

  // Adding new employee
  addemployee() {
    this.employeemodelobj.name = this.formValue.value.name;
    this.employeemodelobj.company = this.formValue.value.company;
    this.employeemodelobj.email = this.formValue.value.email;
    this.employeemodelobj.contact = this.formValue.value.contact;
    this.employeemodelobj.designation = this.formValue.value.designation;
    this.employeemodelobj.avatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;

    // API call to add new employee
    this.api.postemployee(this.employeemodelobj).subscribe(
      res => {
        console.log(res);
        this.formValue.reset();  // Reset the form
        this.getdata();  // Fetch updated employee data
        alert("Record added successfully");
      },
      err => {
        alert("Something went wrong");
      }
    );
  }

  // Getting all employee data
  getdata() {
    this.api.getemployee().subscribe((res: employeedata[]) => {
      // Adding auto-incremented ID to each employee record
      this.allemployeedata = res.map((employee: employeedata, index: number) => ({
        ...employee,           // Spread the existing employee data
        autoId: index + 1      // Add auto-incremented ID starting from 1
      }));
    }, error => {
      console.error("Error fetching employee data", error);
      alert("Something went wrong while fetching employee data.");
    });
  }


  // Deleting employee data
  deleteemp(data: any) {
    if (confirm('Are you sure to delete?')) {
      this.api.deleteemployee(data.id).subscribe(
        res => {
          alert("Record deleted successfully");
          this.getdata();
        },
        err => {
          alert("Something went wrong");
        }
      );
    }
  }
}
