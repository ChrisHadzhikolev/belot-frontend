import { Component } from '@angular/core';
import { SideNavService } from 'src/app/services/sidenav/sidenav-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private sideNavService: SideNavService,
  ) { }

  toggleSidenav(){
    this.sideNavService.toggle();
  }

}
