import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Yemek } from 'src/app/models/Yemek';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { YemekDialogComponent } from '../yemek-dialog/yemek-dialog.component';

@Component({
  selector: 'app-yemeksec-dialog',
  templateUrl: './yemeksec-dialog.component.html',
  styleUrls: ['./yemeksec-dialog.component.css']
})
export class YemeksecDialogComponent implements OnInit {

  yemekler:Yemek[];
  displayedColumns=['yemekAdi', 'yemekGr','yemekKal','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
    constructor(
      public apiServis: ApiService,
      public matDialog:MatDialog,
      public alert: MyAlertService,
      public dialogRef: MatDialogRef<YemekDialogComponent>
    ) { }
    ngOnInit() {
      this.YemekListele();
    }
    YemekListele() {
      this.apiServis.YemekListe().subscribe((d: Yemek[]) => {
        this.yemekler = d;
        this.dataSource = new MatTableDataSource(this.yemekler);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       console.log(d);
      });
    }
  
    Filtrele(e) {
      var deger = e.target.value;
      this.dataSource.filter = deger.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
  
      }
    }

    YemekSec(yemek: Yemek) {
      this.dialogRef.close(yemek);
    }
  



}
