using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using RoflandbWeb.Models;

namespace RoflandbWeb.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

    }
}
