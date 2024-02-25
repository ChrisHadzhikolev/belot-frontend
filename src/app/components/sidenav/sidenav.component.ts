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
      this.sidenav.toggle(true);
    });
  }

  // logout() {
  //   this.authService.logout().subscribe({
  //     next: (res) => {
  //       window.location.reload();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       this.router.navigate(['/login']);
  //     }
  //   });
// }
}
