namespace RoflandbWeb.Models {
    public class SqlRequestModel {
        public string User { get; }
        public string Password { get; }
        public string Host { get; }
        public int Port { get; }
        public string Database { get; }
        public string Query { get; }
    }
}