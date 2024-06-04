import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  value = 'Clear me';
  constructor() { }

  ngOnInit(): void {
  }
  click() {
    this.value = ''
  }
}
