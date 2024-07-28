import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEmployee } from './employee.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-employeesheet',
  templateUrl: './employeesheet.component.html',
  styleUrls: ['./employeesheet.component.css'],
})
export class EmployeesheetComponent implements OnInit {
  myform!: FormGroup;
  action: any;
  formobj: IEmployee = new IEmployee();
  imgSrc: string | ArrayBuffer | null = null;
  constructor(private fb: FormBuilder, private data: DataService) {}

  ngOnInit(): void {
    //validation
    this.myform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Example pattern for a 10-digit number
      designation: ['', Validators.required],
      gender: ['', Validators.required],
      course: this.fb.group({
        bca: [false],
        mca: [false],
        bcs: [false],
      }),
      creatdate: ['', Validators.required],
      imgupload: ['', Validators.required],
    });

    this.getcall();
  }

// post data
  postdata() {
    this.formobj.name = this.myform.value.name;
    this.formobj.email = this.myform.value.email;
    this.formobj.mobile = this.myform.value.mobile;
    this.formobj.designation = this.myform.value.designation;
    this.formobj.gender = this.myform.value.gender;
    this.formobj.course = Object.keys(this.myform.value.course).filter(
      (key) => this.myform.value.course[key]
    );
    this.formobj.creatdate = this.myform.value.creatdate;
    this.data.postcall(this.formobj).subscribe((res) => {
      console.log(res);
      this.getcall();
      alert('employee added successfully');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.myform.reset();
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => (this.imgSrc = reader.result);
      reader.readAsDataURL(file);
    }
  }

//get data
  getcall() {
    this.data.getcall().subscribe((res: any) => {
      this.action = res;
    });
  }

  ondeletedata(i: any) {
    this.data.deletecall(i.id).subscribe((res) => {
      alert('delelted data successfully');
      this.getcall();
    });
  }


  //edit data
  onedit(data: any) {
    this.formobj.id = data.id;
    this.myform.controls['name'].setValue(data.name);
    this.myform.controls['email'].setValue(data.email);
    this.myform.controls['mobile'].setValue(data.mobile);
    this.myform.controls['designation'].setValue(data.designation);
    this.myform.controls['gender'].setValue(data.gender);
    const courseGroup = this.myform.get('course');
    if (courseGroup) {
      const bcaControl = courseGroup.get('bca');
      const mcaControl = courseGroup.get('mca');
      const bcsControl = courseGroup.get('bcs');
      if (bcaControl) bcaControl.setValue(data.course.bca);
      if (mcaControl) mcaControl.setValue(data.course.mca);
      if (bcsControl) bcsControl.setValue(data.course.bcs);
    }

    this.myform.controls['creatdate'].setValue(data.creatdate);
    this.myform.controls['imgupload'].setValue(data.imgupload);
  }


//update data
  updatecall() {
    this.formobj.name = this.myform.value.name;
    this.formobj.email = this.myform.value.email;
    this.formobj.mobile = this.myform.value.mobile;
    this.formobj.designation = this.myform.value.designation;
    this.formobj.gender = this.myform.value.gender;
    this.formobj.course = Object.keys(this.myform.value.course).filter(
      (key) => this.myform.value.course[key]
    );
    this.formobj.creatdate = this.myform.value.creatdate;
    this.data
      .updatecall(this.formobj, this.formobj.id)
      .subscribe((res: any) => {
        alert('updated successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getcall();
        this.myform.reset();
      });
  }
}
