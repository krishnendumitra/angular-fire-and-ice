import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-view-character',
  templateUrl: './view-character.component.html',
  styleUrls: ['./view-character.component.css']
})
export class ViewCharacterComponent implements OnInit {


  public currentCharacter;
  public isVisible = false;
  public title = '';
  public aliases = '';
  public father: string;
  public mother: string;
  public spouse: string;
  public allegiances = '';
  public booksAppeared = '';
  public povBooks = '';
  public tvSeries = '';
  public playedBy = '';

  constructor(private route: ActivatedRoute, private router: Router, private myApiService: ApiService) {
  }

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('charId');
    console.log(bookId);
    this.currentCharacter = this.myApiService.getSingleCharacterInfo(bookId).subscribe(data => {
      this.currentCharacter = data;
      this.getTitle(data.titles);
      this.getAliases(data.aliases);
      this.getFather(data);
      this.getMother(data);
      this.getSpouse(data);
      this.getAllegiances(data.allegiances);
      this.getBooks(data.books);
      this.getPovBooks(data.povBooks);
      this.getTVSeries(data.tvSeries);
      this.getPlayedBy(data.playedBy);
      this.isVisible = true;

      console.log(data);

    }, error => {
      console.log(error);
    });

  }

  private getTitle(titles: string[]) {
    for (const el of titles) {
      this.title += `, ${el}`;
    }
  }

  private getAliases(aliases: string[]) {
    for (const el of aliases) {
      let comma = aliases.indexOf(el) === aliases.length - 1 ? '' : ', ';
      this.aliases += `${el}${comma}`;
    }
  }


  private getFather(data: any) {
    this.myApiService.getSingleCharacterInfo(data.father.substr(data.father.lastIndexOf('/') + 1)).subscribe(father => {
      console.log(father);
      this.father = father.name;
    }, error => {

    });
  }

  private getMother(data: any) {
    this.myApiService.getSingleCharacterInfo(data.mother.substr(data.mother.lastIndexOf('/') + 1)).subscribe(mother => {
      console.log(mother);
      this.mother = mother.name;
    }, error => {

    });
  }

  private getSpouse(data: any) {
    this.myApiService.getSingleCharacterInfo(data.spouse.substr(data.spouse.lastIndexOf('/') + 1)).subscribe(spouse => {
      console.log(spouse);
      this.spouse = spouse.name;
    }, error => {

    });
  }


  async getAllegiances(allegiances: string[]) {
    for (const el of allegiances) {
      const info = await this.myApiService.getSingleHouseInfoPromise(el.substr(el.lastIndexOf('/') + 1));
      let comma = allegiances.indexOf(el) === allegiances.length - 1 ? '' : ', ';
      this.allegiances += `${info.name}${comma}`;
    }
    console.log(allegiances);
  }

  async getBooks(booksAppeared: string[]) {
    for (const el of booksAppeared) {
      const info = await this.myApiService.getSingleBookInfoPromise(el.substr(el.lastIndexOf('/') + 1));
      let comma = booksAppeared.indexOf(el) === booksAppeared.length - 1 ? '' : ', ';
      this.booksAppeared += `${info.name}${comma}`;
    }
    console.log(booksAppeared);
  }

  async getPovBooks(povBooks: string[]) {
    for (const el of povBooks) {
      const info = await this.myApiService.getSingleBookInfoPromise(el.substr(el.lastIndexOf('/') + 1));
      let comma = povBooks.indexOf(el) === povBooks.length - 1 ? '' : ', ';
      this.povBooks += `${info.name}${comma}`;
    }
    console.log(povBooks);
  }

  private getTVSeries(series: string[]) {
    for (const el of series) {
      let comma = series.indexOf(el) === series.length - 1 ? '' : ', ';
      this.tvSeries += `${el}${comma}`;
    }
  }

  private getPlayedBy(playedBy: string[]) {
    for (const el of playedBy) {
      let comma = playedBy.indexOf(el) === playedBy.length - 1 ? '' : ', ';
      this.playedBy += `${el}${comma}`;
    }
  }


}
