// src/app/employee/employee.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { employeedata } from './employee.model';
import { ApiService } from '../shared/api.service';
import { ReactiveFormsModule } from '@angular/forms';  // <-- For formGroup
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports:[ CommonModule,ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  showadd: boolean = false;
  showupdate: boolean = false;

  employeemodelobj:employeedata= new employeedata
  formValue!: FormGroup
  allemployeedata:any;
  constructor(private formBuilder:FormBuilder,private api:ApiService){

  }

  ngOnInit(): void { 
    this.formValue=this.formBuilder.group({
       name:['',Validators.required],
       company:['',Validators.required],
       email:['',Validators.required],
       contact:['',Validators.required],
       designation:['',Validators.required],
       
    })
this.getdata()
  }
//adding the data
  add() {
    this.showadd = true;
    this.showupdate = false;
  }
 
  //editing the data
  edit(data:any) {
    this.showupdate = true;
    this.showadd = false;
this.employeemodelobj.id = data.id;
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['company'].setValue(data.company)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['contact'].setValue(data.contact)
    this.formValue.controls['designation'].setValue(data.designation)
    
  }

  update(){

    this.employeemodelobj.name = this.formValue.value.name;
    this.employeemodelobj.company = this.formValue.value.company;
    this.employeemodelobj.email = this.formValue.value.email;
    this.employeemodelobj.contact = this.formValue.value.contact;
    this.employeemodelobj.designation = this.formValue.value.designation;
    
this.formValue.reset();
this.getdata();
    this.api.updateemployee(this.employeemodelobj,this.employeemodelobj.id).subscribe(res=>{
   alert("REcord updtes successfully");
    },
  err=>{
    alert("something went wrong");
  }
  )
  }

  addemployee(){
    this.employeemodelobj.name = this.formValue.value.name;
    this.employeemodelobj.company = this.formValue.value.company;
    this.employeemodelobj.email = this.formValue.value.email;
    this.employeemodelobj.contact = this.formValue.value.contact;
    this.employeemodelobj.designation = this.formValue.value.designation;
    

    this.api.postemployee(this.employeemodelobj).subscribe(res=>{
      console.log(res)
      this.formValue.reset()
      this.getdata();
      alert("Record addes successfully")
    },

    err=>{
      alert("something went wrong")
    }
  )

  }

//get data

  getdata(){
this.api.getemployee()
.subscribe(res=>{
this.allemployeedata=res;
})
  }

  //deletedata


  deleteemp(data:any){
    if(confirm('Are you sure to delete?'))
    this.api.deleteemployee(data.id)
    .subscribe(res=>{
      alert("Record deleted successfully");
      this.getdata();
    })

  }



}
