using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace RoflandbWeb.Models {
    
    public class SqlRequestModel {
        public enum DbType {Mysql, Postgres}
        
        [Required]
        public string User { get; set; }
        
        [Required]
        public string Password { get; set; }
        
        [Required]
        public string Host { get; set; }
        
        [Required]
        [Range(1, 65535)]
        public int Port { get; set; }
        
        [Required]
        public string Database { get; set; }
        
        [Required]
        public string Query { get; set; }
        
//        [Required]
//        public
        }
}