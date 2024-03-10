import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secret-code-component',
  templateUrl: './secret-code-component.component.html',
  styleUrls: ['./secret-code-component.component.scss']
})
export class SecretCodeComponentComponent {
  @Output() 
  secretEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<SecretCodeComponentComponent>,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  formGroup = this._formBuilder.group({
    secretCode: [''],
  });

  onConfirmClick(): void {
    this.secretEmitter.emit(this.formGroup.value.secretCode);
    this.dialogRef.close();
  }

  onClose(){
    location.reload();
  }
}
