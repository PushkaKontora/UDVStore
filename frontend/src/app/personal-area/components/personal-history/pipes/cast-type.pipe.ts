import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'castType'
})
export class CastTypePipe implements PipeTransform {

  transform(value: any, type: any): any {
      console.log("Pipe works ", typeof value);
      let res = type;
      return value as typeof type;
  }

}
