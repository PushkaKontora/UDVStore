import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'castTypeNumber'
})
export class CastTypeNumberPipe implements PipeTransform {

  transform(value: any): any {
    return Math.abs(value) ;
  }

}
