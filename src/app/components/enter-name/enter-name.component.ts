import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss']
})
export class EnterNameComponent implements OnInit {

  nameForm: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.nameForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl()
    });
  }

  test() {
    this.router.navigate(['single']);
  }

}
