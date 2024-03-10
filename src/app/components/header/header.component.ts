import { Component, OnInit } from '@angular/core';
import { SideNavService } from 'src/app/services/sidenav/sidenav-service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(
    private sideNavService: SideNavService,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
      //@ts-ignore
      this.usersService.getCurrentUser().subscribe({next: res=>{this.name = res.data}});
    }
  }

  name: string = "";

  toggleSidenav(){
    this.sideNavService.toggle();
  }

}
