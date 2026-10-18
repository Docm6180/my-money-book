/* V7.1.16: focused, idempotent Malay home label corrections; display-only. */
(()=>{'use strict';
const PREF='mymoney-v604-preferences';
const malay=()=>{try{return JSON.parse(localStorage.getItem(PREF)||'{}').lang==='ms'}catch{return false}};
const replacements=[
 ['本月Perbelanjaan Biasa','Perbelanjaan Biasa Bulan Ini'],
 ['本月普通支出','Perbelanjaan Biasa Bulan Ini'],
 ['Pendapatan Bulan Ini减Jumlah Aliran Keluar','Pendapatan Bulan Ini Tolak Jumlah Aliran Keluar'],
 ['本月收入减总流出','Pendapatan Bulan Ini Tolak Jumlah Aliran Keluar'],
 ['本月总流出（支出＋还款）','Jumlah Aliran Keluar Bulan Ini (Perbelanjaan + Bayaran Balik Hutang)'],
 ['Jumlah Aliran Keluar Bulan Ini（支出＋还款）','Jumlah Aliran Keluar Bulan Ini (Perbelanjaan + Bayaran Balik Hutang)'],
 ['Jumlah Aliran Keluar Bulan Ini（支出+还款）','Jumlah Aliran Keluar Bulan Ini (Perbelanjaan + Bayaran Balik Hutang)'],
 ['MYMONEY · 财务总览','MYMONEY · Ringkasan Kewangan']
];
function apply(){if(!malay())return;
 const summary=document.getElementById('monthSummary');
 if(summary)for(const item of summary.querySelectorAll('.item')){
   const label=item.firstElementChild;if(!label||label.tagName==='STRONG')continue;
   const old=label.textContent.trim();let next=old;
   for(const [from,to] of replacements)if(next===from){next=to;break}
   if(next!==old)label.textContent=next;
 }
 const card=document.querySelector('#home .v603-homecards #mExpense');
 const cardLabel=card?.parentElement?.querySelector('span');
 if(cardLabel){const old=cardLabel.textContent.trim();const found=replacements.find(([from])=>old===from);if(found)cardLabel.textContent=found[1]}
 const banner=document.querySelector('#home .v603-welcome small');
 if(banner&&banner.textContent.includes('财务总览'))banner.textContent='MYMONEY · Ringkasan Kewangan';
}
let pending=false;
function schedule(){if(pending)return;pending=true;setTimeout(()=>{pending=false;apply()},0)}
const targets=['monthSummary'];
for(const id of targets){const el=document.getElementById(id);if(el)new MutationObserver(schedule).observe(el,{childList:true,subtree:true,characterData:true})}
document.addEventListener('change',schedule);
document.addEventListener('click',e=>{if(e.target.closest('[data-tab]'))schedule()});
schedule();
})();
