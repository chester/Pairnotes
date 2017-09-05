import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { NoteDetailsComponent } from '../note-details/note-details.component';
import { Input } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  providers: [NoteService]
})
export class NoteListComponent implements OnInit {

  // Pass in user 
  @Input() name: string;

  notes: Note[];
  selectedNote: Note;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService
    .getNotes(this.name)
    .then((notes:Note[])=> {
      this.notes = notes.map((note)=> {
        return note;        
      })
    })
  }

  private getIndexOfNote = (noteId: String) => {

    //[array].findIndex(x => x === 4)
    //https://docs.microsoft.com/en-us/scripting/javascript/reference/findindex-method-array-javascript
    return this.notes.findIndex((note) => {
      return note._id === noteId;
    })
  }

  selectNote(note: Note) {
    this.selectedNote = note;
  }

  createNewNote() {
    var note: Note = {
      content: '' // this.name
    };
    // new  note will have selected state
    this.selectNote(note);
  }

  deleteNote = (noteId: String) => {
    var index = this.getIndexOfNote(noteId);
    if( index !== -1) {
      this.notes.splice(index, 1);
      this.selectNote(null);
    }
    return this.notes;
  }

  addNote = (note: Note) => {
    this.notes.push(note);
    this.selectNote(note);
    return this.notes;
  }

  updateNote = (note: Note ) => {
    var index = this.getIndexOfNote(note._id);
    if ( index !== -1) {
      this.notes[index] = note;
      this.selectNote(note);
    }
    return this.notes;
  }



}
