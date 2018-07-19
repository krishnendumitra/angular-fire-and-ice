import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {ApiService} from './api.service';
import {HttpClientModule} from '@angular/common/http';
import {ViewBookComponent} from './view-book/view-book.component';
import {ViewHouseComponent} from './view-house/view-house.component';
import {ViewCharacterComponent} from './view-character/view-character.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    ViewBookComponent,
    ViewHouseComponent,
    ViewCharacterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'book/:bookId', component: ViewBookComponent},
      {path: 'house/:houseId', component: ViewHouseComponent},
      {path: 'character/:charId', component: ViewCharacterComponent},
      {path: '**', component: NotfoundComponent}

    ])
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {


}
