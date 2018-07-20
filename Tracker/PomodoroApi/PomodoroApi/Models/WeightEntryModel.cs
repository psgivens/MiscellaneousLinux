using System.ComponentModel.DataAnnotations;

namespace WeightTrack.Models {
    public class WeightEntryModel {
        [Key]                
        public virtual long Id {get;set;}
        public virtual string UserId { get; set; }
        public virtual System.DateTime Date { get; set; }        
        public virtual float Weight { get; set; }
    }
}