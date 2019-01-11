using System.Collections.Generic;
using Npgsql;

namespace RoflandbWeb.Services {
    
    public class PostgresConnector : IDbConnector {
        public (IEnumerable<string>, IEnumerable<object>) Execute(string user, string password, string server, int port, string database, string query) {
            var connectionString =
                $"Database={database}; Host={server}; Port={port}; User Id={user};Password={password}";

            using (var con = new NpgsqlConnection(connectionString)) {

                var command = new NpgsqlCommand(query, con);

                con.Open();

                var resultReader = command.ExecuteReader();
                var result = new List<object>();
                var titles = new List<string>();
                
                for (var i = 0; i < resultReader.FieldCount; i++) {
                    titles.Add(resultReader.GetName(i));
                }

                while (resultReader.Read()) {
                    var row = new object[resultReader.FieldCount];
                    resultReader.GetValues(row);
                    result.Add(row);
                }

                return (titles, result);
            }
        }
    }
}