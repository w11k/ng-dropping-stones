import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      password: '',
    });
  }

  ngOnInit() {
  }


  login() {
    if (this.form.get('password').value === 'ui-router') {
      this.router.navigate(['/settings/internal']);
    }
  }
}
