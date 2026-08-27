import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nationalIdDate',
  standalone: true
})
export class NationalIdDatePipe implements PipeTransform {


  transform(idNumber: string | number, formatPart: 'YY' | 'MM' | 'DD' | 'FullDate'): string {
    const idStr = idNumber.toString();

    // Validate length before processing
    if (idStr.length !== 14) {
      return 'Invalid ID';
    }
    //29305151234567
    // Extract parts using substring
    const centuryDigit = idStr.substring(0, 1); //2
    const yearDigits = idStr.substring(1, 3);//93
    const month = idStr.substring(3, 5);//05
    const day = idStr.substring(5, 7);//15

// 29305151234567
// │││││││
// ││││││└── Day → 15
// ││││└──── Month → 05
// │└└────── Year → 93
// └──────── Century → 2

    // Calculate the full year based on the century digit
    const centuryPrefix = centuryDigit === '2' ? '19' : (centuryDigit === '3' ? '20' : '');
    const fullYear = centuryPrefix + yearDigits;

    // Return the requested part using a switch statement
    switch (formatPart) {
      case 'YY':
        return fullYear;
      case 'MM':
        return month;
      case 'DD':
        return day;
      case 'FullDate':
        return `${day}-${month}-${fullYear}`;
      default:
        return 'Invalid Format Parameter';
    }
  }

}
