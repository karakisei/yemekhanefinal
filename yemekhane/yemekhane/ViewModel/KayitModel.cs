using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace yemekhane.ViewModel
{
    public class KayitModel
    {
        public string kayitId { get; set; }
        public string kayitOgunId { get; set; }
        public string kayitYemekId { get; set; }

        public OgunModel ogunBilgi { get; set; }
        public YemekModel yemekBilgi { get; set; }
    }
}