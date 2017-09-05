import { Injectable } from '@angular/core';
import { Note } from './note';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


/*
 * Client-side wrapper to make request to the API server
 */ 
@Injectable()
export class NoteService {
  private notesUrl = '/api/notes';

  constructor(private http:Http) { }

  // get("/api/notes/:name")
  getNotes(name:String): Promise<void | Note[]> {
    return this.http.get(this.notesUrl + '/' + name)
    .toPromise()
    .then(response => response.json() as Note[])
    .catch(this.handleError);
  }

  // post("/api/notes/:name")
  createNote(name:String, newNote: Note): Promise<void | Note> {
    return this.http.post(this.notesUrl + '/' + name, newNote)
    .toPromise()
    .then(response => response.json() as Note)
    .catch(this.handleError);
  }

  //get("/api/notes/:name/:id") endpoint not used by Angular app

  // delete("/api/notes/:name/:id")
  deleteNote(name:String, delNoteId: String): Promise<void | String> {
    return this.http.delete(this.notesUrl + '/' + name + '/' + delNoteId)
    .toPromise()
    .then(response => response.json() as String)
    .catch(this.handleError);
  }

  // put("/api/notes/:name/:id")
  updateNote(name: String, putNote: Note): Promise <void | Note> {
    var putUrl = this.notesUrl + '/' + name + '/' + putNote._id;
    return this.http.put(putUrl, putNote)
    .toPromise()
    .then(response => response.json() as Note)
    .catch(this.handleError)
  }

  private handleError (error:any) {
    let errMsg = (error.message) ? error.message :
    error.status ? '${error.status} - ${error.statusText}' : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
