import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timespan', 
  pure: true
})
export class TimespanPipe implements PipeTransform {

  transform(value: number | string): string {
    // we are expecting a number representing hours
    // and we want to convert it to 'HH:mm' format
    const totalHours = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(totalHours) || totalHours < 0) {
      return '00:00';
    }
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes}`;
  }

}
