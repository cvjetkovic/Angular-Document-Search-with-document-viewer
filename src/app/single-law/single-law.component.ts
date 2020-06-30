import { Component, OnInit, VERSION, Pipe, PipeTransform, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LawServiceService } from '../law-service.service';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { AfterViewInit, OnDestroy } from '@angular/core';
import * as Mark from 'mark.js';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { QueryGenerator } from '../query-generator';


export class HighlightSearch  implements PipeTransform {


  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    // Match in a case insensitive maneer
    const re = new RegExp(args, 'gi');
    const match = value.match(re);

    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }

    const replacedValue = value.replace(re, "<mark>" + match[0] + "</mark>")
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }
}


@Component({
  selector: 'app-single-law',
  templateUrl: './single-law.component.html',

  styleUrls: ['./single-law.component.scss']
})
export class SingleLawComponent implements OnInit {

  @Input() url: string;
  @Input() debounceTime = 500;
  @Input('searchText')
  set searchText(value: string) {
    this.debounceMarking.next(value);
  }
  private markInstance: Mark;
  private debounceMarking = new Subject<string>();
  private debounceSubcription: Subscription;

  textSearchHighlight() {
    this.debounceSubcription = this.debounceMarking.asObservable()
      .pipe(debounceTime(200))
      .subscribe(text => {
        if (!this.markInstance) {
          const documentContent = document.querySelector('ngx-doc-viewer')?.firstChild as HTMLElement;
          if (documentContent) {
            this.markInstance = new Mark(document.querySelector('ngx-doc-viewer').firstChild as HTMLElement);
          }
        }
        this.markInstance?.unmark();
        this.markInstance?.mark(text);
      });
  }


  law = '';
  doc: string = 'http://localhost:8080/';
  // test = "http://192.168.67.137:8080/aplikacija/downloadFile/"
  // doc: string = 'http://192.168.67.137:8080/aplikacija/downloadFile/925efd3e-80c0-46cd-9b6b-0749736926f2?fileType=word';
  searchTerm: string = "";
  test = "http://localhost:8080/api/downloadFile/49f4dcfa-33df-46fe-a632-0dd133eda374?fileType=word"
  constructor(private route: ActivatedRoute, private service: LawServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.law = paramMap.get('uuid');
      this.doc = 'http://localhost:8080/api/downloadFile/' + this.law + '?fileType=word';
    })

    this.textSearchHighlight();

  }

  updateSearch(e) {
    this.searchTerm = e.target.value
  }

  ngOnDestroy(): void {
    if (this.debounceSubcription) {
        this.debounceSubcription.unsubscribe();
    }
}

}
