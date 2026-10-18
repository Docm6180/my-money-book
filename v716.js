/* V7.1.6: Settings & Backup Malay text cleanup only. No financial storage changes. */
(()=>{'use strict';
const phrases=[
['⚠️ V6.0.4 货币是个人偏好设置。原有账本金额仍按 MYR 计算，不会自动换算或更改金额。语言翻译仍在逐步完善。','⚠️ Pilihan mata wang hanya untuk paparan. Semua amaun sedia ada kekal dikira dalam MYR; amaun tidak ditukar atau diubah secara automatik.'],
['⚙️ 我的设置 · 主题与使用帮助','⚙️ Tetapan Saya · Tema & Panduan Penggunaan'],
['主题只影响外观，独立保存于当前浏览器；不改变账本数据、负债、利息或还款记录。','Tema hanya mengubah penampilan dan disimpan dalam pelayar ini. Ia tidak mengubah rekod kewangan, hutang, faedah atau bayaran balik.'],
['主题只影响外观，独立保存在当前浏览器；不改变账本数据、负债、利息或还款记录。','Tema hanya mengubah penampilan dan disimpan dalam pelayar ini. Ia tidak mengubah rekod kewangan, hutang, faedah atau bayaran balik.'],
['①「记账」新增收入、支出和账户转账。②「负债」分别建立贷款及记录实际还款。③「报表」查看收支分析。④「备份」定期导出 JSON；换手机前务必保存备份文件。⑤ 资料仅储存在当前浏览器，不会自动同步到其他手机。','① Gunakan Rekod untuk mencatat pendapatan, perbelanjaan dan pindahan antara akaun. ② Gunakan Hutang untuk merekod pinjaman dan bayaran balik sebenar. ③ Gunakan Laporan untuk melihat analisis kewangan. ④ Eksport sandaran JSON secara berkala; simpan fail sandaran sebelum menukar telefon. ⑤ Data hanya disimpan dalam pelayar ini dan tidak disegerakkan secara automatik ke telefon lain.'],
['①「记账」 Tambah Pendapatan、支出和账户转账。②「负债」分别建立贷款及记录实际还款。③「报表」查看Analisis Pendapatan & Perbelanjaan。④「备份」定期导出 JSON；换手机前务必保存备份文件。⑤ 资料仅储存在当前浏览器，不会自动同步到其他手机。','① Gunakan Rekod untuk mencatat pendapatan, perbelanjaan dan pindahan antara akaun. ② Gunakan Hutang untuk merekod pinjaman dan bayaran balik sebenar. ③ Gunakan Laporan untuk melihat analisis kewangan. ④ Eksport sandaran JSON secara berkala; simpan fail sandaran sebelum menukar telefon. ⑤ Data hanya disimpan dalam pelayar ini dan tidak disegerakkan secara automatik ke telefon lain.'],
['🔵 Biru & Putih','🔵 Biru & Putih'],['🟢 Hijau Segar','🟢 Hijau Segar'],['🌙 深色','🌙 Mod Gelap'],
['⚙️ Tetapan Saya · Tema & Bantuan Penggunaan','⚙️ Tetapan Saya · Tema & Panduan Penggunaan']
];
const help='① Gunakan Rekod untuk mencatat pendapatan, perbelanjaan dan pindahan antara akaun. ② Gunakan Hutang untuk merekod pinjaman dan bayaran balik sebenar. ③ Gunakan Laporan untuk melihat analisis kewangan. ④ Eksport sandaran JSON secara berkala; simpan fail sandaran sebelum menukar telefon. ⑤ Data hanya disimpan dalam pelayar ini dan tidak disegerakkan secara automatik ke telefon lain.';
const theme='Tema hanya mengubah penampilan dan disimpan dalam pelayar ini. Ia tidak mengubah rekod kewangan, hutang, faedah atau bayaran balik.';
const currency='⚠️ Pilihan mata wang hanya untuk paparan. Semua amaun sedia ada kekal dikira dalam MYR; amaun tidak ditukar atau diubah secara automatik.';
let busy=false;
function run(){if(busy)return;let lang='zh-CN';try{lang=JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}').lang||'zh-CN'}catch{}if(lang!=='ms')return;busy=true;try{
 const settings=document.getElementById('my');if(!settings)return;
 const cur=settings.querySelector('#v604Prefs .hint');if(cur&&cur.textContent!==currency)cur.textContent=currency;
 const details=settings.querySelector('#v60Prefs');if(details){
 const summary=details.querySelector('summary');if(summary)summary.textContent='⚙️ Tetapan Saya · Tema & Panduan Penggunaan';
 for(const [type,label] of Object.entries({blue:'🔵 Biru & Putih',green:'🟢 Hijau Segar',dark:'🌙 Mod Gelap'})){const btn=details.querySelector('[data-theme-choice="'+type+'"]');if(btn&&btn.textContent!==label)btn.textContent=label;}
 const themeNote=details.querySelector(':scope > p');if(themeNote&&themeNote.textContent!==theme)themeNote.textContent=theme;
 const helpBox=details.querySelector('.v60-help');if(helpBox){const title=helpBox.querySelector('strong');if(title)title.textContent='📖 Panduan Penggunaan';const paragraphs=helpBox.querySelectorAll('p');if(paragraphs[0]&&paragraphs[0].textContent!==help)paragraphs[0].textContent=help;}
 }
}finally{busy=false}}
// Avoid observing our own text writes: the legacy translator may rewrite these nodes.
// A subtree MutationObserver here can trigger an endless translation loop.
run();
function refreshLater(){setTimeout(run,80)}
document.getElementById('v604Language')?.addEventListener('change',refreshLater);
document.addEventListener('click',e=>{if(e.target.closest('[data-tab="my"], #v60Prefs summary, [data-theme-choice]'))refreshLater()});
window.addEventListener('pageshow',refreshLater);
})();
