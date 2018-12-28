using System.Collections.Generic;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

namespace RoflandbWeb.Services {
    
    public class MysqlConnector : IDbConnector {
        public string Execute(string user, string password, string server, int port, string database, string query) {
            
            var connectionString =  $"Database={database}; Data Source={server}; Port={port}; User Id={user};Password={password}";
            
            var con = new MySqlConnection(connectionString);
            var command = new MySqlCommand(query, con);
            
            con.Open();
            
            var resultReader = command.ExecuteReader();
            var result = new List<object>();
            var row = new object[resultReader.FieldCount];
                
            while (resultReader.Read()) {
                resultReader.GetValues(row);
                result.Add(row);
            }
                    
            con.Close();

            return JsonConvert.SerializeObject(result);
        }
    }
}