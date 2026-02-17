import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'titleCaseWord'})
export class TitleCaseWord implements PipeTransform  {
  constructor() {}
  transform(value = '') {
    if (!value) {
        return value;
    }
    value = value.toString();
    return value[0].toUpperCase() + value.substr(1).toLowerCase();
  }
}
