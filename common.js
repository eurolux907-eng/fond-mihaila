/* Сайт фонда «Благословение» — общая обвязка сайта.
   Один файл на весь сайт: стили и разметка топбара, шапки и подвала.
   Любая правка меню делается только здесь.

   Каждая страница должна содержать:
     <div id="site-topbar"></div>
     <div id="site-header"></div>
     <div id="site-footer"></div>
     <script src="common.js"></script>   (перед </body>)
*/
(function () {
  'use strict';

  /* Меню сайта. Порядок пунктов — как в шапке. */
  var MENU = [
    { href: 'index.html',             text: 'Главная' },
    { href: 'poluchit-pomoshch.html', text: 'Получить помощь' },
    { href: 'konfidencialnost.html',  text: 'Конфиденциальность' },
    { href: 'o-fonde.html',           text: 'О центре' },
    { href: 'partnery.html',          text: 'Партнёры' },
    { href: 'dokumenty.html',         text: 'Документы' },
    { href: 'kontakty.html',          text: 'Контакты' }
  ];

  var DONATE = { href: 'pomoch-fondu.html', text: 'Помочь центру' };

  /* Полное описательное название — выводится в подвале. */
  var FOND_FULL = 'Социальный центр «Благословение» при Патриаршем подворье ' +
                  'храма Архангела Михаила, г. Кубинка';

  /* ------------------------------------------------------------------
     Стили общих блоков.
     :root продублирован здесь, чтобы будущая страница получила палитру,
     даже если забудет объявить её у себя.
     ------------------------------------------------------------------ */
  var CSS = [
    ':root{',
    '  --sm-bg:#FAF8F4;',
    '  --sm-text:#26323E;',
    '  --sm-accent:#1D4E6B;',
    '  --sm-amber:#B9772E;',
    '  --sm-line:#E3DED4;',
    '}',

    /* топбар */
    '.sm-topbar{background:#26323E;color:#FFFFFF;font-size:16px;line-height:1.5}',
    '.sm-topbar__inner{max-width:1160px;margin:0 auto;padding:10px 20px;text-align:center}',
    '.sm-topbar a{color:#FFFFFF;font-weight:700;text-decoration:underline;text-underline-offset:3px;white-space:nowrap}',
    '.sm-topbar a:hover{text-decoration:none}',

    /* шапка */
    '.sm-header{background:var(--sm-bg);border-bottom:1px solid var(--sm-line);position:relative}',
    '.sm-header__inner{max-width:1160px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;gap:16px}',
    '.sm-logo{order:1;color:var(--sm-text);font-weight:700;font-size:17px;line-height:1.25;',
    '  text-decoration:none;margin-right:auto;white-space:nowrap}',
    '.sm-logo:hover{color:var(--sm-accent)}',

    '.sm-nav{order:2;display:flex;align-items:center;gap:12px}',
    '.sm-nav a{color:var(--sm-text);text-decoration:none;font-size:15px;padding:8px 0;',
    '  border-bottom:2px solid transparent;white-space:nowrap}',
    '.sm-nav a:hover{color:var(--sm-accent)}',
    '.sm-nav a.is-active{color:var(--sm-accent);font-weight:700;border-bottom-color:var(--sm-accent)}',

    '.sm-donate{order:3;display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;',
    '  background:var(--sm-amber);color:#FFFFFF;font-weight:700;font-size:16px;text-decoration:none;border-radius:8px;white-space:nowrap}',
    '.sm-donate:hover{background:#A2661F}',

    /* бургер */
    '.sm-burger{display:none;width:48px;height:48px;padding:0;background:transparent;border:1px solid var(--sm-line);',
    '  border-radius:8px;color:var(--sm-text);font-size:22px;line-height:1;cursor:pointer}',
    '.sm-burger:hover{border-color:var(--sm-accent);color:var(--sm-accent)}',

    /* подвал */
    '.sm-footer{background:var(--sm-bg);border-top:1px solid var(--sm-line);margin-top:64px}',
    '.sm-footer__inner{max-width:1160px;margin:0 auto;padding:32px 20px 48px;color:var(--sm-text);font-size:16px;line-height:1.6}',
    '.sm-footer__name{margin:0 0 12px}',
    '.sm-footer__legal{margin:0 0 12px}',
    '.sm-footer__links{display:flex;flex-wrap:wrap;gap:8px 20px;margin:0;padding:0;list-style:none}',
    '.sm-footer a{color:var(--sm-accent);text-underline-offset:3px}',
    '.sm-footer a:hover{text-decoration:none}',

    /* мобильная раскладка */
    '@media (max-width:1199px){',
    '  .sm-header__inner{flex-wrap:wrap;gap:10px}',
    '  .sm-logo{font-size:17px;white-space:normal}',
    '  .sm-burger{display:block;order:3}',
    '  .sm-donate{order:2;padding:0 14px;font-size:15px}',
    '  .sm-nav{display:none;position:absolute;top:100%;left:0;right:0;z-index:10;',
    '    flex-direction:column;align-items:stretch;gap:0;background:var(--sm-bg);',
    '    border-bottom:1px solid var(--sm-line);box-shadow:0 8px 24px rgba(38,50,62,.12);',
    '    padding:8px 20px 16px}',
    '  .sm-nav.is-open{display:flex}',
    '  .sm-nav a{padding:14px 4px;font-size:18px;border-bottom:1px solid var(--sm-line);',
    '    border-left:4px solid transparent;padding-left:12px}',
    '  .sm-nav a:last-child{border-bottom:0}',
    '  .sm-nav a.is-active{border-left-color:var(--sm-accent)}',
    '}'
  ].join('\n');

  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* Имя текущего файла: "/fond-mihaila/" -> index.html */
  function currentPage() {
    var name = window.location.pathname.split('/').pop();
    return name ? name : 'index.html';
  }

  function renderTopbar(host) {
    host.innerHTML =
      '<div class="sm-topbar"><div class="sm-topbar__inner">' +
        'Если жизнь в опасности прямо сейчас — звоните <a href="tel:112">112</a>' +
      '</div></div>';

    /* Линия доверия. Включим после проверки номера — заменить REPLACE_CRISIS_PHONE
       на реальный номер и раскомментировать строку ниже:

       host.querySelector('.sm-topbar__inner').insertAdjacentHTML('beforeend',
         ' &nbsp;·&nbsp; Линия доверия: <a href="tel:REPLACE_CRISIS_PHONE">REPLACE_CRISIS_PHONE</a>');
    */
  }

  function renderHeader(host) {
    var page = currentPage();

    var links = MENU.map(function (item) {
      var active = (item.href === page) ? ' class="is-active" aria-current="page"' : '';
      return '<a href="' + item.href + '"' + active + '>' + item.text + '</a>';
    }).join('');

    host.innerHTML =
      '<header class="sm-header"><div class="sm-header__inner">' +
        '<a class="sm-logo" href="index.html">центр «Благословение»</a>' +
        '<button class="sm-burger" type="button" id="sm-burger" aria-expanded="false" ' +
          'aria-controls="sm-nav" aria-label="Открыть меню">☰</button>' +
        '<a class="sm-donate" href="' + DONATE.href + '">' + DONATE.text + '</a>' +
        '<nav class="sm-nav" id="sm-nav" aria-label="Основное меню">' + links + '</nav>' +
      '</div></header>';

    bindBurger(host);
  }

  function bindBurger(host) {
    var burger = host.querySelector('#sm-burger');
    var nav = host.querySelector('#sm-nav');
    if (!burger || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      burger.innerHTML = open ? '✕' : '☰';
    }

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    /* закрыть по Esc */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        burger.focus();
      }
    });

    /* закрыть по клику вне меню */
    document.addEventListener('click', function (e) {
      if (burger.getAttribute('aria-expanded') !== 'true') return;
      if (!nav.contains(e.target) && !burger.contains(e.target)) setOpen(false);
    });

    /* вернуть меню в исходное состояние при переходе на широкий экран */
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1200) setOpen(false);
    });
  }

  function renderFooter(host) {
    host.innerHTML =
      '<footer class="sm-footer"><div class="sm-footer__inner">' +
        '<p class="sm-footer__name">' + FOND_FULL + '</p>' +
        '<ul class="sm-footer__links">' +
          '<li><a href="dokumenty.html">Документы</a></li>' +
          '<li><a href="konfidencialnost.html">Конфиденциальность</a></li>' +
          '<li><a href="kontakty.html">Контакты</a></li>' +
        '</ul>' +
      '</div></footer>';

    /* Юридическое название фонда. Раскомментировать и вписать юридическое название
       после регистрации юрлица:

       host.querySelector('.sm-footer__name').insertAdjacentHTML('afterend',
         '<p class="sm-footer__legal">REPLACE_FOND_LEGAL</p>');
    */

    /* Телефон фонда. Заменить REPLACE_FOND_PHONE на реальный номер
       и раскомментировать строку ниже:

       host.querySelector('.sm-footer__inner').insertAdjacentHTML('beforeend',
         '<p class="sm-footer__phone">Телефон центра: ' +
         '<a href="tel:REPLACE_FOND_PHONE">REPLACE_FOND_PHONE</a></p>');
    */
  }

  function init() {
    injectStyles();

    var topbar = document.getElementById('site-topbar');
    var header = document.getElementById('site-header');
    var footer = document.getElementById('site-footer');

    if (topbar) renderTopbar(topbar);
    if (header) renderHeader(header);
    if (footer) renderFooter(footer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
