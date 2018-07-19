import {Injectable} from '@angular/core';
// import http client
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


// import observable related code
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {reject} from 'q';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseApiUrl = 'https://www.anapioficeandfire.com/api/';

  constructor(private httpService: HttpClient) {

  }


  public getAllBooks(): any {
    let allBooks;
    allBooks = this.httpService.get(`${this.baseApiUrl}books`);
    return allBooks;
  }

  public getAllHouses(): any {
    let allHouses;
    allHouses = this.httpService.get(`${this.baseApiUrl}houses`);
    return allHouses;
  }

  public getAllCharacters(): any {
    let allCharacters;
    allCharacters = this.httpService.get(`${this.baseApiUrl}characters`);
    return allCharacters;
  }


  public getSingleBookInfo(bookId): any {
    const singleBook = this.httpService.get(`${this.baseApiUrl}books/${bookId}`);
    return singleBook;
  }

  public getSingleHouseInfo(houseId): any {
    const singleHouse = this.httpService.get(`${this.baseApiUrl}houses/${houseId}`);
    return singleHouse;
  }

  public getSingleHouseInfoPromise(houseId): any {
    return new Promise((resolve, reject) => {
      this.httpService.get(`${this.baseApiUrl}houses/${houseId}`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public getSingleBookInfoPromise(bookId): any {
    return new Promise((resolve, reject) => {
      this.httpService.get(`${this.baseApiUrl}books/${bookId}`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public getSingleCharacterInfo(characterId): any {
    const singleCharacter = this.httpService.get(`${this.baseApiUrl}characters/${characterId}`);
    return singleCharacter;
  }

  public getSingleCharacterInfoPromise(characterId): any {
    return new Promise((resolve, reject) => {
      this.httpService.get(`${this.baseApiUrl}characters/${characterId}`).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }


}
