using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace PomodoroApi.Migrations
{
    public partial class InitialDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PomodoroEntries",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Actual = table.Column<string>(nullable: true),
                    Elapsed = table.Column<int>(nullable: false),
                    Modified = table.Column<DateTime>(nullable: false),
                    Planned = table.Column<string>(nullable: true),
                    StartTime = table.Column<DateTime>(nullable: false),
                    State = table.Column<int>(nullable: false),
                    Tags = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PomodoroEntries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WeightEntries",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Date = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Weight = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeightEntries", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PomodoroEntries");

            migrationBuilder.DropTable(
                name: "WeightEntries");
        }
    }
}
