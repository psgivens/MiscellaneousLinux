using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WeightTrack.Models;

namespace WeightTrack.Controllers
{
    [Route("api/[controller]")]
    public class WeightTrackerController : ControllerBase
    {
        private readonly TrackerDbContext _context;

        public WeightTrackerController(TrackerDbContext context)
        {
            _context = context;

            if (_context.WeightEntries.Count() == 0)
            {
                _context.WeightEntries.Add(new WeightEntryModel{
                    Date = System.DateTime.Now,
                    Weight = 215.2F,
                    UserId = System.Guid.NewGuid().ToString()});
                _context.SaveChanges();
            }
        }    

        [HttpGet]
        public List<WeightEntryModel> GetAll()
        {
            return _context.WeightEntries.ToList();
        }

        [HttpGet("{id}", Name = "GetWeight")]
        public IActionResult GetById(long id)
        {
            var item = _context.WeightEntries.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }   
    }
}