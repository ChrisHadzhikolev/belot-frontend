import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { DefaultComponent } from './default/default.component';

const components = [DefaultComponent];

@NgModule({
  declarations: [...components],
  imports: [
    ComponentsModule,
    AppRoutingModule,
    BrowserModule,
  ],
  exports: [...components],
  providers: [],
})
export class LayoutsModule {}
