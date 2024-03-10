import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SideNavService } from 'src/app/services/sidenav/sidenav-service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
logout() {
localStorage.setItem("token", "");
this.router.navigate(['login'])
}
  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  constructor(
    private sideNavService: SideNavService,
    // private authService: AuthService,
    private router: Router,
  )
  {}

  ngOnInit() {
    this.sideNavService.sideNavToggleSubject.subscribe(() => {
      if (localStorage.getItem("token") && localStorage.getItem("token") !== "") this.sidenav.toggle(true);
    });
  }
}
