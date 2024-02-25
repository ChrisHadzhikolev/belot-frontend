import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from '../app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastComponent } from './toast/toast.component';
import { ToasterComponent } from './toaster/toaster.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const components = [
  HeaderComponent,
  ToastComponent,
  ToasterComponent,
  SidenavComponent
];

const material = [
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule,
  MatDividerModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatStepperModule,
  MatSelectModule,
  MatCheckboxModule,
  MatTabsModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatGridListModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  ReactiveFormsModule  
];
@NgModule({
  declarations: [...components],
  imports: [
    ...material,
    CommonModule,
    FormsModule,
    AppRoutingModule,
  ],
  exports: [...components],
  providers: [],
})
export class ComponentsModule {}
