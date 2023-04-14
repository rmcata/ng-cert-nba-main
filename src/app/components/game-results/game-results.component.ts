import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Game, Team } from 'src/app/interfaces/data.models';
import { FiltersService } from 'src/app/services/filters.service';
import { NbaService } from 'src/app/services/nba.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent {

  team?: Team;
  games$?: Observable<Game[]>;
  day = this._filtersService.day;

  constructor(private activatedRoute: ActivatedRoute, 
    private _filtersService: FiltersService,
    private nbaService: NbaService) {

    this.activatedRoute.paramMap.subscribe(paramMap => {
        this.team = this.nbaService.getTrackedTeams().find(team => team.abbreviation === paramMap.get("teamAbbr"));
        if (this.team)
          this.games$ = this.nbaService.getLastResults(this.team, this._filtersService.day);
    })
  }

}
