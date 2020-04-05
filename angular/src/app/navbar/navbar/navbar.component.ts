import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('result: ', this.searchForm.value.search0);

  }
}
