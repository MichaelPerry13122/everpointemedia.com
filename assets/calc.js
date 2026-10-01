/* Everpointe Media — projected return calculator (illustrative assumptions) */
(function(){
  'use strict';
  var PRESETS = {
    epoxy:    { price: 70, job: 3500, close: 10 },
    spray:    { price: 75, job: 4500, close: 8 },
    concrete: { price: 65, job: 5000, close: 6 }
  };
  var $ = function(id){ return document.getElementById(id); };
  var ids = ['locs','lpl','price','job','close'];
  if (!$('locs')) return;

  var usd = function(n){ return '$' + Math.round(n).toLocaleString('en-US'); };
  var num = function(n){ return Math.round(n).toLocaleString('en-US'); };

  function read(){
    return {
      locs: +$('locs').value, lpl: +$('lpl').value, price: +$('price').value,
      job: +$('job').value, close: +$('close').value
    };
  }

  function render(){
    var v = read();
    var leads = v.locs * v.lpl;
    var spend = leads * v.price;
    var jobs = leads * v.close / 100;
    var rev = jobs * v.job;
    var mult = spend ? rev / spend : 0;
    var be = v.job ? (v.price / v.job) * 100 : 0;
    var half = mult / 2;

    $('o-locs').textContent = v.locs;
    $('o-lpl').textContent = v.lpl;
    $('o-price').textContent = usd(v.price);
    $('o-job').textContent = usd(v.job);
    $('o-close').textContent = v.close + '%';

    $('r-mult').textContent = mult.toFixed(1) + 'x';
    $('r-leads').textContent = num(leads);
    $('r-spend').textContent = usd(spend);
    $('r-jobs').textContent = (jobs < 10 ? jobs.toFixed(1) : num(jobs));
    $('r-rev').textContent = usd(rev);
    $('r-be').textContent = be.toFixed(1) + '%';
    $('r-half').textContent = half.toFixed(1) + 'x';
  }

  function applyPreset(name){
    var p = PRESETS[name];
    if (!p) return;
    $('price').value = p.price;
    $('job').value = p.job;
    $('close').value = p.close;
    document.querySelectorAll('.presets button').forEach(function(b){
      b.setAttribute('aria-pressed', b.dataset.preset === name ? 'true' : 'false');
    });
    render();
  }

  ids.forEach(function(id){
    $(id).addEventListener('input', function(){
      if (id !== 'locs' && id !== 'lpl') {
        document.querySelectorAll('.presets button').forEach(function(b){ b.setAttribute('aria-pressed','false'); });
      }
      render();
    });
  });
  document.querySelectorAll('.presets button').forEach(function(b){
    b.addEventListener('click', function(){ applyPreset(b.dataset.preset); });
  });

  render();
})();
