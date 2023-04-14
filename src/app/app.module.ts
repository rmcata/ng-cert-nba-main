import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { TeamStatsComponent } from './components/team-stats/team-stats.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GameResultsComponent } from './components/game-results/game-results.component';
import { GameStatsComponent } from './components/game-stats/game-stats.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ConferencePipe } from './pipes/conference.pipe';
import { DivisionPipe } from './pipes/division.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TeamStatsComponent,
    GameResultsComponent,
    GameStatsComponent,
    ModalDialogComponent,
    ConferencePipe,
    DivisionPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
