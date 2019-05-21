import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mode-fancy-button',
  templateUrl: './fancy-button.component.html',
  styleUrls: ['./fancy-button.component.scss']
})
export class FancyButtonComponent implements OnInit {
  constructor() { }
  @Input()
  text = '';
  ngOnInit() {
  }

}
