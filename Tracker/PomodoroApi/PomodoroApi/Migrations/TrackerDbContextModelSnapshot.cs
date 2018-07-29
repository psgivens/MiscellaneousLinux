﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using PomodoroApi.Models;
using System;
using WeightTrack.Models;

namespace PomodoroApi.Migrations
{
    [DbContext(typeof(TrackerDbContext))]
    partial class TrackerDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026");

            modelBuilder.Entity("PomodoroApi.Models.PomodoroEntryModel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Actual");

                    b.Property<int>("Elapsed");

                    b.Property<DateTime>("Modified");

                    b.Property<string>("Planned");

                    b.Property<DateTime>("StartTime");

                    b.Property<int>("State");

                    b.Property<string>("Tags");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.ToTable("PomodoroEntries");
                });

            modelBuilder.Entity("WeightTrack.Models.WeightEntryModel", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<string>("UserId");

                    b.Property<float>("Weight");

                    b.HasKey("Id");

                    b.ToTable("WeightEntries");
                });
#pragma warning restore 612, 618
        }
    }
}