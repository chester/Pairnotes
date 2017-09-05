import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent  {
  @Input() name: String;

  @Input() note: Note;

  @Input() createHandler: Function;
  @Input() updateHandler: Function;
  @Input() deleteHandler: Function;


  constructor(private noteService: NoteService) { }

  createNote(note: Note) {
    // remember this.name
    this.noteService.createNote(this.name, note)
    .then((newNote: Note) => {
      this.createHandler(newNote);
    });
  }

  updateNote(note: Note): void{
    this.noteService.updateNote(this.name, note)
    .then((updatedNote: Note)=> {
      this.updateHandler(updatedNote);
    });
  }

  deleteNote(noteId: String): void {
    this.noteService.deleteNote(this.name, noteId)
    .then((deletedNoteId:String) => { 
      this.deleteHandler(deletedNoteId);
    });
  }

}
