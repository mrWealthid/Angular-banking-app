import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(value: any): string {
    return value.fullName.split(' ').map((name: string) => name[0].toUpperCase()).join("");
  }
}
