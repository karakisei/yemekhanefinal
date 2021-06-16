import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { Sonuc } from './../../models/Sonuc';
import { YemekDialogComponent } from './../dialogs/yemek-dialog/yemek-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Yemek } from 'src/app/models/Yemek';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-yemek',
  templateUrl: './yemek.component.html',
  styleUrls: ['./yemek.component.css']
})
export class YemekComponent implements OnInit {
yemekler:Yemek[];
displayedColumns=['yemekAdi', 'yemekGr','yemekKal','islemler'];
dataSource:any;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
dialogRef:MatDialogRef<YemekDialogComponent>;
confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog:MatDialog,
    public alert: MyAlertService,
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

  Ekle() {
    var yeniKayit: Yemek = new Yemek();
    this.dialogRef = this.matDialog.open(YemekDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.YemekEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.YemekListele();
          }
        });
      }
    });

  }

  Duzenle(kayit: Yemek) {
    this.dialogRef = this.matDialog.open(YemekDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        kayit.yemekAdi = d.yemekAdi;
        kayit.yemekGr = d.yemekGr;
        kayit.yemekKal = d.yemekKal;

        this.apiServis.YemekDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
        });
      }
    });
  }

  Sil(kayit: Yemek) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.yemekAdi + " İsimli Kayıt Silinecektir Onaylıyor musunuz?"

    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.YemekSil(kayit.yemekId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.YemekListele();
          }
        });
      }
    });
  }



}
