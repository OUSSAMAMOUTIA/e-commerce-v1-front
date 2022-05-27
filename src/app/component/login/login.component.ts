import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup = this.fb.group({
    password: ['', Validators.required],
    username: ['', Validators.required],
  });
  private defaultValue: any;
  constructor(private authService: AuthService, private fb: FormBuilder,private router:Router) {
  }

  ngOnInit(): void {
    this.formGroup.controls['username'].patchValue(this.defaultValue);
    this.formGroup.controls['password'].patchValue(this.defaultValue);

  }

  onLogin() {
     this.authService.login(this.formGroup.value.username,this.formGroup.value.password);
     if (this.authService.isAuthenticated){
       this.authService.saveUserLocalStorage()
       // @ts-ignore
       this.router.navigateByUrl("");
     }
  }
}
