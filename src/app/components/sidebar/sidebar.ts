import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
 isCollapsed = false;
  isMobileOpen = false;

  @Output() sidebarToggle = new EventEmitter<boolean>();

  toggleSidebar(): void {

  this.isCollapsed = !this.isCollapsed;

  this.sidebarToggle.emit(this.isCollapsed);

}

  toggleMobileSidebar(): void {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMobileSidebar(): void {
    this.isMobileOpen = false;
  }
}


// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router';

// @Component({
//   selector: 'app-sidebar',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive],
//   templateUrl: './sidebar.component.html',
//   styleUrl: './sidebar.component.css'
// })
// export class SidebarComponent {

//   isCollapsed = false;
//   isMobileOpen = false;

//   toggleSidebar(): void {
//     this.isCollapsed = !this.isCollapsed;
//   }

//   toggleMobileSidebar(): void {
//     this.isMobileOpen = !this.isMobileOpen;
//   }

//   closeMobileSidebar(): void {
//     this.isMobileOpen = false;
//   }
// }