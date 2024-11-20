import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { VegetablesComponent } from './vegetables/vegetables.component';

export const routes: Routes = [
    {path: '', component: MainContentComponent, title: 'Gartenfreunde'},
    {path: 'vegetables', component: VegetablesComponent, title: 'Gemüsebeet'}
];
