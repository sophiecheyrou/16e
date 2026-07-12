const SHEET_ID = 'A_REMPLACER_PAR_L_ID_DU_GOOGLE_SHEET';
const DRIVE_FOLDER_ID = 'A_REMPLACER_PAR_L_ID_DU_DOSSIER_DRIVE';
const ADMIN_PIN = '1600';

function doGet(e) {
  const action = (e.parameter.action || 'ranking').toLowerCase();
  if (action === 'ranking') return json_(ranking_());
  if (action === 'admin') {
    if (e.parameter.pin !== ADMIN_PIN) return json_({error:'Accès refusé'}, 403);
    return json_(adminData_());
  }
  return json_({ok:true});
}

function doPost(e) {
  try {
    const type = e.postData && e.postData.type || '';
    if (type.indexOf('application/json') > -1) {
      const data = JSON.parse(e.postData.contents || '{}');
      if (data.action === 'register') return json_(register_(data.team));
      if (data.action === 'return') return json_(markReturn_(data.team, data.time));
    }
    const action = e.parameter.action || 'submit';
    if (action === 'submit') return json_(submit_(e));
    return json_({error:'Action inconnue'}, 400);
  } catch (err) {
    return json_({error:String(err)}, 500);
  }
}

function book_(){return SpreadsheetApp.openById(SHEET_ID)}
function sheet_(name, headers){
  const ss=book_(); let sh=ss.getSheetByName(name);
  if(!sh){sh=ss.insertSheet(name);sh.appendRow(headers)}
  return sh;
}
function register_(team){
  const sh=sheet_('Equipes',['Horodatage','Nom','Code','Mode','Retour']);
  const values=sh.getDataRange().getValues();
  const row=values.findIndex((r,i)=>i>0 && String(r[2])===String(team.code));
  if(row>0){sh.getRange(row+1,2,1,3).setValues([[team.name,team.code,team.mode]])}
  else sh.appendRow([new Date(),team.name,team.code,team.mode,'']);
  return {ok:true};
}
function markReturn_(team,time){
  register_(team); const sh=sheet_('Equipes',['Horodatage','Nom','Code','Mode','Retour']);
  const v=sh.getDataRange().getValues(); const i=v.findIndex((r,n)=>n>0&&String(r[2])===String(team.code));
  if(i>0) sh.getRange(i+1,5).setValue(time||new Date()); return {ok:true};
}
function submit_(e){
  const team=JSON.parse(e.parameter.team||'{}'),place=JSON.parse(e.parameter.place||'{}');
  register_(team);
  const folder=DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const blob=e.parameter.photo ? Utilities.newBlob(Utilities.base64Decode(e.parameter.photo),'image/jpeg','preuve.jpg') : null;
  // Pour un multipart/form-data natif, Apps Script ne fournit pas directement le fichier dans e.parameter.
  // La version la plus fiable consiste à envoyer la photo en base64 depuis app.js si vous activez ce backend.
  const fileUrl=blob?folder.createFile(blob).getUrl():'';
  const sh=sheet_('Preuves',['Horodatage','Equipe','Code','Lieu','LieuID','Photo','Statut']);
  sh.appendRow([new Date(),team.name,team.code,place.name,place.id,fileUrl,'pending']);
  return {ok:true,id:Utilities.getUuid()};
}
function ranking_(){
  const sh=sheet_('Preuves',['Horodatage','Equipe','Code','Lieu','LieuID','Photo','Statut']);
  const rows=sh.getDataRange().getValues().slice(1), map={};
  rows.forEach(r=>{const code=String(r[2]),key=code+'|'+String(r[4]); if(!map[code])map[code]={team:r[1],score:0,seen:{}}; if(!map[code].seen[key]){map[code].seen[key]=1;map[code].score++}});
  return Object.values(map).map(x=>({team:x.team,score:x.score})).sort((a,b)=>b.score-a.score);
}
function adminData_(){
  const es=sheet_('Equipes',['Horodatage','Nom','Code','Mode','Retour']).getDataRange().getValues().slice(1);
  const ps=sheet_('Preuves',['Horodatage','Equipe','Code','Lieu','LieuID','Photo','Statut']).getDataRange().getValues().slice(1);
  return {teams:es.map(r=>({name:r[1],code:r[2],mode:r[3]})),returns:es.filter(r=>r[4]).map(r=>({name:r[1],code:r[2]})),proofs:ps.map(r=>({time:r[0],team:r[1],code:r[2],place:r[3],placeId:r[4],photo:r[5],status:r[6]}))};
}
function json_(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)}
