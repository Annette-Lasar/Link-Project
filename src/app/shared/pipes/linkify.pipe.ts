import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'linkify',
  standalone: true,
})
export class LinkifyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, links: { [key: string]: string }): SafeHtml {
    if (!value) return value;

    let modifiedText = value;
    for (const [text, url] of Object.entries(links)) {
      // Ersetze jedes Vorkommen des Schlüsselwortes mit einem Link
      const link = `<a href="${url}" onclick="event.preventDefault(); window.location.href='${url}'">${text}</a>`;
      modifiedText = modifiedText.replace(new RegExp(text, 'g'), link);
    }

    // Sicherstellen, dass der HTML-Code als sicherer Inhalt behandelt wird
    return this.sanitizer.bypassSecurityTrustHtml(modifiedText);
  }
}
