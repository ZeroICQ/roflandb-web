using Microsoft.AspNetCore.Mvc;
using RoflandbWeb.Models;
using RoflandbWeb.Services;

namespace RoflandbWeb.Controllers {
    [ApiController]
    [Route("api/")]
    public class ApiController : ControllerBase {
        private MysqlConnector _mysql;

        public ApiController(MysqlConnector mysql) {
            _mysql = mysql;
        }

        [HttpPost("sql")]
        public IActionResult Sql([FromBody] SqlRequestModel r) {
            return new JsonResult(_mysql.Execute(r.User, r.Password, r.Host, r.Port, r.Database, r.Query));
        }
    }
}