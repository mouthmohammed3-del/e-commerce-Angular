import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nationalIdDate',
  standalone: true
})
export class NationalIdDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
