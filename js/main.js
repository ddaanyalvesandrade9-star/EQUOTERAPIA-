(function(){
  'use strict';
  var DB = window.EQUOTEA_DB || {};
  var cfg = DB.config || {};
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(s, c){ return (c || document).querySelector(s); };
  var $$ = function(s, c){ return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function esc(t){ return String(t == null ? '' : t).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; }); }
  function ic(id){ return '<svg class="ic"><use href="#i-' + id + '"/></svg>'; }

  var header = $('#header'), progress = $('#progress'), burger = $('#burger'), nav = $('#nav'), heroBg = $('#heroBg');

  /* ================= Renderização a partir do banco (dados.js) ================= */

  /* Cavalos */
  var cg = $('#cavalosGrid');
  if(cg){
    cg.innerHTML = (DB.cavalos || []).map(function(c, i){
      var campos = [['Idade', c.idade], ['Pelagem', c.pelagem], ['Temperamento', c.temperamento], ['Papel na terapia', c.papel]];
      return '<article class="horse reveal" style="--d:' + (i * .08) + 's">' +
        '<figure class="foto"><img src="' + esc(c.foto) + '" alt="' + esc(c.nome ? 'Cavalo ' + c.nome : 'Cavalo ' + (i + 1)) + '" loading="lazy" onerror="this.remove()">' +
        '<div class="foto__ph">' + ic('camera') + '<strong>Espaço para foto real</strong><small>' + esc(c.foto) + '</small></div></figure>' +
        '<div class="horse__body"><h3' + (c.nome ? '' : ' class="pending"') + '>' + (c.nome ? esc(c.nome) : 'Cavalo ' + (i + 1) + ' · nome a informar') + '</h3><dl>' +
        campos.map(function(f){ return '<dt>' + f[0] + '</dt><dd' + (f[1] ? '' : ' class="pending"') + '>' + (f[1] ? esc(f[1]) : 'a informar') + '</dd>'; }).join('') +
        '</dl></div></article>';
    }).join('');
  }

  /* Necessidades (abas) */
  var tabs = $('#needTabs'), panels = $('#needPanels');
  if(tabs && panels){
    var needs = DB.necessidades || [];
    tabs.innerHTML = needs.map(function(n, i){
      return '<button class="tab" role="tab" type="button" id="tab-' + n.id + '" aria-controls="pn-' + n.id + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + ic(n.icone) + esc(n.rotulo) + '</button>';
    }).join('');
    panels.innerHTML = needs.map(function(n, i){
      return '<div class="tabpanel' + (i === 0 ? ' on' : '') + '" role="tabpanel" id="pn-' + n.id + '" aria-labelledby="tab-' + n.id + '"><div class="need">' +
        '<div class="need__head"><span class="ico">' + ic(n.icone) + '</span><h3>' + esc(n.titulo) + '</h3></div>' +
        '<p class="need__intro">' + esc(n.intro) + '</p><div class="need__groups">' +
        n.grupos.map(function(g){ return '<div class="group"><h4>' + esc(g.titulo) + '</h4><ul class="checklist">' + g.itens.map(function(it){ return '<li>' + ic('check') + '<span>' + esc(it) + '</span></li>'; }).join('') + '</ul></div>'; }).join('') +
        '</div><p class="need__fecho">' + esc(n.fecho) + '</p></div></div>';
    }).join('');
    var tabEls = $$('.tab', tabs);
    function selectTab(t){
      tabEls.forEach(function(b){
        var on = b === t;
        b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
        $('#' + b.getAttribute('aria-controls')).classList.toggle('on', on);
      });
    }
    tabEls.forEach(function(b, i){
      b.addEventListener('click', function(){ selectTab(b); });
      b.addEventListener('keydown', function(e){
        var k = e.key, n = tabEls.length, j = -1;
        if(k === 'ArrowRight') j = (i + 1) % n; else if(k === 'ArrowLeft') j = (i - 1 + n) % n;
        if(j > -1){ e.preventDefault(); tabEls[j].focus(); selectTab(tabEls[j]); }
      });
    });
  }

  /* Formas de ajudar */
  var hg = $('#helpGrid'), sel = $('#modalidade');
  var parc = DB.parceiros || [];
  if(hg){
    hg.innerHTML = parc.map(function(p, i){
      return '<article class="card help reveal" style="--d:' + (i % 3 * .08) + 's">' +
        '<div class="help__top"><span class="ico">' + ic(p.icone) + '</span><div style="margin-top:14px"><span class="help__tag">' + esc(p.tag) + '</span></div>' +
        '<h3>' + esc(p.titulo) + '</h3><p class="help__lead">' + esc(p.destaque) + '</p><p>' + esc(p.intro) + '</p></div>' +
        '<div class="more" id="more-' + p.id + '"><div class="more__in"><div class="more__pad">' +
        '<h4>' + esc(p.listaTitulo) + '</h4><ul class="checklist">' + p.itens.map(function(it){ return '<li>' + ic('check') + '<span>' + esc(it) + '</span></li>'; }).join('') + '</ul>' +
        (p.comoParticipar ? '<h4>Como participar?</h4><p>' + esc(p.comoParticipar) + '</p>' : '') +
        (p.publico ? '<h4>' + esc(p.publicoTitulo) + '</h4><p>' + esc(p.publico) + '</p>' : '') +
        '<p class="fecho">' + esc(p.fecho) + '</p></div></div></div>' +
        '<div class="help__actions"><button class="btn btn--line btn--sm toggle" type="button" aria-expanded="false" aria-controls="more-' + p.id + '">Saiba mais ' + ic('chev') + '</button>' +
        '<a class="btn btn--terra btn--sm" href="#contato" data-pick="' + p.id + '">Quero participar ' + ic('arrow') + '</a></div></article>';
    }).join('');
    $$('.toggle', hg).forEach(function(b){
      b.addEventListener('click', function(){
        var m = $('#' + b.getAttribute('aria-controls')), open = !m.classList.contains('open');
        m.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
        b.firstChild.nodeValue = open ? 'Mostrar menos ' : 'Saiba mais ';
      });
    });
  }
  if(sel){
    sel.innerHTML = parc.map(function(p){ return '<option value="' + p.id + '">' + esc(p.titulo) + '</option>'; }).join('') + '<option value="duvida">Tirar dúvidas / outro assunto</option>';
    var vf = $('#valorField');
    var toggleValor = function(){ vf.hidden = sel.value !== 'apadrinhe'; };
    sel.addEventListener('change', toggleValor); toggleValor();
    $$('[data-pick]').forEach(function(a){ a.addEventListener('click', function(){ sel.value = a.getAttribute('data-pick'); toggleValor(); }); });
  }

  /* Canais de contato */
  function pend(t){ return '<span class="pending">' + t + '</span>'; }
  var onlyDigits = function(s){ return String(s || '').replace(/\D/g, ''); };
  var elI = $('#chInsta'), elW = $('#chWhats'), elM = $('#chMail'), elP = $('#chPix');
  if(elI){
    elI.innerHTML = cfg.instagram ? '<a href="https://instagram.com/' + esc(cfg.instagram) + '" target="_blank" rel="noopener">@' + esc(cfg.instagram) + '</a>' + (cfg.instagramConfirmado ? '' : '<span class="tiny">arroba a confirmar</span>') : pend('em breve');
    elW.innerHTML = cfg.whatsapp ? '<a href="https://wa.me/' + onlyDigits(cfg.whatsapp) + '" target="_blank" rel="noopener">' + esc(cfg.whatsappExibicao || cfg.whatsapp) + '</a>' : pend('número a informar');
    elM.innerHTML = cfg.email ? '<a href="mailto:' + esc(cfg.email) + '">' + esc(cfg.email) + '</a>' : pend('e-mail a informar');
    elP.innerHTML = cfg.pix ? esc(cfg.pix) + (cfg.pixTitular ? '<span class="tiny">Titular: ' + esc(cfg.pixTitular) + '</span>' : '') : pend('chave PIX a informar');
    var cp = $('#copyPix');
    if(cfg.pix){
      cp.disabled = false;
      cp.addEventListener('click', function(){ copyText(cfg.pix, function(){ var s = $('span', cp); s.textContent = 'Chave copiada!'; setTimeout(function(){ s.textContent = 'Copiar chave'; }, 2200); }); });
    }
  }

  /* Rodapé: listas dinâmicas */
  var fh = $('#footHelp');
  if(fh) fh.innerHTML = parc.map(function(p){ return '<li><a href="#parceiro" data-pick="' + p.id + '">' + esc(p.titulo) + '</a></li>'; }).join('');
  var fc = $('#footContact');
  if(fc){
    var lis = [];
    lis.push(cfg.instagram ? '<li><a href="https://instagram.com/' + esc(cfg.instagram) + '" target="_blank" rel="noopener">Instagram @' + esc(cfg.instagram) + '</a></li>' : '<li>Instagram: em breve</li>');
    lis.push(cfg.whatsapp ? '<li><a href="https://wa.me/' + onlyDigits(cfg.whatsapp) + '" target="_blank" rel="noopener">WhatsApp ' + esc(cfg.whatsappExibicao || cfg.whatsapp) + '</a></li>' : '<li>WhatsApp: a informar</li>');
    lis.push(cfg.email ? '<li><a href="mailto:' + esc(cfg.email) + '">' + esc(cfg.email) + '</a></li>' : '<li>E-mail: a informar</li>');
    lis.push('<li><a href="#contato">Formulário de contato</a></li>');
    fc.innerHTML = lis.join('');
  }
  $$('#footHelp [data-pick]').forEach(function(a){ a.addEventListener('click', function(){ if(sel){ sel.value = a.getAttribute('data-pick'); sel.dispatchEvent(new Event('change')); } }); });

  /* Depoimentos */
  var tb = $('#testiBox'), ts = DB.depoimentos || [];
  if(tb){
    tb.innerHTML = ts.length ? ts.map(function(t){
      return '<blockquote class="testi">' + ic('quote') + '<p>' + esc(t.texto) + '</p><footer>' + esc(t.autor) + (t.vinculo ? ' · ' + esc(t.vinculo) : '') + '</footer></blockquote>';
    }).join('') :
    '<div class="empty">' + ic('chat') + '<strong>Histórias de superação em breve</strong>Aqui entrarão os relatos em texto ou vídeo de praticantes e familiares.<small>Só serão publicados com autorização por escrito de cada pessoa.</small></div>';
  }

  /* Prestação de contas */
  var lb = $('#ledgerBox'), dn = DB.doacoes || [];
  if(lb){
    if(!dn.length){
      lb.innerHTML = '<div class="empty">' + ic('doc') + '<strong>Primeiro relatório em breve</strong>As entradas e saídas de recursos serão publicadas aqui, com comprovantes.<small>Nenhum valor foi lançado ainda.</small></div>';
    } else {
      var fmt = function(v){ return Number(v).toLocaleString('pt-BR', {style:'currency', currency:'BRL'}); };
      var ent = 0, sai = 0;
      dn.forEach(function(d){ if(d.tipo === 'Entrada') ent += +d.valor; else sai += +d.valor; });
      lb.innerHTML = '<div class="ledger-wrap"><table class="ledger"><thead><tr><th>Data</th><th>Tipo</th><th>Descrição</th><th>Valor</th></tr></thead><tbody>' +
        dn.map(function(d){ return '<tr><td>' + esc(new Date(d.data + 'T12:00:00').toLocaleDateString('pt-BR')) + '</td><td class="' + (d.tipo === 'Entrada' ? 'in' : 'out') + '">' + esc(d.tipo) + '</td><td>' + esc(d.descricao) + (d.comprovante ? ' · <a href="' + esc(d.comprovante) + '" target="_blank" rel="noopener" style="text-decoration:underline">comprovante</a>' : '') + '</td><td>' + fmt(d.valor) + '</td></tr>'; }).join('') +
        '</tbody><tfoot><tr><td colspan="3">Saldo (entradas − saídas)</td><td>' + fmt(ent - sai) + '</td></tr></tfoot></table></div>';
    }
  }

  /* ================= Interações (mantidas do modelo) ================= */

  /* Menu mobile */
  function closeNav(){ nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  $$('a', nav).forEach(function(a){ a.addEventListener('click', closeNav); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeNav(); });

  /* Scroll: header, progresso, parallax */
  var ticking = false;
  function onScroll(){
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('scrolled', y > 10);
    progress.style.width = (h > 0 ? y / h * 100 : 0) + '%';
    if(!reduce && heroBg && y < window.innerHeight){ heroBg.style.transform = 'translate3d(0,' + (y * .25) + 'px,0)'; }
    ticking = false;
  }
  window.addEventListener('scroll', function(){ if(!ticking){ ticking = true; requestAnimationFrame(onScroll); } }, {passive:true});
  onScroll();

  /* Revelar elementos (inclui os criados dinamicamente) */
  var io, items = $$('.reveal');
  if('IntersectionObserver' in window && !reduce){
    io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
    items.forEach(function(el){ io.observe(el); });
  } else { items.forEach(function(el){ el.classList.add('in'); }); }

  /* Contadores */
  function count(el){
    var target = +el.dataset.count;
    if(reduce){ el.textContent = target; return; }
    var start = null, dur = 1500;
    (function step(t){
      if(!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if(p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var counters = $$('[data-count]');
  if('IntersectionObserver' in window){
    var co = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ count(e.target); co.unobserve(e.target); } });
    }, {threshold:.6});
    counters.forEach(function(c){ co.observe(c); });
  } else { counters.forEach(count); }

  /* Link ativo no menu (seções com data-nav agrupam o scroll) */
  var navLinks = $$('a[href^="#"]', nav);
  var secs = $$('[data-nav]');
  if('IntersectionObserver' in window){
    var so = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          var id = e.target.getAttribute('data-nav');
          navLinks.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
        }
      });
    }, {rootMargin:'-40% 0px -55% 0px'});
    secs.forEach(function(s){ so.observe(s); });
  }

  /* Rodapé em acordeão: clicar abre, clicar de novo fecha */
  $$('.acc__btn').forEach(function(b){
    b.addEventListener('click', function(){
      var acc = b.closest('.acc'), open = !acc.classList.contains('open');
      acc.classList.toggle('open', open);
      b.setAttribute('aria-expanded', open);
    });
  });

  /* Copiar texto */
  function copyText(text, ok){
    function fallback(){
      var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); ok(); }catch(e){}
      document.body.removeChild(ta);
    }
    if(navigator.clipboard && window.isSecureContext){ navigator.clipboard.writeText(text).then(ok, fallback); } else { fallback(); }
  }

  /* Compartilhar */
  var sh = $('#shareBtn'), shm = $('#shareMsg');
  if(sh){
    sh.addEventListener('click', function(){
      var data = {title:'EquoTEA · APAE Campina Grande', text:'Conheça o projeto EquoTEA: equoterapia para pessoas com autismo.', url: location.href};
      if(navigator.share){ navigator.share(data).catch(function(){}); }
      else { copyText(location.href, function(){ shm.textContent = 'Endereço do site copiado! Cole onde quiser compartilhar.'; }); }
    });
  }

  /* Formulário: monta a mensagem e envia pelo canal configurado */
  var form = $('#form'), msg = $('#formMsg'), draft = $('#draft'), copyDraft = $('#copyDraft');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var f = form.elements, ok = true;
    ['nome', 'contato'].forEach(function(n){
      var bad = !f[n].value.trim();
      f[n].classList.toggle('err', bad);
      if(bad) ok = false;
    });
    msg.classList.toggle('bad', !ok);
    if(!ok){ msg.textContent = 'Preencha seu nome e um contato para continuar.'; return; }
    var opt = f.modalidade.options[f.modalidade.selectedIndex].text;
    var text = 'Olá! Gostaria de contribuir com o projeto EquoTEA (APAE Campina Grande).' +
      '\nNome: ' + f.nome.value.trim() +
      '\nContato: ' + f.contato.value.trim() +
      '\nInteresse: ' + opt +
      (f.modalidade.value === 'apadrinhe' && f.valor.value.trim() ? '\nValor mensal pretendido: R$ ' + f.valor.value.trim() : '') +
      (f.msg.value.trim() ? '\nMensagem: ' + f.msg.value.trim() : '');
    draft.hidden = true; copyDraft.hidden = true;
    if(cfg.whatsapp){
      msg.textContent = 'Abrindo o WhatsApp do projeto para você enviar a mensagem…';
      window.open('https://wa.me/' + onlyDigits(cfg.whatsapp) + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      form.reset(); sel.dispatchEvent(new Event('change'));
    } else if(cfg.email){
      msg.textContent = 'Abrindo seu aplicativo de e-mail…';
      location.href = 'mailto:' + cfg.email + '?subject=' + encodeURIComponent('Quero contribuir com o EquoTEA') + '&body=' + encodeURIComponent(text);
    } else {
      msg.textContent = 'Os canais de contato do projeto ainda não foram cadastrados. Copie a mensagem abaixo e envie assim que tiver o contato.';
      draft.textContent = text; draft.hidden = false; copyDraft.hidden = false;
    }
  });
  copyDraft.addEventListener('click', function(){
    copyText(draft.textContent, function(){ msg.classList.remove('bad'); msg.textContent = 'Mensagem copiada!'; });
  });

  /* ================= Melhorias ================= */

  /* Menu: entrada escalonada + indicador deslizante */
  var navAs = $$('a', nav);
  navAs.forEach(function(a, i){ a.style.setProperty('--i', i); });
  var ind = $('#navInd');
  function moveInd(a){
    if(!ind || !a || window.innerWidth <= 1060){ if(ind) ind.style.opacity = 0; return; }
    ind.style.left = a.offsetLeft + 'px'; ind.style.width = a.offsetWidth + 'px'; ind.style.opacity = 1;
  }
  function activeLink(){ return $('a.active', nav); }
  navAs.forEach(function(a){
    a.addEventListener('mouseenter', function(){ moveInd(a); });
    a.addEventListener('focus', function(){ moveInd(a); });
  });
  nav.addEventListener('mouseleave', function(){ moveInd(activeLink()); });
  window.addEventListener('resize', function(){ moveInd(activeLink()); });
  var mo = new MutationObserver(function(){ moveInd(activeLink()); });
  navAs.forEach(function(a){ mo.observe(a, {attributes:true, attributeFilter:['class']}); });
  setTimeout(function(){ moveInd(activeLink()); }, 900);

  /* Carrossel do topo */
  var car = $('#heroCar');
  if(car){
    var slides = $$('.slide', car), dotsBox = $('.car__dots', car), cur = 0, timer = null;
    dotsBox.innerHTML = slides.map(function(s, i){ return '<button type="button" role="tab" aria-label="Foto ' + (i + 1) + '" aria-selected="' + (i === 0) + '"></button>'; }).join('');
    var dots = $$('button', dotsBox);
    var go = function(n){
      cur = (n + slides.length) % slides.length;
      slides.forEach(function(s, i){ s.classList.toggle('on', i === cur); });
      dots.forEach(function(d, i){ d.setAttribute('aria-selected', i === cur); });
    };
    var stop = function(){ if(timer){ clearInterval(timer); timer = null; } };
    var play = function(){ if(reduce) return; stop(); timer = setInterval(function(){ go(cur + 1); }, 5200); };
    dots.forEach(function(d, i){ d.addEventListener('click', function(){ go(i); play(); }); });
    $$('.car__btn', car).forEach(function(b){ b.addEventListener('click', function(){ go(cur + (+b.dataset.dir)); play(); }); });
    car.addEventListener('mouseenter', stop); car.addEventListener('mouseleave', play);
    var x0 = null;
    car.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; stop(); }, {passive:true});
    car.addEventListener('touchend', function(e){ if(x0 !== null){ var dx = e.changedTouches[0].clientX - x0; if(Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); } x0 = null; play(); });
    play();
  }

  /* Vídeo do topo: loop infinito, mudo; botão pausar/continuar */
  var hv = $('#heroVideo'), vb = $('#vidBtn');
  if(hv){
    hv.muted = true; hv.loop = true;
    var tryPlay = function(){ var p = hv.play(); if(p && p.catch) p.catch(function(){}); };
    tryPlay();
    document.addEventListener('click', function once(){ if(hv.paused && vb.getAttribute('aria-pressed') !== 'true') tryPlay(); document.removeEventListener('click', once); });
    vb.addEventListener('click', function(){
      var pause = !hv.paused;
      if(pause){ hv.pause(); } else { tryPlay(); }
      vb.setAttribute('aria-pressed', pause);
      vb.setAttribute('aria-label', pause ? 'Continuar vídeo' : 'Pausar vídeo');
      vb.innerHTML = pause ? '<svg class="ic"><use href="#i-play"/></svg>' : '<svg class="ic"><use href="#i-pause"/></svg>';
    });
  }

  /* Galeria + lightbox */
  var gal = $('#gallery'), lb = $('#lightbox'), lbImg = $('#lbImg');
  if(gal){
    var fotos = [
      {f:'galeria-1.webp', alt:'Criança sorrindo, abraçada ao pescoço de um cavalo branco durante a atividade'},
      {f:'galeria-2.jpg', alt:'Praticante de camiseta da APAE sobre o cavalo, acompanhada por profissionais'},
      {f:'galeria-3.jpg', alt:'Dois profissionais ao lado de uma criança montada em um cavalo, em passeio ao ar livre'}
    ], htm = '';
    fotos.forEach(function(p, n){
      htm += '<figure class="foto reveal" style="--d:' + ((n + 1) * .06) + 's"><img src="assets/fotos/' + p.f + '" alt="' + esc(p.alt) + '" loading="lazy" onerror="this.remove()">' +
        '<div class="foto__ph">' + ic('camera') + '<strong>Foto ' + (n + 1) + '</strong><small>assets/fotos/' + p.f + '</small></div><span class="zoom">' + ic('zoom') + '</span></figure>';
    });
    gal.innerHTML = htm;
    $$('.foto', gal).forEach(function(f){
      var im = $('img', f);
      var mark = function(){ if(im && im.naturalWidth) f.classList.add('has'); };
      if(im){ if(im.complete) mark(); im.addEventListener('load', mark); }
      f.addEventListener('click', function(){
        var i2 = $('img', f); if(!i2 || !i2.naturalWidth) return;
        lbImg.src = i2.src; lbImg.alt = i2.alt; lb.hidden = false; document.body.style.overflow = 'hidden';
      });
    });
    var closeLb = function(){ lb.hidden = true; lbImg.removeAttribute('src'); document.body.style.overflow = ''; };
    lb.addEventListener('click', function(e){ if(e.target !== lbImg) closeLb(); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && !lb.hidden) closeLb(); });
    $$('.reveal', gal).forEach(function(el){ if(io){ io.observe(el); } else { el.classList.add('in'); } });
  }

  /* Visite: endereço, horário, telefones e mapa */
  var vA = $('#vAddr');
  if(vA){
    vA.textContent = cfg.endereco || 'a informar';
    var h = cfg.horario || {};
    $('#vHours').innerHTML = h.dias ? esc(h.dias) + ', das ' + esc(h.funcionamento) + '<br><span style="font-weight:500;color:var(--muted)">Intervalo: ' + esc(h.intervalo) + '</span>' : 'a informar';
    $('#vPhones').innerHTML = (cfg.telefones || []).map(function(t){ return '<a href="tel:+55' + onlyDigits(t) + '">' + esc(t) + '</a>'; }).join('<br>') || 'a informar';
    var q = encodeURIComponent(cfg.endereco || '');
    $('#vMap').href = 'https://www.google.com/maps/search/?api=1&query=' + q;
    $('#mapFrame').src = 'https://maps.google.com/maps?q=' + q + '&z=16&output=embed';
    var vw = $('#vWa'); if(cfg.whatsapp){ vw.href = 'https://wa.me/' + onlyDigits(cfg.whatsapp) + '?text=' + encodeURIComponent('Olá! Vim pelo site do EquoTEA.'); } else { vw.hidden = true; }
  }
  if(fc && cfg.telefones){
    fc.insertAdjacentHTML('beforeend', '<li>Tel.: ' + cfg.telefones.map(function(t){ return '<a href="tel:+55' + onlyDigits(t) + '">' + esc(t) + '</a>'; }).join(' · ') + '</li>' +
      (cfg.endereco ? '<li>' + esc(cfg.endereco) + '</li>' : '') +
      (cfg.horario ? '<li>' + esc(cfg.horario.dias) + ', ' + esc(cfg.horario.funcionamento) + '</li>' : ''));
  }

  /* Voltar ao topo */
  var tt = $('#toTop');
  if(tt){
    window.addEventListener('scroll', function(){ tt.classList.toggle('show', window.scrollY > 700); }, {passive:true});
    tt.addEventListener('click', function(){ window.scrollTo({top:0, behavior: reduce ? 'auto' : 'smooth'}); });
  }
})();
