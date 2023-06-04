import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}
  onCreateNote(title, description) {
    if (title != '' || description != '') {
      this.http
        .post('https://notes-57c8e-default-rtdb.firebaseio.com/posts.json', {
          title,
          description,
        })
        .subscribe((responseData) => {
          console.log(responseData);
        });
      alert('Data Saved successfully');
    } else {
      alert('You should enter a valid data (title or description)');
    }
  }
  fetchData() {
    return this.http
      .get('https://notes-57c8e-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map((responseData) => {
          const getNotes = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              getNotes.push({ ...responseData[key], id: key });
            }
          }

          return getNotes;
        })
      );
  }
  deleteNote(id) {
    return this.http.delete(
      `https://notes-57c8e-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }
  edit(id, dataEditied) {
    return this.http.put(
      `https://notes-57c8e-default-rtdb.firebaseio.com/posts/${id}.json`,
      dataEditied
    );
  }
}
