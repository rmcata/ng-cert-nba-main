import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conference'
})
export class ConferencePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value}ern Conference`;
  }

}
