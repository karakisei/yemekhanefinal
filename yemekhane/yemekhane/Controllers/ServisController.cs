using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using yemekhane.ViewModel;
using yemekhane.Models;


namespace yemekhane.Controllers
{
    public class ServisController : ApiController
    {
        DB01Entities db = new DB01Entities();
        SonucModel sonuc = new SonucModel();
        #region Ogun
        [HttpGet]
        [Route("api/ogunliste")]
        public List<OgunModel> OgunListe()
        {
            List<OgunModel> liste = db.Ogun.Select(x => new OgunModel()
            {

                ogunId = x.ogunId,
                ogunAdi = x.ogunAdi,
                ogunKal = x.ogunKal,
                ogunTarih = x.ogunTarih,

            }).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/ogunbyid/{ogunId}")]
        public OgunModel OgunById(string ogunId)
        {
            OgunModel kayit = db.Ogun.Where(s => s.ogunId == ogunId).Select(x => new OgunModel()
            {
                ogunId = x.ogunId,
                ogunAdi = x.ogunAdi,
                ogunKal = x.ogunKal,
                ogunTarih = x.ogunTarih,
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/ogunekle")]
        public SonucModel OgunEkle(OgunModel model)
        {
            if (db.Ogun.Count(s => s.ogunTarih == model.ogunTarih) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ogun Tarihi Kayıtlıdır";
                return sonuc;
            }
            Ogun yeni = new Ogun();
            yeni.ogunId = Guid.NewGuid().ToString();
            yeni.ogunTarih = model.ogunTarih;
            yeni.ogunKal = model.ogunKal;
            yeni.ogunAdi = model.ogunAdi;
            db.Ogun.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kayıt Eklendi";

            return sonuc;
        }

        [HttpPut]
        [Route("api/ogunduzenle")]

        public SonucModel OgunDuzenle(OgunModel model)
        {
            Ogun kayit = db.Ogun.Where(s => s.ogunId == model.ogunId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;

            }

            kayit.ogunTarih = model.ogunTarih;
            kayit.ogunAdi = model.ogunAdi;
            kayit.ogunKal = model.ogunKal;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kayıt Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/ogunsil/{ogunId}")]
        public SonucModel OgunSil(string ogunId)
        {
            Ogun kayit = db.Ogun.Where(s => s.ogunId == ogunId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;

            }
            if (db.Kayit.Count(s => s.kayitOgunId == ogunId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Ogune Kayıtlı Yemek Olduğu için Silinemez!";
                return sonuc;
            }
            db.Ogun.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kayıt Silindi";
            return sonuc;
        }

        #endregion

        #region Yemek
        [HttpGet]
        [Route("api/yemekliste")]
        public List<YemekModel> YemekListe()
        {
            List<YemekModel> liste = db.Yemek.Select(x => new YemekModel()
            {
                yemekId = x.yemekId,
                yemekGr = x.yemekGr,
                yemekAdi = x.yemekAdi,
                yemekKal = x.yemekKal

            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/yemekbyid/{yemekId}")]
        public YemekModel YemekById(string yemekId)
        {
            YemekModel kayit = db.Yemek.Where(s => s.yemekId == yemekId).Select(x => new YemekModel()
            {
                yemekId = x.yemekId,
                yemekGr = x.yemekGr,
                yemekAdi = x.yemekAdi,
                yemekKal = x.yemekKal

            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/yemekekle")]
        public SonucModel YemekEkle(YemekModel model)
        {
            if (db.Yemek.Count(s => s.yemekAdi == model.yemekAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Yemek Adı Kayıtlıdır";
                return sonuc;
            }

            Yemek yeni = new Yemek();
            yeni.yemekId = Guid.NewGuid().ToString();
            yeni.yemekAdi = model.yemekAdi;
            yeni.yemekGr = model.yemekGr;
            yeni.yemekKal = model.yemekKal;
            db.Yemek.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = " Yemek Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/yemekduzenle")]
        public SonucModel YemekDuzenle(YemekModel model)
        {
            Yemek kayit = db.Yemek.Where(s => s.yemekId == model.yemekId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.yemekAdi = model.yemekAdi;
            kayit.yemekGr = model.yemekGr;
            kayit.yemekKal = model.yemekKal;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = " Yemek Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/yemeksil/{yemekId}")]
        public SonucModel YemekSil(string yemekId)
        {
            Yemek kayit = db.Yemek.Where(s => s.yemekId == yemekId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            if (db.Kayit.Count(s => s.kayitYemekId == yemekId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yemek Üzerinde Ogun Kayitli Oldugu icin Silinemez!";
                return sonuc;
            }
            db.Yemek.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = " Yemek Silindi";
            return sonuc;
        }
        #endregion

        #region Kayit
        [HttpGet]
        [Route("api/yemekogunliste(yemekId)")]
        public List<KayitModel> YemekOgunListe(string yemekId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitYemekId == yemekId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitOgunId = x.kayitOgunId,
                kayitYemekId = x.kayitYemekId,
            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.yemekBilgi = YemekById(kayit.kayitYemekId);
                kayit.ogunBilgi = OgunById(kayit.kayitOgunId);
            }

            return liste;
        }

        [HttpGet]
        [Route("api/ogunyemekliste(ogunId)")]
        public List<KayitModel> OgunYemekListe(string ogunId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitOgunId == ogunId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitOgunId = x.kayitOgunId,
                kayitYemekId = x.kayitYemekId,
            }).ToList();

            foreach (var kayit in liste)
            {
                kayit.yemekBilgi = YemekById(kayit.kayitYemekId);
                kayit.ogunBilgi = OgunById(kayit.kayitOgunId);
            }

            return liste;
        }

        [HttpPost]
        [Route("api/kayitekle")]
        public SonucModel KayitEkle(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayitOgunId == model.kayitOgunId && s.kayitYemekId == model.kayitYemekId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu Yemek Ogune Daha Önceden Kayıt Edilmis!";
                return sonuc;
            }

            Kayit yeni = new Kayit();
            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitOgunId = model.kayitOgunId;
            yeni.kayitYemekId = model.kayitYemekId;
            db.Kayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ogun Kaydı Eklendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kayitsil/{kayitId}")]
        public SonucModel KayitSil(string kayitId)
        {
            Kayit kayit = db.Kayit.Where(s => s.kayitId == kayitId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            db.Kayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ogun Kaydı Silindi";
            return sonuc;



        }
        #endregion

    }


}    

