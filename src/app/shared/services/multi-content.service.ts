import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MultiContentService<T> {
    private contentSubject = new BehaviorSubject<T | null>(null);
    contentSubject$ = this.contentSubject.asObservable();

    private currentLanguage: string = 'de';

    constructor(private http: HttpClient) {}

    loadContent<T>(folder: string, language: string): Observable<T> {
        return this.http.get<any>(`assets/i18n/${folder}/${language}.json`).pipe(
            map((content) => {
                this.contentSubject.next(content);
                this.currentLanguage = language;
                return content;
            })
        );
    }
}