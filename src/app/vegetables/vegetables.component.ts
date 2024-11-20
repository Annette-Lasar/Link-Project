import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Vegetables } from '../shared/interfaces/vegetables.interface';
import { MultiContentService } from '../shared/services/multi-content.service';

@Component({
  selector: 'anex-vegetables',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vegetables.component.html',
  styleUrl: './vegetables.component.scss',
})
export class VegetablesComponent implements OnInit {
  vegetablesContentJSON: Vegetables | null = null;

  constructor(private multiContentService: MultiContentService<Vegetables>) {}

  ngOnInit(): void {
    this.getVegetablesContentFromJson();
  }

  getVegetablesContentFromJson(): void {
    this.multiContentService
      .loadContent<Vegetables>('vegetables', 'de')
      .subscribe((content) => {
        this.vegetablesContentJSON = content;
      });
  }
}
