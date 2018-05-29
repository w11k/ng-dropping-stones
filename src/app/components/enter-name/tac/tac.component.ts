import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tac',
  templateUrl: './tac.component.html',
  styleUrls: ['./tac.component.scss']
})
export class TacComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
