import { Component, OnInit } from '@angular/core';
import { NotesService } from './services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = '';
  description: string = '';
  editTitle: String = '';
  editDescription: String = '';
  notes: Array<{ title: string; description: string; id: string }>;
  isLoading: boolean = true;
  editActive = false;
  editItemIndex: number;

  constructor(private crudService: NotesService) {}

  ngOnInit() {
    this.crudService.fetchData().subscribe((posts) => {
      this.notes = posts;
      this.isLoading = false;
    });
  }
  onCreateNote() {
    this.crudService.onCreateNote(this.title, this.description);
    this.isLoading = true;
    setTimeout(() => {
      this.crudService.fetchData().subscribe((posts) => {
        this.notes = posts;
        this.isLoading = false;
      });
    }, 200);
    this.title = '';
    this.description = '';
  }
  fetchData() {
    this.crudService.fetchData();
  }
  delete(id) {
    this.crudService.deleteNote(id).subscribe(() => {
      this.notes;
    });
    this.isLoading = true;
    setTimeout(() => {
      this.crudService.fetchData().subscribe((posts) => {
        this.notes = posts;
        this.isLoading = false;
      });
    }, 500);
  }
  edit(id) {
    let dataEditied = {
      title: this.editTitle,
      description: this.editDescription,
      id: id,
    };
    this.editActive = !this.editActive;
    this.crudService.edit(id, dataEditied).subscribe(() => {
      this.notes;
    });
    this.editItemIndex = null;

    this.isLoading = true;
    setTimeout(() => {
      this.crudService.fetchData().subscribe((posts) => {
        this.notes = posts;
        this.isLoading = false;
      });
    }, 500);
  }
  editSection(item, i) {
    this.editActive = !this.editActive;
    this.editTitle = item.title;
    this.editDescription = item.description;
    this.editItemIndex = i;
  }
}
