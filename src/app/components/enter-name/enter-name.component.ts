import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HighscoreService } from '../../services/highscore/highscore.service';
import { Person } from '../../models/highscore/highscore.model';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss']
})
export class EnterNameComponent implements OnInit {

  nameForm: FormGroup;

  constructor(private router: Router, private score: HighscoreService) {
  }

  ngOnInit() {
    this.nameForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('')
    });
  }

  submit(form: FormGroup) {
    if (form.invalid) {
      alert('please enter a name!');
      return;
    }
    this.score.setPerson(form.value as Person);
    this.router.navigate(['single']);
  }

}
