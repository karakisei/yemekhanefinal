import { Ogun } from './../../../models/Ogun';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ogun-dialog',
  templateUrl: './ogun-dialog.component.html',
  styleUrls: ['./ogun-dialog.component.scss']
})
export class OgunDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm: FormGroup;
  yeniKayit: Ogun;
  constructor(
    public matDialog: MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<OgunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Öğün Ekle";
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Öğün Düzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {

  }
  FormOlustur() {
    return this.frmBuild.group({
      ogunAdi: [this.yeniKayit.ogunAdi],
      ogunKal: [this.yeniKayit.ogunKal],
      ogunTarih: [this.yeniKayit.ogunTarih],
    });
  }

}