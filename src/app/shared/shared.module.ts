import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import { MatIconModule } from '@angular/material/icon';
import { TableViewSearchbarComponent } from './table-view-searchbar/table-view-searchbar.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [TableViewComponent, TableViewSearchbarComponent],
  imports: [CommonModule, MatIconModule, NgxPaginationModule],
  exports: [TableViewComponent, MatIconModule, TableViewSearchbarComponent],
})
export class SharedModule {}
