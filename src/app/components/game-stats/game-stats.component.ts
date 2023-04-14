import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { Team } from 'src/app/interfaces/data.models';
import { FiltersServiceService } from 'src/app/services/filters.service';
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
  dayControl: FormControl = new FormControl(6);

  days = this._filtersFacade.days;

  vm$: Observable<{teams: Team[], conferences: string[], divisions: string[]}> | undefined;

  private _destroy$ = new Subject<void>();

  constructor(protected nbaService: NbaService, 
    private _filtersFacade: FiltersServiceService) {

    this._filtersFacade.setConferenceFilter(this.conferenceControl);
    this._filtersFacade.setDivisionFilter(this.divisionControl);

    this.conferenceControl.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.divisionControl.reset();
      this.teamControl.reset()
    });

    this.divisionControl.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.teamControl.reset()
    })

    this.vm$ = combineLatest([
      this._filtersFacade.teams,
      this._filtersFacade.conferences,
      this._filtersFacade.divisions
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
    this._filtersFacade.setNumberDays(Number(value));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
