using Microsoft.EntityFrameworkCore;
using PomodoroApi.Models;

namespace WeightTrack.Models {
    public class TrackerDbContext : DbContext {
        public TrackerDbContext(DbContextOptions<TrackerDbContext> options)
            : base (options) { }
        public virtual DbSet<WeightEntryModel> WeightEntries { get; set; }
        public virtual DbSet<PomodoroEntryModel> PomodoroEntries { get; set; }
    }
}