document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    if (expanded) {
      menu.setAttribute("hidden", "");
    } else {
      menu.removeAttribute("hidden");
    }
  });

  // Close mobile menu on nav link click (single-page navigation)
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      toggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("hidden", "");
    });
  });
});
