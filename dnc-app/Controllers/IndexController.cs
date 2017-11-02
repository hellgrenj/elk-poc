using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Serilog.Sinks.Network;

namespace dnc_app.Controllers
{
    [Route("/")]
    [Produces("application/json")]
    public class IndexConteoller : Controller
    {
        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var ip = Dns.GetHostEntry("elk").AddressList[0];
            Console.WriteLine(ip);
            var log = new LoggerConfiguration()
            .WriteTo.TCPSink(ip, 9999)
            .CreateLogger();


            var random = new Random();
            var logMessages = new List<string> { "if your gonna be dumb you gotta be tough", "how can i miss you if you won't go away", "i can't feel my face when im with you" };
            int index = random.Next(logMessages.Count);
            var message = logMessages[index];
            log.Information(message);


            return Ok(new { response = "hello world from dotnet core" });
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
