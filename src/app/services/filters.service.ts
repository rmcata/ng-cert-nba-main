import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, of, startWith } from 'rxjs';
import { NbaService } from './nba.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersServiceService {

  readonly days = [6,12,20];
  readonly dayDefault = 6;

  private _numberDays = new BehaviorSubject(this.dayDefault);
  numberDays$ = this._numberDays.asObservable();
  setNumberDays(value: number){
    this._numberDays.next(value)
  }

  private _conferenceFilter$: Observable<any | null> = of(null);
  private _divisionFilter$: Observable<any | null> = of(null);

  constructor(private _nbaService: NbaService) {}

  get conferences(){
    return this._nbaService.getDivisions().pipe(
      map(items => items.map(item=>item.conference).filter((value, index, self) => self.indexOf(value) === index))
    );
  }

  get divisions(){
    return combineLatest([
      this._nbaService.getDivisions(),
      this._conferenceFilter$,
    ]).pipe(
      map(([items, confereceFilter]) => {
        const filtered = confereceFilter ? items.filter(item => item.conference === confereceFilter) : items;
        return filtered.map(item=>item.division)
      }),
    );
  }

  get teams(){
    return combineLatest([
      this._nbaService.getAllTeams(),
      this._conferenceFilter$,
      this._divisionFilter$
    ]).pipe(
      map(([items, confereceFilter, divisionFilter]) => {
        let filtered = divisionFilter ? items.filter(item => item.division === divisionFilter) : items;
        filtered = confereceFilter && !divisionFilter ? items.filter(item => item.conference === confereceFilter) : filtered;
        return filtered;
      }),
    );
  }

  setConferenceFilter(control: FormControl) {
    this._conferenceFilter$ = control.valueChanges.pipe(startWith(null));
  }

  setDivisionFilter(control: FormControl) {
    this._divisionFilter$ = control.valueChanges.pipe(startWith(null));
  }
  
}
