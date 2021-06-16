import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from './../../models/Sonuc';
import { Yemek } from 'src/app/models/Yemek';
import { Ogun } from './../../models/Ogun';

import { Kayit } from './../../models/kayit';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ogunlistele',
  templateUrl: './ogunlistele.component.html',
  styleUrls: ['./ogunlistele.component.css']
})
export class OgunlisteleComponent implements OnInit {
kayitlar:Kayit[];
ogunler:Ogun[];
secYemek:Yemek;
yemekId:string;
ogunId:string;
displayedColumns:['ogunAdi','ogunKal','ogunTarih','islemler'];
dataSource:any;
@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;
confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public route:ActivatedRoute,
    public matDialog:MatDialog,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.yemekId = p.yemekId;
        this.YemekGetir();
        this.KayitListele();
        this.OgunListele();
      }
    });
  }
 YemekGetir() {
    this.apiServis.YemekById(this.yemekId).subscribe((d: Yemek) => {
      this.secYemek = d;
    });
  }
  KayitListele() {
    this.apiServis.YemekOgunListe(this.yemekId).subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  OgunListele() {
    this.apiServis.OgunListe().subscribe((d: Ogun[]) => {
      this.ogunler = d;
    });
  }
  OgunSec(ogunId: string) {
    console.log(ogunId);
    this.ogunId = ogunId;
  }

  Kaydet() {
    if (this.ogunId == "") {
      var s: Sonuc = new Sonuc();
      s.islem = false;
      s.mesaj = "Ders Seçiniz";
      this.alert.AlertUygula(s);

      return false;
    }

    var kayit: Kayit = new Kayit();
    kayit.kayitOgunId = this.ogunId;
    kayit.kayitYemekId = this.yemekId;

    this.apiServis.KayitEkle(kayit).subscribe((s: Sonuc) => {
      this.alert.AlertUygula(s);
      if (s.islem) {
        this.KayitListele();
      }
    });

  }
  Sil(kayit: Kayit) {
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.ogunBilgi.ogunAdi + " Öğün Kaydı Silinecektir Onaylıyor musunuz?";
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
}
