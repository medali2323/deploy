import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    return value.toFixed(2);
  }
}
