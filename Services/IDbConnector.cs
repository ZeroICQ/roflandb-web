using System.Collections.Generic;

namespace RoflandbWeb.Services {
    public interface IDbConnector {
        (IEnumerable<string>, IEnumerable<object>) Execute(string user, string password, string server, int port, string database, string query);
    }
}