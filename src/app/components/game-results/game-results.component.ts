import { Component, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Game, Team} from '../../interfaces/data.models';
import {combineLatest, Observable, Subject, takeUntil} from 'rxjs';
import { NbaService } from 'src/app/services/nba.service';
import { FiltersServiceService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnDestroy {

  team?: Team;
  games$?: Observable<Game[]>;
  days = this._filtersService.dayDefault;

  private _destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, 
    protected nbaService: NbaService,
    private _filtersService: FiltersServiceService) {

    combineLatest([
      this.activatedRoute.paramMap, 
      this._filtersService.numberDays$
    ]).pipe(takeUntil(this._destroy$)).subscribe(([paramMap, days]) => {
      this.days = days;
      this.team = this.nbaService.getTrackedTeams().find(team => team.abbreviation === paramMap.get("teamAbbr"));
      if (this.team)
        this.games$ = this.nbaService.getLastResults(this.team, days);
    })

  }
  
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
