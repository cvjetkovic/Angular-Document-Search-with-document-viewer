import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  // transform(text:string, filter:string) : any{
  //   // if(filter){
  //   //   text = text.replace(new RegExp('('+filter+')', 'gi'), '<span class="highlighted">$1</span>');
  //   // }
  //   // return text;
  // } 


  transform(value: any, args: any): any {
    if (!args) {return value;}
    var re = new RegExp(args, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    return value.replace(re, "<mark>$&</mark>");
}
}
