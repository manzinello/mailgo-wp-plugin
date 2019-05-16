"use strict";

var V = "0.3.2";
var MAILTO = "mailto:"; // mailgo style

var mailgoCSS = document.createElement("link");
mailgoCSS.rel = "stylesheet";
mailgoCSS.type = "text/css";
mailgoCSS.href = "https://unpkg.com/mailgo@" + V + "/dist/mailgo.min.css";
document.head.appendChild(mailgoCSS);
/**
 * mailgoInit
 * the function that creates the mailgo element in DOM
 */

var mailgoInit = function mailgoInit() {
  // modal
  var modal = document.createElement("div");
  modal.id = "mailgo";
  modal.classList.add("mailgo-modal");
  modal.style.display = "none"; // background

  var modalBackground = document.createElement("div");
  modalBackground.className = "mailgo-modal-background";
  modal.appendChild(modalBackground); // modal content

  var modalContent = document.createElement("div");
  modalContent.className = "mailgo-modal-content";
  modal.appendChild(modalContent); // title (email address)

  var title = document.createElement("strong");
  title.id = "mailgo-title";
  title.className = "mailgo-title";
  modalContent.appendChild(title); // details

  var details = document.createElement("div");
  details.id = "mailgo-details";
  details.className = "mailgo-details";
  var detailCc = document.createElement("p");
  detailCc.id = "mailgo-cc";
  var ccSpan = document.createElement("span");
  ccSpan.className = "mailgo-weight-500";
  var ccContent = document.createTextNode("cc ");
  ccSpan.appendChild(ccContent);
  var ccValue = document.createElement("span");
  ccValue.id = "mailgo-cc-value";
  detailCc.appendChild(ccSpan);
  detailCc.appendChild(ccValue);
  details.appendChild(detailCc);
  var detailBcc = document.createElement("p");
  detailBcc.id = "mailgo-bcc";
  var bccSpan = document.createElement("span");
  bccSpan.className = "mailgo-weight-500";
  var bccContent = document.createTextNode("bcc ");
  bccSpan.appendChild(bccContent);
  var bccValue = document.createElement("span");
  bccValue.id = "mailgo-bcc-value";
  detailBcc.appendChild(bccSpan);
  detailBcc.appendChild(bccValue);
  details.appendChild(detailBcc);
  var detailSubject = document.createElement("p");
  detailSubject.id = "mailgo-subject";
  var subjectSpan = document.createElement("span");
  subjectSpan.className = "mailgo-weight-500";
  var subjectContent = document.createTextNode("subject");
  subjectSpan.appendChild(subjectContent);
  var subjectValue = document.createElement("span");
  subjectValue.id = "mailgo-subject-value";
  detailSubject.appendChild(subjectSpan);
  detailSubject.appendChild(subjectValue);
  details.appendChild(detailSubject);
  var detailBody = document.createElement("p");
  detailBody.id = "mailgo-body";
  var bodySpan = document.createElement("span");
  bodySpan.className = "mailgo-weight-500";
  var bodyContent = document.createTextNode("body ");
  bodySpan.appendChild(bodyContent);
  var bodyValue = document.createElement("span");
  bodyValue.id = "mailgo-body-value";
  detailBody.appendChild(bodySpan);
  detailBody.appendChild(bodyValue);
  details.appendChild(detailBody);
  modalContent.appendChild(details); // Gmail

  var gmail = document.createElement("a");
  gmail.id = "mailgo-gmail";
  gmail.classList.add("mailgo-open");
  gmail.classList.add("mailgo-gmail");
  var gmailContent = document.createTextNode("open in ");
  gmail.appendChild(gmailContent);
  var gmailSpan = document.createElement("span");
  gmailSpan.className = "mailgo-weight-500";
  var gmailSpanContent = document.createTextNode("Gmail");
  gmailSpan.appendChild(gmailSpanContent);
  gmail.appendChild(gmailSpan);
  modalContent.appendChild(gmail); // Outlook

  var outlook = document.createElement("a");
  outlook.id = "mailgo-outlook";
  outlook.classList.add("mailgo-open");
  outlook.classList.add("mailgo-outlook");
  var outlookContent = document.createTextNode("open in ");
  outlook.appendChild(outlookContent);
  var outlookSpan = document.createElement("span");
  outlookSpan.className = "mailgo-weight-500";
  var outlookSpanContent = document.createTextNode("Outlook");
  outlookSpan.appendChild(outlookSpanContent);
  outlook.appendChild(outlookSpan);
  modalContent.appendChild(outlook); // open default

  var open = document.createElement("a");
  open.id = "mailgo-open";
  open.href = "#mailgo-open";
  open.classList.add("mailgo-open");
  open.classList.add("mailgo-default");
  open.classList.add("mailgo-weight-500");
  var openContent = document.createTextNode("open");
  open.appendChild(openContent);
  modalContent.appendChild(open); // copy

  var copy = document.createElement("a");
  copy.id = "mailgo-copy";
  copy.href = "#mailgo-copy";
  copy.classList.add("mailgo-copy");
  copy.classList.add("mailgo-weight-500");
  var copyContent = document.createTextNode("copy");
  copy.appendChild(copyContent);
  modalContent.appendChild(copy); // by

  var by = document.createElement("a");
  by.href = "https://mailgo.js.org";
  by.className = "mailgo-by";
  by.target = "_blank";
  var textBy = document.createTextNode("mailgo.js.org");
  by.appendChild(textBy);
  modalContent.appendChild(by); // add the modal at the end of the body

  document.body.appendChild(modal); // every click outside the modal will hide the modal

  modalBackground.addEventListener("click", hideMailgo, false);
};
/**
 * mailgoRender
 * function to render a single mailgo
 */


var mailgoRender = function mailgoRender(mailgo) {
  var mail = "",
      url = "",
      mailtoHref = "",
      cc = "",
      bcc = "",
      subject = "",
      bodyMail = ""; // if the element href=^"mailto:"

  if (mailgo.href && mailgo.href.toLowerCase().startsWith(MAILTO)) {
    mail = decodeURIComponent(mailgo.href.split("?")[0].split(MAILTO)[1].trim());
    mailtoHref = mailgo.href;
    url = new URL(mailtoHref);
    var urlParams = new URLSearchParams(url.search); // optional parameters for the email

    cc = urlParams.get("cc");
    bcc = urlParams.get("bcc");
    subject = urlParams.get("subject");
    bodyMail = urlParams.get("body");
  } else {
    // if the element href="#mailgo" or class="mailgo"
    // mail = data-address + @ + data-domain
    mail = mailgo.getAttribute("data-address") + "@" + mailgo.getAttribute("data-domain");
    mailtoHref = MAILTO + encodeURIComponent(mail);
    url = new URL(mailtoHref); // cc = data-cc-address + @ + data-cc-domain

    cc = mailgo.getAttribute("data-cc-address") + "@" + mailgo.getAttribute("data-cc-domain"); // bcc = data-bcc-address + @ + data-bcc-domain

    bcc = mailgo.getAttribute("data-bcc-address") + "@" + mailgo.getAttribute("data-bcc-domain"); // subject = data-subject

    subject = mailgo.getAttribute("data-subject"); // body = data-body

    bodyMail = mailgo.getAttribute("data-body");
  } // validate the email address


  if (!validateEmail(mail)) return; // if cc, bcc is not valid cc, bcc = ""

  if (!validateEmail(cc)) cc = "";
  if (!validateEmail(bcc)) bcc = ""; // information

  var titleEl = getE("mailgo-title");
  var detailsEl = getE("mailgo-details");
  var ccEl = getE("mailgo-cc");
  var ccValueEl = getE("mailgo-cc-value");
  var bccEl = getE("mailgo-bcc");
  var bccValueEl = getE("mailgo-bcc-value");
  var subjectEl = getE("mailgo-subject");
  var subjectValueEl = getE("mailgo-subject-value");
  var bodyEl = getE("mailgo-body");
  var bodyValueEl = getE("mailgo-body-value"); // actions

  var gmailButton = getE("mailgo-gmail");
  var outlookButton = getE("mailgo-outlook");
  var openButton = getE("mailgo-open");
  var copyButton = getE("mailgo-copy"); // the title of the modal (email address)

  titleEl.textContent = mail; // add the details if provided

  cc ? (ccEl.style.display = "block", ccValueEl.textContent = cc) : ccEl.style.display = "none";
  bcc ? (bccEl.style.display = "block", bccValueEl.textContent = bcc) : bccEl.style.display = "none";
  subject ? (subjectEl.style.display = "block", subjectValueEl.textContent = subject) : subjectEl.style.display = "none";
  bodyMail ? (bodyEl.style.display = "block", bodyValueEl.textContent = bodyMail) : bodyEl.style.display = "none"; // add the actions

  gmailButton.href = "https://mail.google.com/mail?extsrc=mailto&url=" + encodeURIComponent(mailtoHref);
  outlookButton.href = "https://outlook.office.com/owa/?rru=compose&to=" + encodeURIComponent(mail) + url.search.replace(/^[$]/, "&");
  var encEmail = encodeEmail(mail);
  openButton.addEventListener("click", function () {
    mailToEncoded(encEmail);
  }, false);
  copyButton.addEventListener("click", function (event) {
    copyToClipboard(mail);
    copyButton.textContent = "copied";
    setTimeout(function () {
      copyButton.textContent = "copy";
    }, 999);
  }, false); // show the mailgo

  showMailgo();
};
/**
 * mailgoCheckRender
 * function to check if an element is mailgo-enabled or not referencing to the old
 * document.querySelectorAll(
 *   'a[href^="mailto:" i]:not(.no-mailgo), a[href="#mailgo"], a.mailgo'
 * ); and the new a[mailgo]
 */


var mailgoCheckRender = function mailgoCheckRender(event) {
  // the target element
  var e = event.target; // check if the id=mailgo exists in the body

  if (!document.body.contains(getE("mailgo"))) return;

  if ( // first case: it is an <a> element with "mailto:..." in href and no no-mailgo in classList
  e.href && e.href.toLowerCase().startsWith(MAILTO) && !e.classList.contains("no-mailgo") || // second case: the href=#mailgo
  e.href && e.getAttribute("href").toLowerCase() === "#mailgo" || // third case: the classList contains mailgo
  e.classList.contains("mailgo") || // fourth case: exists the attribute mailgo in the <a> element
  !!e.getAttribute("mailgo")) {
    // stop the normal execution of the element click
    event.preventDefault(); // render mailgo

    mailgoRender(e);
  }
};
/**
 * mailgoKeydown
 * function to manage the keydown event when the modal is showing
 */


var mailgoKeydown = function mailgoKeydown(event) {
  switch (event.keyCode) {
    case 27:
      // Escape
      hideMailgo();
      break;

    default:
      return;
  }

  return;
}; // DOMContentLoaded -> mailgoInit (creates the modal)


document.addEventListener("DOMContentLoaded", mailgoInit, false); // event listener on body, if the element is mailgo-compatible the mailgo modal will be rendered

document.body.addEventListener("click", mailgoCheckRender, false); // validate the email with regex

var validateEmail = function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}; // copy of a string


var copyToClipboard = function copyToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}; // show the modal


var showMailgo = function showMailgo() {
  getE("mailgo").style.display = "flex"; // add mailgoKeydown

  document.body.addEventListener("keydown", mailgoKeydown, false);
}; // hide the modal


var hideMailgo = function hideMailgo() {
  getE("mailgo").style.display = "none"; // remove mailgoKeydown

  document.body.removeEventListener("keydown", mailgoKeydown, false);
}; // decrypt email


var mailToEncoded = function mailToEncoded(encoded) {
  return window.location.href = MAILTO + atob(encoded);
}; // encode email


var encodeEmail = function encodeEmail(email) {
  return btoa(email);
}; // getE shorthand


var getE = function getE(id) {
  return document.getElementById(id);
};