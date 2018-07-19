import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public books: Array<any>;
  public houses: Array<any>;
  public characters: Array<any>;
  public combined = [];
  public isVisible: boolean;


  constructor(private myApiService: ApiService) {
    this.isVisible = true;
  }

  ngOnInit() {
    this.myApiService.getAllBooks().subscribe(books => {
      this.books = books;
      this.myApiService.getAllHouses().subscribe(houses => {
        this.houses = houses;
        this.myApiService.getAllCharacters().subscribe(characters => {

          this.isVisible = false;
          this.characters = characters;
          console.log(this.books);
          console.log(this.houses);
          console.log(this.characters);
          this.books.sort((a, b) => a.name.localeCompare(b.name));
          this.houses.sort((a, b) => a.name.localeCompare(b.name));
          this.characters.sort((a, b) => a.name.localeCompare(b.name));
          for (let i = 0; i < 10; i++) {
            this.combined.push([this.books[i], this.houses[i], this.characters[i]]);
          }
          console.log(this.combined);
        }, error => {

        });

      }, error => {

      });
    }, error => {

    });


  }
}
