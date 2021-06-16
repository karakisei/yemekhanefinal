import { Yemek } from 'src/app/models/Yemek';
import { ApiService } from './../../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-yemek-dialog',
  templateUrl: './yemek-dialog.component.html',
  styleUrls: ['./yemek-dialog.component.css']
})
export class YemekDialogComponent implements OnInit {
 dialogBaslik:string;
 islem:string;
 frm:FormGroup;
 yeniKayit:Yemek;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<YemekDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Yemek Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Yemek Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({
      yemekAdi: [this.yeniKayit.yemekAdi],
      yemekGr: [this.yeniKayit.yemekGr],
      yemekKal: [this.yeniKayit.yemekKal],
    });
  }

}
