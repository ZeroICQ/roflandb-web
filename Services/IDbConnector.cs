namespace RoflandbWeb.Services {
    public interface IDbConnector {
        object Execute(string user, string password, string server, int port, string database, string query);
    }
}