import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { NewTeamComponent } from 'src/app/components/modals/new-team-component/new-team-component.component';
import { Game } from 'src/app/models/game/game.model';
import { Player } from 'src/app/models/player/player.model';
import { Team } from 'src/app/models/team/team.model';
import { GameService } from 'src/app/services/gameService/game.service';
import { TeamService } from 'src/app/services/teamService/team.service';
import { ToastService } from 'src/app/services/toastr/toastr.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    titleService: Title,
    private toastService: ToastService,
    private gameService: GameService,
    private teamService: TeamService,
    private usersService: UsersService,
    public dialog: MatDialog,
  ) {
    titleService.setTitle("Dashboard");
  }
  newGame = false;
  gameInProgress = false;
  currentGame?: Game;
  teams: Team[] = [];
  players: Player[] = [];
  games: Game[] = [];
  team1?: Team;
  team2?: Team;

  async ngOnInit() {
    await this.fetchPlayers();
    await this.fetchGames();
    await this.fetchTeams();
  }

  startNewGame() {
    if (this.gameInProgress) {
      if (confirm('A game is in progress are you sure you want to start a new one?')) {
        //Yes
        // @ts-ignore
        this.currentGame.status = 'unfinished';
        // @ts-ignore
        this.gameService.saveGame(this.currentGame).subscribe({
          next: res => {
            this.gameInProgress = false;
            this.newGame = true;
          },
          error: err => {
            this.toastService.showErrorToast("Error", "Something went wrong try again or ask Kris xD")
          }
        });

      }
    } else {
      this.newGame = true;
    }
  }

  createNewTeam() {
    const dialogRef = this.dialog.open(NewTeamComponent, {
      data: { teams: this.teams, players: this.players }, // Pass the employee data to the update dialog
    });
    dialogRef.componentInstance.addTeamEmitter.subscribe(
      (team: any) => {
        // Perform update operation using the service
        this.teamService
          .createTeam({ name: team.name, players: [team.player1, team.player2] })
          .subscribe((res) => {
            this.fetchTeams();
            this.toastService.showInfoToast('Info', 'New team created');
          });
      },
    );
  }

  createNewGame() {
    if (this.team1 && this.team2) {
      // @ts-ignore
      let combinedArray = this.team1.players.concat(this.team2.players);
      if (this.team1?.name === this.team2?.name) {
        this.toastService.showErrorToast('Error', 'Cannot select the same team');
      } else if (this.hasRepetitiveObjects(combinedArray)) {
        this.toastService.showErrorToast('Error', 'Cannot select teams with ovelaping members');
      } else {
        this.gameService
          .saveGame({ team1: this.team1, team2: this.team2 })
          .subscribe((res) => {
            this.fetchTeams();
            this.team1 = undefined;
            this.team2 = undefined;
            this.newGame = false;
            this.gameInProgress = true;
            this.currentGame = res;
            this.toastService.showInfoToast('Info', 'New game created');
          });
      }
    } else {
      this.toastService.showErrorToast('Error', 'Select 2 teams');
    }
  }

  async fetchTeams() {
    await this.teamService.getAllTeams().subscribe({
      next: res => {
        this.teams = res;
      }, error: err => {
        this.toastService.showErrorToast("Error", "Something went wrong try again or ask Kris xD")
      }
    })
  }

  async fetchPlayers() {
    await this.usersService.getAllPlayers().subscribe({
      next: res => {
        this.players = res;
      }, error: err => {
        this.toastService.showErrorToast("Error", "Something went wrong try again or ask Kris xD")
      }
    });
  }
  async fetchGames() {
    await this.gameService.getAllGames().subscribe({
      next: res => {
        this.games = res;
      }, error: err => {
        this.toastService.showErrorToast("Error", "Something went wrong try again or ask Kris xD")
      }
    })
  }

  hasRepetitiveObjects(array) {
    const uniqueIds = new Set(); // Use a Set to keep track of unique identifiers

    for (const obj of array) {
      // Check if the object's identifier is already in the Set
      if (uniqueIds.has(obj.id)) {
        return true; // Return true if a duplicate is found
      } else {
        uniqueIds.add(obj.id);
      }
    }

    return false; // Return false if no duplicates are found
  }

}
