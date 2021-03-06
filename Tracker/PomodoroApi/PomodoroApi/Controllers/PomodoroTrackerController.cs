using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WeightTrack.Models;
using PomodoroApi.Models;
using System.Threading.Tasks;
using System;

namespace PomodoroApi.Controllers
{
    [Route("api/[controller]")]
    public class PomodoroTrackerController : ControllerBase
    {
        private readonly TrackerDbContext _context;

        public PomodoroTrackerController (TrackerDbContext context)
        {
            _context = context;

            if (_context.PomodoroEntries.Count() == 0)
            {
                _context.PomodoroEntries.Add(new PomodoroEntryModel{
                    UserId = System.Guid.NewGuid().ToString(),
                    StartTime = System.DateTime.Now,
                    Modified = System.DateTime.Now,
                    Planned = "Sample activity",
                    Actual = "Sample activity",
                    Elapsed = 25 * 60,
                    Tags = "",
                    State = PomodoroState.NotStarted
                });

                _context.SaveChanges();
            }
        }    

        [HttpGet]
        public List<PomodoroEntryModel> GetAll()
        {
            return _context.PomodoroEntries.ToList();
        }

        [HttpGet("{id}", Name = "GetPomodoro")]
        public  async Task<ActionResult>  GetByIdAsync(long id)
        {
            var item = await _context.PomodoroEntries.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }   


        [HttpPost]
        
        public IActionResult Create([FromBody]PomodoroEntryDto model)
        {                  
            var entry = new PomodoroEntryModel{
                UserId = model.UserId,
                StartTime = DateTime.Parse(model.StartTime),
                Modified = DateTime.Now,
                Planned = model.Planned,
                Actual = model.Actual,
                Elapsed = model.Elapsed,
                Tags = model.Tags,
                State = (PomodoroState)model.State
            };
            try{      
                _context.PomodoroEntries.Add(entry);
                _context.SaveChanges();
                return CreatedAtRoute("GetPomodoro", new { id = entry.Id }, entry);
            } catch {
                Console.WriteLine("error");
                throw;
            }
        }
    }
    public class PomodoroEntryDto {
        public string UserId { get; set; }
        public string StartTime { get; set; }        
        public string Planned { get; set; }
        public string Actual {get; set;}
        public int Elapsed { get; set; }
        public string Tags { get; set; }
        public long State { get; set; }
    }

}