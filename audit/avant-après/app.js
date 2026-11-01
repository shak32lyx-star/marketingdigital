// Barre du haut et navigation du bas communes aux vues mobiles (démo statique).
(function () {
  const icons = {
    home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13"/>',
    vocab: '<path d="M4 5h9M8.5 3v2M6 5c1 4 3 6 6 7M12 5c-1 4-4 7-8 8M14 21l4-10 4 10M15.5 17h5"/>',
    exam: '<path d="M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'
  };
  const items = [
    ['home', 'Accueil', '02-accueil.html'],
    ['book', 'Programme', '03-lecon-fide.html'],
    ['vocab', 'Vocabulaire', '#'],
    ['exam', 'Examen', '04-historique.html'],
    ['user', 'Compte', '06-compte.html']
  ];
  const active = document.body.dataset.active;
  const svg = (k) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icons[k] + '</svg>';

  const top = document.createElement('header');
  top.className = 'topbar';
  top.innerHTML = '<a class="brand" href="02-accueil.html"><span class="logo">F</span>FIDE Coach</a>' +
    '<a class="avatar" href="06-compte.html" aria-label="Mon compte">CM</a>';
  document.querySelector('.app').prepend(top);

  const nav = document.createElement('nav');
  nav.className = 'bottomnav';
  nav.setAttribute('aria-label', 'Navigation principale');
  nav.innerHTML = items.map(function (i) {
    const cur = i[0] === active ? ' aria-current="page"' : '';
    return '<a href="' + i[2] + '"' + cur + '>' + svg(i[0]) + i[1] + '</a>';
  }).join('');
  document.body.append(nav);
})();
