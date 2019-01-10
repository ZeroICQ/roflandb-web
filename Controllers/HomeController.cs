using Microsoft.AspNetCore.Mvc;

namespace RoflandbWeb.Controllers {
    public class HomeController : Controller {
        public IActionResult Index() {
            return View();
        }
    }
}