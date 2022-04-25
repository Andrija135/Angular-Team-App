import { Component } from '@angular/core';
import arrayShuffle from 'array-shuffle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'teamapp';

  newMemberName = '';
  members: string[] = [];
  errorMessage = '';
  numberOfTeams: number | '' = '';
  teams: string[][] = [];

  onInput(member: string) {
    this.newMemberName = member;
  }

  onNumberOfTeamsInput(value: string) {
    this.numberOfTeams = Number(value);
  }

  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = "Name can't be empty!";
      return;
    }

    this.members.push(this.newMemberName);
    this.newMemberName = '';
    this.errorMessage = '';
  }

  generateTeams() {
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMessage = 'Invalid number of teams!';
      return;
    }

    if (this.numberOfTeams > this.members.length) {
      this.errorMessage = 'Not enough members!';
      return;
    }

    this.errorMessage = '';

    this.teams = [];
    const allMembers = arrayShuffle([...this.members]);

    for (let i = this.numberOfTeams; i > 0; i--) {
      this.teams.push(allMembers.splice(0, Math.ceil(allMembers.length / i)));
    }

    this.teams.reverse();
    this.members = [];
    this.numberOfTeams = '';
  }
}
