import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Asignaciones',         icon:'nc-bank',       class: '' },
    { path: '/user',          title: 'Estudiantes',      icon:'nc-ruler-pencil',  class: '' },
    { path: '/table',         title: 'Sesiones',        icon:'nc-tile-56',    class: '' },
 

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
