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
    
    public partial class Yemek
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Yemek()
        {
            this.Kayit = new HashSet<Kayit>();
        }
    
        public string yemekId { get; set; }
        public string yemekAdi { get; set; }
        public string yemekGr { get; set; }
        public string yemekKal { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Kayit> Kayit { get; set; }
    }
}