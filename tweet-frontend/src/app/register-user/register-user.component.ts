import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../model/RegisterUser';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  questions = [
    'What is the name of your first school?',
    'What is the name of your favorite pet?',
    'In what city were you born?'
  ]

  avtar = [
    'avtar1',
    'avtar2',
    'avtar3'
  ]
  registerRequest:RegisterUser;

  profileForm: FormGroup;
  passwordError = false;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      username: new FormControl(null, Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
      questions: new FormControl(null),
      avtar: new FormControl(null),
      answer: new FormControl('', Validators.required),
    });
    this.profileForm.controls['questions'].setValue('What is the name of your first school?', { onlySelf: true });
    this.profileForm.controls['avtar'].setValue('avtar1', { onlySelf: true });
  }

  onSubmit() {
    if (this.profileForm.controls['password'].value == this.profileForm.controls['confirmPassword'].value){
      this.passwordError = false;
      if(this.profileForm.valid){
        this.registerRequest={
          loginId:this.profileForm.controls['username'].value,
          ans: this.profileForm.controls['answer'].value,
          avtar: this.profileForm.controls['avtar'].value,
          contactNumber: this.profileForm.controls['contactNumber'].value,
          email: this.profileForm.controls['emailId'].value,
          firstName: this.profileForm.controls['firstName'].value,
          lastName: this.profileForm.controls['lastName'].value,
          password: this.profileForm.controls['password'].value,
          question: this.profileForm.controls['questions'].value
        }
        this.userService.registerUser(this.registerRequest).subscribe(result=>{
          console.log(result);
        },
        (error)=>{
          console.log(error);
        })

      }}
      
    else
      this.passwordError = true;
  }




}
