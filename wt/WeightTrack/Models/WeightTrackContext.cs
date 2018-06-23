using Microsoft.EntityFrameworkCore;

namespace WeightTrack.Models {
    public class WeightTrackContext : DbContext {
        public WeightTrackContext(DbContextOptions<WeightTrackContext> options)
            : base (options)
        {
        }
        public DbSet<WeightEntryModel> Entries { get; set; }
    }
}