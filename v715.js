/* V7.1.5: Stage 1, navigation and fixed home labels only. No ledger writes. */
(()=>{'use strict';
const labels={
'ms':{home:'⌂ Utama',transactions:'＋ Transaksi',bills:'▣ Bil & Peringatan',debts:'▣ Hutang',analytics:'▥ Laporan',my:'⚙ Tetapan & Sandaran'},
'en':{home:'⌂ Home',transactions:'＋ Transactions',bills:'▣ Bills & Reminders',debts:'▣ Debts',analytics:'▥ Reports',my:'⚙ Settings & Backup'},
'zh-TW':{home:'⌂ 首頁',transactions:'＋ 記帳',bills:'▣ 帳單與提醒',debts:'▣ 負債',analytics:'▥ 報表',my:'⚙ 設定與備份'},
'zh-CN':{home:'⌂ 首页',transactions:'＋ 记账',bills:'▣ 账单与提醒',debts:'▣ 负债',analytics:'▥ 报表',my:'⚙ 设置与备份'}};
const homeMs={'本月收入':'Pendapatan Bulan Ini','本月总流出（支出＋还款）':'Jumlah Aliran Keluar Bulan Ini','本月收入－总流出':'Baki Aliran Tunai Bulan Ini','剩余总负债':'Jumlah Baki Hutang','本月收支概况':'Ringkasan Bulanan','最近交易':'Transaksi Terkini','账户余额概览':'Ringkasan Baki Akaun','负债概览':'Ringkasan Hutang','暂无本月记录':'Tiada rekod bulan ini','暂无交易':'Tiada transaksi','暂无账户':'Tiada akaun','暂无负债':'Tiada hutang','＋ 记一笔':'＋ Tambah Rekod','⇄ 转账':'⇄ Pindahan','▣ 记录还款':'▣ Rekod Bayaran Balik','◉ 隐藏金额':'◉ Sembunyikan Amaun','◉ 显示金额':'◉ Paparkan Amaun'};
const homeOrigins=new WeakMap();
function language(){try{const p=JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}');const x=p.lang||document.documentElement.lang||'zh-CN';return /^ms/i.test(x)?'ms':/^en/i.test(x)?'en':/tw|hant/i.test(x)?'zh-TW':'zh-CN'}catch{return 'zh-CN'}}
let busy=false;
function sync(){if(busy)return;busy=true;try{const lang=language(),map=labels[lang];for(const [id,value] of Object.entries(map)){const el=document.querySelector(`.tabs [data-tab="${id}"]`);if(el&&el.textContent!==value)el.textContent=value}
if(lang==='ms'){
 const root=document.getElementById('home');if(root){const nodes=root.querySelectorAll('.v603-homecards .metric span, .box > h2, .v603-quick button, .v603-eye');for(const el of nodes){if(!homeOrigins.has(el))homeOrigins.set(el,el.textContent.trim());const original=homeOrigins.get(el);const replacement=homeMs[original];if(replacement&&el.textContent!==replacement)el.textContent=replacement;}}
}
}finally{busy=false}}
let pending=false;function schedule(){if(pending)return;pending=true;queueMicrotask(()=>{pending=false;sync()})}
sync();const observer=new MutationObserver(schedule);const nav=document.querySelector('.tabs');if(nav)observer.observe(nav,{childList:true,subtree:true,characterData:true});
document.addEventListener('change',schedule);document.addEventListener('click',schedule);document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule()});
})();
