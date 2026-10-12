import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Skill } from './components/skill/skill';
import { Project } from './components/project/project';
import { Contact } from './components/contact/contact';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'about', component: About },
  { path: 'skill', component: Skill },
  { path: 'project', component: Project },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' } // fallback for unknown paths
];