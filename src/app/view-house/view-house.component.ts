import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.css']
})
export class ViewHouseComponent implements OnInit {
  public currentHouse;
  public overlord;
  public currentLord;
  public heir;
  public isVisible = false;
  public allTitles = '';
  public allSeats = '';
  public allWeapons = '';
  public cadetBranches = '';
  public swornMembers = '';


  constructor(private route: ActivatedRoute, private router: Router, private myApiService: ApiService) {
  }

  ngOnInit() {
    const houseId = this.route.snapshot.paramMap.get('houseId');
    console.log(houseId);
    this.currentHouse = this.myApiService.getSingleHouseInfo(houseId).subscribe(data => {
      console.log(data);
      this.currentHouse = data;
      this.getAllTitles(data.titles);
      this.getAllSeats(data.seats);
      this.getAllWeapons(data.ancestralWeapons);
      this.getCadetBranches(data.cadetBranches);
      this.getSwornMembers(data.swornMembers);
      this.getCurrentLord(data);
    }, error => {
      console.log(error);
    });

  }

  private getCurrentLord(data: any) {
    this.myApiService.getSingleCharacterInfo(data.currentLord.substr(data.currentLord.lastIndexOf('/') + 1)).subscribe(currentlord => {
      console.log(currentlord);
      this.currentLord = currentlord.name;
      this.getHeir(data);
    }, error => {

    });
  }

  public getOverLord(data: any) {
    this.myApiService.getSingleHouseInfo(data.overlord.substr(data.overlord.lastIndexOf('/') + 1)).subscribe(overlord => {
      console.log(overlord);
      this.overlord = overlord.name;
      this.isVisible = true;

    }, error => {

    });
  }

  public getHeir(data: any) {
    this.myApiService.getSingleCharacterInfo(data.heir.substr(data.heir.lastIndexOf('/') + 1)).subscribe(heir => {
      console.log(heir);
      this.heir = heir.name;
      this.getOverLord(data);
    }, error => {

    });
  }

  public getAllTitles(titles: string[]) {
    for (const el of titles) {
      this.allTitles += ` ${el}`;
    }
  }

  public getAllSeats(seats: string[]) {
    for (const el of seats) {
      let comma = seats.indexOf(el) === seats.length - 1 ? '' : ', ';
      this.allSeats += `${el}${comma}`;
    }
  }

  public getAllWeapons(weapons: string[]) {
    for (const el of weapons) {
      let comma = weapons.indexOf(el) === weapons.length - 1 ? '' : ', ';
      this.allWeapons += ` ${el}${comma}`;
    }
  }

  async getCadetBranches(cadetBranches: string[]) {
    for (const el of cadetBranches) {
      const info = await this.myApiService.getSingleHouseInfoPromise(el.substr(el.lastIndexOf('/') + 1));
      let comma = cadetBranches.indexOf(el) === cadetBranches.length - 1 ? '' : ', ';
      this.cadetBranches += `, ${info.name}${comma}`;
    }
  }

  async getSwornMembers(swornMembers: string[]) {
    for (const el of swornMembers) {
      const info = await this.myApiService.getSingleCharacterInfoPromise(el.substr(el.lastIndexOf('/') + 1));
      let comma = swornMembers.indexOf(el) === swornMembers.length - 1 ? '' : ', ';
      this.swornMembers += `${info.name}${comma}`;
    }
    console.log(swornMembers);
  }

}
