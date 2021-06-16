import { Kayit } from './../models/kayit';
import { Ogun } from './../models/Ogun';
import { Yemek } from './../models/Yemek';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
apiUrl= "https://localhost:44302/api/"
constructor(
  public http: HttpClient
) { }

YemekListe(){
  return this.http.get(this.apiUrl+"yemekliste");
}

YemekById(yemekId: string) {
  return this.http.get(this.apiUrl+ "yemekbyid/" + yemekId);
}
YemekEkle(yemek: Yemek) {
  return this.http.post(this.apiUrl+ "yemekekle", yemek);
}
YemekDuzenle(yemek:Yemek) {
  return this.http.put(this.apiUrl+ "yemekduzenle", yemek);
}
YemekSil(yemekId: string) {
  return this.http.delete(this.apiUrl+ "yemeksil/" + yemekId);
}


OgunListe(){
  return this.http.get(this.apiUrl +"ogunliste");
}

OgunById(ogunId: string) {
  return this.http.get(this.apiUrl + "ogunbyid/" + ogunId);
}
OgunEkle(ogun: Ogun) {
  return this.http.post(this.apiUrl + "ogunekle", ogun);
}
OgunDuzenle(ogun:Ogun) {
  return this.http.put(this.apiUrl + "ogunduzenle", ogun);
}
OgunSil(ogunId: string) {
  return this.http.delete(this.apiUrl + "ogunsil/" + ogunId);
}

YemekOgunListe(yemekId:string){
  return this.http.get(this.apiUrl + "yemekogunliste/" + yemekId);
}

OgunYemekListe(ogunId:string){
  return this.http.get(this.apiUrl + "ogunyemekliste/" + ogunId);
}

KayitEkle(kayit: Kayit) {
  return this.http.post(this.apiUrl + "kayitekle", kayit);
}

KayitSil(kayitId: string) {
  return this.http.delete(this.apiUrl + "kayitsil/" + kayitId);
}


}
