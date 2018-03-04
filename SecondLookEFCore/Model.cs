using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace SecondLookEFCore
{ 
    public class BloggingContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Server=127.0.0.1;Port=5432;Database=sampledb;User Id=sampledbuser;Password=password;");
            //optionsBuilder.UseSqlite("Data Source=blogging.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Blog>().Property(b => b.Id).ForNpgsqlUseSequenceHiLo();
            modelBuilder.ForNpgsqlUseSequenceHiLo();

            /** Does not work!! **/
            /** http://www.npgsql.org/efcore/value-generation.html **/
            // modelBuilder.HasSequence<long>("BlogNumbers")
            //     .StartsAt(1000)
            //     .IncrementsBy(1);
            // modelBuilder.Entity<Blog>()
            //     .Property(o => o.BlogId)
            //     .HasDefaultValueSql("nextval('\"BlogNumbers\"')");

            // modelBuilder.HasSequence<long>("PostNumbers")
            //     .StartsAt(1000)
            //     .IncrementsBy(1);            
            // modelBuilder.Entity<Post>()
            //     .Property(o => o.PostId)
            //     .HasDefaultValueSql("nextval('\"PostNumbers\"')");

        }
    }

    public class Blog
    {
        public long BlogId { get; set; }
        public string Url { get; set; }

        public List<Post> Posts { get; set; }
    }

    public class Post
    {
        public long PostId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public long BlogId { get; set; }
        public Blog Blog { get; set; }
    }
}