import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NoteDetailsComponent } from './notes/note-details/note-details.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NoteService } from './notes/note.service';

@NgModule({
  declarations: [
    AppComponent,
    NoteDetailsComponent,
    NoteListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgModule
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
