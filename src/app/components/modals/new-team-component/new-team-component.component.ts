import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from 'src/app/models/player/player.model';
import { Team } from 'src/app/models/team/team.model';
import { TeamService } from 'src/app/services/teamService/team.service';

@Component({
  selector: 'app-new-team-component',
  templateUrl: './new-team-component.component.html',
  styleUrls: ['./new-team-component.component.scss']
})
export class NewTeamComponent {
  formGroupTeam: FormGroup;
  hasErrors = false;
  error: string = "";

  @Output()
  addTeamEmitter: EventEmitter<Team> = new EventEmitter<Team>();

  constructor(
    public dialogRef: MatDialogRef<NewTeamComponent>,
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: { teams: Team[], players: Player[] },

  ) {
    this.formGroupTeam = this.formBuilder.group({
      name: ['', [Validators.required, this.notEmptyOrNull]],
      player1: ['', [Validators.required, this.notEmptyOrNull]],
      player2: ['', [Validators.required, this.notEmptyOrNull]],
    });
  }

  notEmptyOrNull(control: FormControl) {
    if (!control.value || (control.value && control.value === '')) {
      return { 'emptyOrNull': true }; // Return validation error if value is empty or null
    }
    return null; // Return null if validation passes
  }

  addTeam() {
    if (this.formGroupTeam.invalid) {
      this.error = 'All fields should have value';
      this.hasErrors = true;
      return;
    } else if (this.data.teams.find(x => x.name === this.formGroupTeam.value.name)) {
      this.error = 'Duplicate Team Name';
      this.hasErrors = true;
      return;
    } else if (this.data.teams.find(x => x.players?.includes(this.formGroupTeam.value.player1) && x.players?.includes(this.formGroupTeam.value.player2))) {
      this.error = 'Team with this 2 players already exists';
      this.hasErrors = true;
      return;
    } else if (this.formGroupTeam.value.player1.id === this.formGroupTeam.value.player2.id) {
      this.error = 'Duplicate players';
      this.hasErrors = true;
    } else {
      this.hasErrors = false;
      this.error = '';
    }

    if (!this.hasErrors) {
      this.addTeamEmitter.emit(this.formGroupTeam.value);
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
