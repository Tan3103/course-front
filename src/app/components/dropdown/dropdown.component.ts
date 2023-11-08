import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.authService.logOut();
    window.location.reload();
  }
}
