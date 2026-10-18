/* V7.1.15: narrowly scoped Malay home text fixes. No financial data writes. */
(()=>{'use strict';
const P='mymoney-v604-preferences';
const isMs=()=>{try{return JSON.parse(localStorage.getItem(P)||'{}').lang==='ms'}catch{return false}};
const info='Jumlah Aliran Keluar Bulan Ini merangkumi semua bayaran balik hutang, sama ada dipautkan kepada akaun atau tidak. Jika perbelanjaan kad kredit sudah direkodkan sebagai perbelanjaan biasa, mengambil kira bayaran balik sekali lagi mungkin menyebabkan pengiraan berganda. Maklumat ini menunjukkan aliran tunai keluar dan tidak semestinya menggambarkan perbelanjaan bersih dari sudut perakaunan.';
const exact={'全部账户余额':'Jumlah Baki Semua Akaun','全部Baki Akaun':'Jumlah Baki Semua Akaun','现金':'Tunai','银行转账':'Pindahan Bank','转账银行':'Pindahan Bank','收入':'Pendapatan','支出':'Perbelanjaan'};
function change(el,value){if(el&&el.textContent!==value)el.textContent=value}
function sync(){if(!isMs())return;
const summary=document.getElementById('monthSummary');if(summary){const hint=summary.querySelector('.hint');if(hint&&hint.textContent!==info&&(hint.textContent.includes('本月总流出包含')||hint.textContent.includes('Jumlah Aliran Keluar Bulan Ini')))change(hint,info)}
const accounts=document.getElementById('homeAccounts');if(accounts){const label=accounts.querySelector('.item:first-child strong:first-child');if(label&&(label.textContent.includes('全部')||label.textContent==='Jumlah Baki Semua Akaun'))change(label,'Jumlah Baki Semua Akaun')}
const recent=document.getElementById('recentList');if(recent){for(const row of recent.querySelectorAll('.item')){const sub=row.querySelector('.sub');if(sub){for(const node of sub.childNodes){if(node.nodeType!==3)continue;const old=node.nodeValue;const pieces=old.split(' · ');const updated=pieces.map((s,i)=>{if(i===0)return s;const trimmed=s.trim();return exact[trimmed]?s.replace(trimmed,exact[trimmed]):s}).join(' · ');if(updated!==old)node.nodeValue=updated;}}const pill=row.querySelector('.pill');if(pill&&exact[pill.textContent.trim()])change(pill,exact[pill.textContent.trim()]);}}
}
let scheduled=false;function schedule(){if(scheduled)return;scheduled=true;setTimeout(()=>{scheduled=false;sync()},0)}
for(const id of ['monthSummary','recentList','homeAccounts']){const el=document.getElementById(id);if(el)new MutationObserver(schedule).observe(el,{childList:true,subtree:true,characterData:true})}
document.addEventListener('change',schedule);document.addEventListener('click',e=>{if(e.target.closest('[data-tab]'))schedule()});schedule();
})();
