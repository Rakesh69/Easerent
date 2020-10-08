import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-move-in-out',
  templateUrl: './move-in-out.component.html',
  styleUrls: ['./move-in-out.component.scss']
})
export class MoveInOutComponent implements OnInit {

  isEmailInvitestionSend: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
