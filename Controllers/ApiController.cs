using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Npgsql;
using RoflandbWeb.Models;
using RoflandbWeb.Services;

namespace RoflandbWeb.Controllers {
    [ApiController]
    [Route("api/")]
    public class ApiController : ControllerBase {
        private readonly MysqlConnector _mysql;
        private readonly PostgresConnector _postgres;

        public ApiController(MysqlConnector mysql, PostgresConnector postgres) {
            _mysql = mysql;
            _postgres = postgres;
        }

        [HttpPost("sql")]
        [EnableCors("AnyCors")]
        public IActionResult Sql([FromBody] SqlRequestModel r) {
            if (!ModelState.IsValid)
                return BadRequest(new {validationErrors = ModelState });

            try {
                IEnumerable<string> titles = null;
                IEnumerable<object> result = null;
                    ;
                switch (r.DbType) {
                    case SqlRequestModel.DbTypeEnum.Mysql:
                        (titles, result) = _mysql.Execute(r.User, r.Password, r.Host, r.Port, r.Database, r.Query);
                        break;
                        
                    case SqlRequestModel.DbTypeEnum.Postgres:
                        (titles, result) =_postgres.Execute(r.User, r.Password, r.Host, r.Port, r.Database, r.Query);
                        break;
                }
                
                return new JsonResult(new {titles=titles, result=result});

            }
            catch (MySqlException e) {
                return BadRequest(new {dbError = e.Message});
            }
            catch (PostgresException e) {
                return BadRequest(new {dbError = e.Message});
            }
        }
    }
}