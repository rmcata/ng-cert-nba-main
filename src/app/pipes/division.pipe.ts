import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'division'
})
export class DivisionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value} Division`;
  }

}
