import { YemeksecDialogComponent } from './../dialogs/yemeksec-dialog/yemeksec-dialog.component';
import { Kayit } from './../../models/kayit';
import { Ogun } from './../../models/Ogun';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Yemek } from 'src/app/models/Yemek';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-yemeklistele',
  templateUrl: './yemeklistele.component.html',
  styleUrls: ['./yemeklistele.component.css']
})
export class YemeklisteleComponent implements OnInit {
ogunId:string;
secOgun:Ogun;
kayitlar:Kayit[];
displayedColumns=['yemekAdi', 'yemekGr','yemekKal','islemler'];
dataSource:any;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
dialogRef: MatDialogRef<YemeksecDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public route: ActivatedRoute,
    public matDialog:MatDialog,
    public alert: MyAlertService


  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.ogunId = p.ogunId;
      this.OgunById();
      this.KayitListele();
    });
  }


  OgunById() {
    this.apiServis.OgunById(this.ogunId).subscribe((d: Ogun) => {
      this.secOgun = d;
    });
  }

  KayitListele() {
    this.apiServis.OgunYemekListe(this.ogunId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.yemekBilgi.yemekAdi + " adlı yemek öğünden çıkarılacaktır Onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d => {
      if (d) {
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });
  }

  Ekle() {
    this.dialogRef = this.matDialog.open(YemeksecDialogComponent, {
      width: '800px'
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit: Kayit = new Kayit();
        kayit.kayitYemekId = d.yemekId;
        kayit.kayitOgunId = this.ogunId;

        this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KayitListele();
          }
        });
      }
    });
  }

}
