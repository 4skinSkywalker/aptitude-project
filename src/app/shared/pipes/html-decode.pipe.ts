import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlDecode'
})
export class HtmlDecodePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {

    if (!value) return "";

    const elem = document.createElement("TEXTAREA") as HTMLTextAreaElement;
    elem.innerHTML = value;
    return elem.value;
  }

}
