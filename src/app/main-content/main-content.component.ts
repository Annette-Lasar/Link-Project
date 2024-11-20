import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GardenFriends } from '../shared/interfaces/garden-friends.interface';
import { MultiContentService } from '../shared/services/multi-content.service';
import { LinkifyPipe } from '../shared/pipes/linkify.pipe';

@Component({
  selector: 'anex-main-content',
  standalone: true,
  imports: [RouterLink, LinkifyPipe],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit, AfterViewInit {
  mainContentJSON: GardenFriends | null = null;

  constructor(
    private multiContentService: MultiContentService<GardenFriends>,
    private router: Router,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getMainContentFromJson();
  }

  ngAfterViewInit(): void {
    // Nachdem das View-Rendering abgeschlossen ist, synchronisiere Änderungen
    this.cdr.detectChanges();
  }

  getMainContentFromJson(): void {
    this.multiContentService
      .loadContent<GardenFriends>('garden-friends', 'de')
      .subscribe((content) => {
        this.mainContentJSON = content;

        // Warte auf das Rendern und aktualisiere dann den Linkinhalt
        this.cdr.detectChanges();
        this.setTextWithLinks('Gemüsegärten', '/vegetables');
      });
  }

  setTextWithLinks(keyword: string, route: string): void {
    const container =
      this.elRef.nativeElement.querySelector('.dynamic-content');
    if (container && this.mainContentJSON) {
      const parts = this.mainContentJSON.introduction.split(keyword);

      // Entferne vorhandene Inhalte aus dem Container
      this.renderer.setProperty(container, 'innerHTML', '');

      // Füge den Text mit Link dynamisch hinzu
      container.appendChild(this.renderer.createText(parts[0]));

      const link = this.renderer.createElement('a');
      this.renderer.setProperty(link, 'href', '#');
      this.renderer.listen(link, 'click', (event) => {
        event.preventDefault();
        this.router.navigate([route]);
      });
      this.renderer.appendChild(link, this.renderer.createText(keyword));
      container.appendChild(link);

      container.appendChild(
        this.renderer.createText(parts.slice(1).join(keyword))
      );
    }
  }
}
