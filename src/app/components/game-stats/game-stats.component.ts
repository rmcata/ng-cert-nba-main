import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { Team } from 'src/app/interfaces/data.models';
import { FiltersService } from 'src/app/services/filters.service';
import { NbaService } from 'src/app/services/nba.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent implements OnDestroy {

  conferenceControl: FormControl = new FormControl(null);
  divisionControl: FormControl = new FormControl(null);
  teamControl: FormControl = new FormControl(null, Validators.required);
  daysSelect: number = this._filtersService.day;
  days = this._filtersService.days;

  vm$: Observable<{teams: Team[], conferences: string[], divisions: string[]}> | undefined;

  private _destroy$ = new Subject<void>();

  constructor(protected nbaService: NbaService, 
    private _filtersService: FiltersService) {

    this._configureFilters();

    this.vm$ = combineLatest([
      this._filtersService.teams,
      this._filtersService.conferences,
      this._filtersService.divisions
    ]).pipe(
      map(([teams, conferences, divisions]) => ({
        teams, conferences, divisions
      }))
    );

  }

  trackByConferenceOrDivision(index: number, item: string) {
    return item;
  }

  trackByTeam(index: number, item: Team) {
    return item.id;
  }

  trackTeam(): void {
    if (this.teamControl.valid){
      this.nbaService.addTrackedTeam(this.teamControl.value);
    }
  }

  daysChange(value: string){
    this._filtersService.setNumberDays(Number(value));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _configureFilters(){
    this._filtersService.setConferenceFilter(this.conferenceControl);
    this._filtersService.setDivisionFilter(this.divisionControl);

    this.conferenceControl.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.divisionControl.reset();
      this.teamControl.reset()
    });

    this.divisionControl.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.teamControl.reset()
    })

  }

}
