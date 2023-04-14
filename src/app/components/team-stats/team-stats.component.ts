import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Game, Stats, Team } from 'src/app/interfaces/data.models';
import { FiltersService } from 'src/app/services/filters.service';
import { ModalService } from 'src/app/services/modal.service';
import { NbaService } from 'src/app/services/nba.service';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {

  @Input()
  team!: Team;

  games$!: Observable<Game[]>;
  stats!: Stats;

  days = this._filtersService.day;

  constructor(protected nbaService: NbaService,
    private _filtersService: FiltersService,
    private _modalService: ModalService) { }

  @ViewChild('modal') modal: TemplateRef<any> | undefined;

  ngOnInit(): void {
    this.games$ = this._filtersService.numberDays$.pipe(
      switchMap((days) => {
        this.days = days;
        return this.nbaService.getLastResults(this.team, days)
      }),
      tap(games =>  this.stats = this.nbaService.getStatsFromGames(games, this.team))
    )
  }

  confirmRemove(){
    if ( this.modal ){
      this._modalService.openModal(this.modal)
    }
  }

  closeModal(){
    this._modalService.closeModal();
  }

  removeTeam(){
    this.nbaService.removeTrackedTeam(this.team);
    this._modalService.closeModal();
  }
}
