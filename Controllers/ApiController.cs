using System.Linq;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using RoflandbWeb.Models;
using RoflandbWeb.Services;

namespace RoflandbWeb.Controllers {
    [ApiController]
    [Route("api/")]
    public class ApiController : ControllerBase {
        private readonly MysqlConnector _mysql;

        public ApiController(MysqlConnector mysql) {
            _mysql = mysql;
        }

        [HttpPost("sql")]
        [EnableCors("AnyCors")]
        public IActionResult Sql([FromBody] SqlRequestModel r) {
            if (!ModelState.IsValid)
                return new JsonResult(new {errors = ModelState });
                    
            try {
                return new JsonResult(_mysql.Execute(r.User, r.Password, r.Host, r.Port, r.Database, r.Query));
            }
            catch (MySqlException e) {
                return new JsonResult( new {Error = e.Message});
            }
            
        }
    }
}