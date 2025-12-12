import { Routes } from '@angular/router';
import { FileAnalysis } from './file-analysis/file-analysis';
import { Login } from './login/login';
import { Home } from './home/home';

export const routes: Routes = [
    {path: 'login', component: Login},
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    {
      path: 'home',
    //   canActivate: [authGuard],
    //   canActivateChild: [authGuard],
      component: Home,
      children:[
        {path:'',pathMatch: 'full', redirectTo: 'file-analysis'},
        {path: 'file-analysis', component:FileAnalysis}
      ]
    }
    
];
