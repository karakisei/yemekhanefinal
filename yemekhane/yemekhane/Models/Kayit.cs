//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace yemekhane.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Kayit
    {
        public string kayitId { get; set; }
        public string kayitOgunId { get; set; }
        public string kayitYemekId { get; set; }
    
        public virtual Ogun Ogun { get; set; }
        public virtual Yemek Yemek { get; set; }
    }
}
