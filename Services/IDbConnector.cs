namespace RoflandbWeb.Services
{
    public interface IDbConnector {
        string Execute(string user, string password, string server, int port, string database, string query);
    }
}