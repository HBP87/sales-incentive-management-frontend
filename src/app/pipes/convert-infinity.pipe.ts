import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertInfinity',
})
export class ConvertInfinityPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == 2147483647) {
      return '&infin;';
    } else {
      return value;
    }
  }
}
