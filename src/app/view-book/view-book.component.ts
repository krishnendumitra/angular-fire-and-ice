import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  public currentBook;
  public isVisible = false;
  public characters;
  public charId = [];
  public povCharacters;

  constructor(private route: ActivatedRoute, private router: Router, private myApiService: ApiService) {
  }

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('bookId');
    console.log(bookId);
    this.currentBook = this.myApiService.getSingleBookInfo(bookId).subscribe(data => {
      this.isVisible = true;
      this.currentBook = data;
      this.characters = data.characters;
      this.povCharacters = data.povCharacters;
    }, error => {
      console.log(error);
    });

  }

}
