
# DNX, EFC, and PostgreSql

This project is created completely with free software from the community. I am developing on Ubuntu 16.04 using Visual Studio Code. This is my first sample with this new environment. 

The purpose of this project is to create the simplest example of working with dotnet core, entity framework core, and sqlite on postgresql. 


This project picks up from my first exmple, FirstLookEFCore, which was created from: 
https://docs.microsoft.com/en-us/ef/core/get-started/netcore/new-db-sqlite

### Creating the empty database
I am going to punt in this section for now and give links to my source material. In time, I will return and provide the postgresql/bash commands I used to create the database.

In my case, I am going to use code-first, but I still need to create the database into which these changes will be placed. Digital Ocean has a great tutorial for setting up and using PostgreSql can be found here:
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04

Digital Ocean has a great tutorial on PostgreSql roles and permissions here:
https://www.digitalocean.com/community/tutorials/how-to-use-roles-and-manage-grant-permissions-in-postgresql-on-a-vps--2

### Migrations to create database
Add the initial database

    dotnet ef migrations add InitialCreate
    
After I added the incrementer code in the section "ID Sequencing", I need to add a new migration.

    dotnet ef migrations add OrderNumbers
    
I had to do several iterations of this as I figure it out, so learn to remove them. I dangerously deleted the migration files, but the correct way to do it is this:

    dotnet ef migrations remove 
    
Now we need to push the change to the database

    dotnet ef update


### Swapping the provider
The first thing we have to do is swap out the provider package. 

	dotnet remove package Microsoft.EntityFrameworkCore.Sqlite
	dotnet add package Npgsql.entityframeworkcore.postgresql

### Specify the Connection String
Some good information about connecting to pgsql can be found here: 
http://www.npgsql.org/efcore/

Except, in my case, I am working on a console application with code first, which isn't mentioned there. I took a stab in the dark and rebuilt. After rebuilding the project with the project references, vscode presented me with a new extension method. Thank you intellisense. 

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Server=127.0.0.1;Port=5432;Database=sampledb;User Id=sampledbuser;Password=password;");
        //optionsBuilder.UseSqlite("Data Source=blogging.db");
    }

### ID Sequencing
I found a few examples which do not work talking about "OrderNumbers" because they don't seem to refer to anything. 
~~https://docs.microsoft.com/en-us/ef/core/modeling/relational/sequences
http://www.npgsql.org/efcore/value-generation.html~~

What did work, was the Hilo example:
http://www.npgsql.org/efcore/value-generation.html

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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
