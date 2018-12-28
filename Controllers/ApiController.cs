using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace RoflandbWeb.Controllers
{
    [ApiController]
    [Route("api/")]
    public class ApiController : ControllerBase {
        
        [HttpPost("sql")]
        public string Test() {
            var list = new List<string>();
            list.Add("kek");
            list.Add("kek1");
            list.Add("kek1");
            return JsonConvert.SerializeObject(list);
        }
    }
}