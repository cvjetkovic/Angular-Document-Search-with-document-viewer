import { Component, ViewChild, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Laws } from './pretraga-model';
import { PretragaApiService } from './pretraga-api.service';
import { QueryGenerator } from './query-generator';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Zakoni';

  displayedColumns: string[] = ['number', 'title', 'data'];
  api: PretragaApiService | null;
  data: Laws[] = [];

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  upit: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  titleInput = '';
  textInput = '';

  checkedTitle = false;
  checkedText = false;
  searchTypeTitle: string;
  searchTypeText: string;

  queryGenerator = new QueryGenerator();


  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  constructor(private _httpClient: HttpClient
    
    , public router: Router,
    private changeDetector: ChangeDetectorRef
    ) { }

  download(row: any) {
    this.api = new PretragaApiService(this._httpClient);
    this.api.downloadDoc(row.uuid);
}

applyFilterByTitle(event: Event) {

  if (this.checkedTitle === true) {
      this.searchTypeTitle = 'and';
  } else {
      this.searchTypeTitle = 'or';
  }
  this.titleInput = (event.target as HTMLInputElement).value;

  this.upit = this.queryGenerator.generateQuery((event.target as HTMLInputElement).value, this.searchTypeTitle);
  console.log(this.upit);

 this.api = new PretragaApiService(this._httpClient);

  merge(this.paginator.page)
      .pipe(
          startWith({}),
          switchMap(() => {
              this.isLoadingResults = true;

              return this.api!.getLawsByTitle(
                  this.paginator.pageSize, this.paginator.pageIndex, this.upit);
          }),
          map(data => {
              this.isLoadingResults = false;
              this.isRateLimitReached = false;
              this.resultsLength = data.total;

              return data.laws;
          }),
          catchError(() => {
              this.isLoadingResults = false;
              this.isRateLimitReached = true;
              return observableOf([]);
          })
      ).subscribe(data => this.data = data);

}

applyFilterByText(event: Event) {

  if (this.checkedText === true) {
      this.searchTypeText = 'and';
  } else {
      this.searchTypeText = 'or';
  }

  this.textInput = (event.target as HTMLInputElement).value;

  this.upit = this.queryGenerator.generateQuery((event.target as HTMLInputElement).value, this.searchTypeText);
  console.log(this.upit);

  this.api = new PretragaApiService(this._httpClient);

  merge(this.paginator.page)
      .pipe(
          startWith({}),
          switchMap(() => {
              this.isLoadingResults = true;

              return this.api!.getLawsByText(
                  this.paginator.pageSize, this.paginator.pageIndex, this.upit);
          }),
          map(data => {
              this.isLoadingResults = false;
              this.isRateLimitReached = false;
              this.resultsLength = data.total;

              return data.laws;
          }),
          catchError(() => {
              this.isLoadingResults = false;
              this.isRateLimitReached = true;
              return observableOf([]);
          })
      ).subscribe(data => this.data = data);
}
subscription: Subscription[] = [];

ngOnDestroy(): void {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }


// toggleBackground() {
//     this.background = this.background ? undefined : 'primary';
//   }

//   addLink(id) {
//     this.links.push(`${id} ${this.links.length + 1}`);
//   }
}
