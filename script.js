var header = document.getElementById("header");
var hero = document.getElementById("hero");
var menuButton = document.getElementById("menuButton");
var nav = document.getElementById("nav");

function updateHeader() {
  if (hero && window.scrollY < 60) {
    header.classList.add("over");
  } else {
    header.classList.remove("over");
  }
}
updateHeader();
window.onscroll = updateHeader;

menuButton.onclick = function () {
  nav.classList.toggle("open");
  header.classList.toggle("menu-open");
};
var navLinks = nav.getElementsByTagName("a");
for (var n = 0; n < navLinks.length; n++) {
  navLinks[n].onclick = function () {
    nav.classList.remove("open");
    header.classList.remove("menu-open");
  };
}

var pills = document.getElementsByClassName("pill");
var items = document.getElementsByClassName("work-item");
for (var i = 0; i < pills.length; i++) {
  pills[i].onclick = function () {
    var chosen = this.getAttribute("data-filter");
    for (var j = 0; j < pills.length; j++) {
      pills[j].classList.remove("active");
    }
    this.classList.add("active");
    for (var k = 0; k < items.length; k++) {
      var category = items[k].getAttribute("data-category");
      if (chosen == "all" || chosen == category) {
        items[k].style.display = "block";
      } else {
        items[k].style.display = "none";
      }
    }
  };
}

var form = document.getElementById("projectForm");
var statusBox = document.getElementById("formStatus");
if (form) {
  form.onsubmit = function (e) {
    e.preventDefault();
    var action = form.getAttribute("action");
    if (action.indexOf("YOUR_FORM_ID") != -1) {
      statusBox.textContent = "The form is not connected yet. Please contact us on WhatsApp.";
      statusBox.className = "form-status error";
      return;
    }
    var button = form.getElementsByTagName("button")[0];
    button.disabled = true;
    button.textContent = "Sending...";
    var request = new XMLHttpRequest();
    request.open("POST", action);
    request.setRequestHeader("Accept", "application/json");
    request.onreadystatechange = function () {
      if (request.readyState != 4) {
        return;
      }
      button.disabled = false;
      button.textContent = "Send enquiry";
      if (request.status == 200) {
        form.reset();
        statusBox.textContent = "Thank you. We have received your enquiry and will contact you soon.";
        statusBox.className = "form-status ok";
      } else {
        statusBox.textContent = "Sorry, something went wrong. Please try again, or chat with us on WhatsApp.";
        statusBox.className = "form-status error";
      }
    };
    request.send(new FormData(form));
  };
}