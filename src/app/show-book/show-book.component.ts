import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Book } from '../book';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.scss']
})
export class ShowBookComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  book: Book = { _id: '', title: '', author: '', description: '', genre: '', updatedAt: null };
  isLoadingResults = true;

  getBookDetails(id: any) {
    this.api.getBook(id)
      .subscribe((data: any) => {
        this.book = data;
        console.log(this.book);
        this.isLoadingResults = false;
      });
  }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params.id);
  }

  deleteBook(id: any) {
    this.isLoadingResults = true;
    this.api.deleteBook(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
