import { Component, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularCRUD';
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(public dialog: MatDialog, private api: ApiService) {
    this.getAllProducts()
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "80%"
    }).afterClosed().subscribe(res => {
      if (res === "Save") {
        this.getAllProducts()
      }
    });
  }

  getAllProducts() {
    this.api.getProducts().subscribe(res => {
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: '80%',
      data: row
    }).afterClosed().subscribe(res => {
      if (res === "Update") {
        this.getAllProducts()
      }
    })
  }

  deleteProduct(id: any) {
    this.api.deleteProducts(id).subscribe(res => {
      alert("Deleted Successfully ✔")
      this.getAllProducts()
    }, err => {
      alert("Sorry! The product did not remove")
    })
  }
}
