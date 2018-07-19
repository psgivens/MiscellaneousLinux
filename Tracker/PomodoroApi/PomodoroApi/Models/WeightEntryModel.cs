namespace WeightTrack.Models {
    public class WeightEntryModel {
        public long Id {get;set;}
        public string UserId { get; set; }
        public System.DateTime Date { get; set; }        
        public float Weight { get; set; }
    }
}