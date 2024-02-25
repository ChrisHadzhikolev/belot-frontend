import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './layouts/default/default.component';
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from '@angular/cdk/layout';
import { SideNavService } from './services/sidenav/sidenav-service';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ComponentsModule
  ],
  providers: [SideNavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
