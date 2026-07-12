const CONFIG={API_URL:'',ADMIN_PIN:'1600'};
const $=s=>document.querySelector(s);
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}
async function getData(){
  if(CONFIG.API_URL){
    const r=await fetch(CONFIG.API_URL+'?action=admin&pin='+encodeURIComponent(CONFIG.ADMIN_PIN));
    if(!r.ok)throw new Error('Accès aux données impossible');
    return r.json();
  }
  const team=load('jze2_team',null),subs=load('jze2_subs',[]),returned=load('jze2_returned',false);
  return{teams:team?[team]:[],proofs:subs.map(s=>({...s,team:team?.name||'Sans équipe',code:team?.code||''})),returns:returned&&team?[team]:[]};
}
function statusLabel(status){
  if(status==='valid')return '<span class="valid-badge">Validée</span>';
  if(status==='rejected')return '<span class="rejected-badge">Refusée</span>';
  return '<span class="pending-badge">En attente</span>';
}
function render(d){
  $('#teams').textContent=d.teams.length;$('#photos').textContent=d.proofs.length;$('#returns').textContent=d.returns.length;
  $('#modeBanner').innerHTML=CONFIG.API_URL?'<b>Mode partagé activé</b><br><small>Les données proviennent du Google Sheet connecté.</small>':'<b>Mode démonstration locale</b><br><small>Vous voyez uniquement les données enregistrées sur ce téléphone. Les autres équipes ne sont pas encore centralisées.</small>';
  if(!d.proofs.length){$('#proofs').innerHTML='<p>Aucune preuve reçue sur cet appareil.</p>';return}
  $('#proofs').innerHTML=d.proofs.slice().reverse().map(p=>`<article class="proof-card"><div>${p.preview?`<img src="${p.preview}" alt="Preuve ${p.place}">`:'<div class="panel-icon">📷</div>'}</div><div class="proof-meta"><b>${p.team} — ${p.place}</b><small>Code : ${p.code||'—'}</small><small>${new Date(p.time).toLocaleString('fr-FR')}</small>${statusLabel(p.status)}<div class="proof-actions"><button class="approve" data-status="valid" data-id="${p.id}">✓ Valider</button><button class="reject" data-status="rejected" data-id="${p.id}">✕ Refuser</button><button class="secondary" data-status="pending" data-id="${p.id}">↺ Remettre en attente</button></div></div></article>`).join('');
  document.querySelectorAll('[data-status]').forEach(b=>b.onclick=()=>setStatus(b.dataset.id,b.dataset.status));
}
async function setStatus(id,status){
  if(CONFIG.API_URL){toast('La validation distante sera activée avec le backend V3');return}
  const subs=load('jze2_subs',[]).map(s=>s.id===id?{...s,status}:s);save('jze2_subs',subs);toast(status==='valid'?'Preuve validée':status==='rejected'?'Preuve refusée':'Preuve remise en attente');refresh();
}
async function refresh(){try{render(await getData())}catch(e){toast(e.message||'Données indisponibles')}}
function unlock(){sessionStorage.setItem('jze_admin_unlocked','1');$('#login').classList.add('hidden');$('#dashboard').classList.remove('hidden');refresh()}
$('#loginBtn').onclick=()=>{if($('#pin').value!==CONFIG.ADMIN_PIN)return toast('Code organisateur incorrect');unlock()};
$('#pin').addEventListener('keydown',e=>{if(e.key==='Enter')$('#loginBtn').click()});
$('#refresh').onclick=refresh;
$('#draw').onclick=async()=>{const d=await getData();const list=d.returns;if(!list.length)return toast('Aucune équipe revenue n’est éligible');const w=list[Math.floor(Math.random()*list.length)];$('#winner').textContent='🎉 '+(w.name||w.team||w)};
$('#resetDemo').onclick=()=>{if(!confirm('Effacer toutes les données locales de ce téléphone ?'))return;['jze2_team','jze2_subs','jze2_returned','jze2_distance'].forEach(k=>localStorage.removeItem(k));$('#winner').textContent='';toast('Données locales effacées');refresh()};
if(sessionStorage.getItem('jze_admin_unlocked')==='1')unlock();
