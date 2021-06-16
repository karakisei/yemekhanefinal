import { Sonuc } from './../../models/Sonuc';
import { OgunDialogComponent } from './../dialogs/ogun-dialog/ogun-dialog.component';
import { Ogun } from './../../models/Ogun';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ogun',
  templateUrl: './ogun.component.html',
  styleUrls: ['./ogun.component.css']
})
export class OgunComponent implements OnInit {
  ogunler: Ogun[];
  dataSource: any;
  displayedColumns = ['ogunAdi', 'ogunKal', 'ogunTarih','detay'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dialogRef: MatDialogRef<OgunDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public alert: MyAlertService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.OgunListele();
    this.Ekle();
  }
  OgunListele() {
    this.apiServis.OgunListe().subscribe((d: Ogun[]) => {
      this.ogunler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  Ekle() {
    var yeniKayit: Ogun = new Ogun();
    this.dialogRef = this.matDialog.open(OgunDialogComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OgunEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgunListele();
          }
        });


      }
    });
  }


  Duzenle(kayit: Ogun) {
    this.dialogRef = this.matDialog.open(OgunDialogComponent, {
      width: '400px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        d.ogunId = kayit.ogunId;
        this.apiServis.OgunDuzenle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgunListele();
          }
        });
      }
    });
  }

  Sil(kayit: Ogun) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.ogunTarih + " Tarihli Öğün Silinecektir Onaylıyor musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.OgunSil(kayit.ogunId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.OgunListele();
          }
        });
      }
    });
  }



  Filtrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
