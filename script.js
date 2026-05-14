/*
 * Declarative use: put an empty element on the page with attributes:
 *   data-typewriter="Your full string here"
 *   data-typewriter-ms="48"   (optional, milliseconds per character; default 48)
 *   data-typewriter-nocursor    (optional, omit the blinking cursor)
 *
 * Line breaks (see .typewriter-output { white-space: pre-line } in style.css):
 *   - In HTML: use a character reference, e.g. data-typewriter="Hi.&#10;Second line."
 *   - Or type a backslash + letter n (two characters) in the attribute: ..."Line one.\nLine two."
 *
 * Example:
 *   <p class="typewriter-line"><span data-typewriter="Hi there." data-typewriter-ms="55"></span></p>
 */

/** Turns literal \n in a string into real newline characters (for data-typewriter attributes). */
function normalizeTypewriterText(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/\\n/g, '\n');
}

function typeWriter(el, text, msPerChar, done) {
  if (!el) return;
  text = normalizeTypewriterText(text);
  var ms =
    typeof msPerChar === 'number' && isFinite(msPerChar) && msPerChar >= 0 ? msPerChar : 48;
  var cb = typeof done === 'function' ? done : null;

  var i = 0;
  el.textContent = '';
  function step() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i += 1;
      setTimeout(step, ms);
    } else if (cb) {
      cb();
    }
  }
  step();
}

function initTypewriters() {
  document.querySelectorAll('[data-typewriter]').forEach(function (host) {
    var full = host.getAttribute('data-typewriter');
    if (full === null || full === '') return;

    var ms = parseInt(host.getAttribute('data-typewriter-ms'), 10);
    if (!isFinite(ms) || ms < 0) ms = 48;

    var noCursor = host.hasAttribute('data-typewriter-nocursor');

    var out = host.querySelector(':scope > .typewriter-output');
    if (!out) {
      out = document.createElement('span');
      out.className = 'typewriter-output';
      host.textContent = '';
      host.appendChild(out);
      if (!noCursor) {
        var cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        cursor.setAttribute('aria-hidden', 'true');
        host.appendChild(cursor);
      }
    }

    typeWriter(out, full, ms);
  });
}

function openNav() {
  var nav = document.getElementById('mySidenav');
  if (nav) nav.style.width = '250px';
  var btn = document.getElementById('menuToggle');
  if (btn) btn.setAttribute('aria-expanded', 'true');
}

function closeNav() {
  var nav = document.getElementById('mySidenav');
  if (nav) nav.style.width = '0';
  var btn = document.getElementById('menuToggle');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

document.addEventListener('DOMContentLoaded', initTypewriters);
