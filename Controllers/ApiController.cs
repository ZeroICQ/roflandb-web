using System.Net;
using Microsoft.AspNetCore.Mvc;
using RoflandbWeb.Services;

namespace RoflandbWeb.Controllers
{
    
    [ApiController]
    [Route("api/")]
    public class ApiController : ControllerBase {

        private MysqlConnector _mysql; 
        
        public ApiController(MysqlConnector mysql) {
            _mysql = mysql;
        }

        [HttpPost("sql")]
        public string Sql([FromBody] string user, [FromBody] string password, [FromBody] string server,
            [FromBody] int port,  [FromBody] string database, [FromBody] string query) 
        {
            
            return _mysql.Execute(user, password, server, port, database, query);
        }
    }
}