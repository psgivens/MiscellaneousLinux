using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SecondLookEFCore.Migrations
{
    public partial class OrderNumbers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence(
                name: "EntityFrameworkHiLoSequence",
                incrementBy: 10);

            migrationBuilder.AlterColumn<long>(
                name: "BlogId",
                table: "Posts",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<long>(
                name: "PostId",
                table: "Posts",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<long>(
                name: "BlogId",
                table: "Blogs",
                nullable: false,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropSequence(
                name: "EntityFrameworkHiLoSequence");

            migrationBuilder.AlterColumn<int>(
                name: "BlogId",
                table: "Posts",
                nullable: false,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<int>(
                name: "PostId",
                table: "Posts",
                nullable: false,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<int>(
                name: "BlogId",
                table: "Blogs",
                nullable: false,
                oldClrType: typeof(long));
        }
    }
}
