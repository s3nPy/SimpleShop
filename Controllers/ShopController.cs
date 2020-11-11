using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace job.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShopController : ControllerBase
    {
        private readonly ILogger<ShopController> _logger;

        public ShopController(ILogger<ShopController> logger)
        {
            _logger = logger;
        }

        public static ShopItem GenerateItem(int id) {
            return new ShopItem 
                {
                    Id = id,
                    Name = "бумага",
                    Price = 97 * id % 3000,
                    
                    Attr = new ShopItemAttr 
                    {
                        Color = "белый",
                        Format = (new[]{"А3", "А4"})[id % 2]
                    }
                };
        }

        [HttpGet]
        public IEnumerable<ShopItem> Get()
        {
            return Enumerable.Range(1, 10)
                .Select(index => GenerateItem(index))
                .ToArray();
        }

        [HttpGet("{id:int}")]
        public ShopItem GetById(int id)
        {
            return GenerateItem(id);
        }

        [HttpPost]
        public IActionResult Post(IFormCollection data, IFormFile photo) {
            var rng = new Random();
            return Ok(rng.Next(1, 9999));
        }
    }
}
