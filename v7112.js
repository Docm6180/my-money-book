/* V7.1.12: additional Malay translations scoped to Records. No stored-data writes. */
(()=>{'use strict';
const root=document.getElementById('transactions');if(!root)return;
const pairs=[
['🎨 自定义收支类别与图标','🎨 Kategori Pendapatan & Perbelanjaan Tersuai'],
['自定义收支类别与图标','Kategori Pendapatan & Perbelanjaan Tersuai'],
['原有类别继续保留。你可以新增自己的收入／支出类别并选择图标，删除类别不会删除旧交易。','Kategori sedia ada dikekalkan. Anda boleh menambah kategori pendapatan atau perbelanjaan sendiri dan memilih ikon. Memadam kategori tidak akan memadam transaksi lama.'],
['原有类别继续保留。你可以新增自己的收入／支出类别并选择图标，删除类别不会删除旧交易。','Kategori sedia ada dikekalkan. Anda boleh menambah kategori pendapatan atau perbelanjaan sendiri dan memilih ikon. Memadam kategori tidak akan memadam transaksi lama.'],
['选择品牌图标（银行／E-dompet／购物等）','Pilih Ikon Jenama (Bank / E-dompet / Beli-belah)'],
['选择品牌图标（银行／电子钱包／购物等）','Pilih Ikon Jenama (Bank / E-dompet / Beli-belah)'],
['选择品牌图标（银行／E-dompet／购物等）','Pilih Ikon Jenama (Bank / E-dompet / Beli-belah)'],
['当前图标：','Ikon Semasa: '],['默认图标','Ikon Lalai'],
['快捷记收入','Rekod Pendapatan Pantas'],['快捷记支出','Rekod Perbelanjaan Pantas'],
['未找到匹配记录','Tiada Rekod Sepadan'],['没有匹配记录','Tiada Rekod Sepadan'],
['启用时余额（RM）','Baki Semasa Pengaktifan (RM)'],
['账户总余额（不扣除负债）','Jumlah Baki Akaun (Tidak Termasuk Hutang)'],
['初始余额：','Baki Permulaan: '],
['转账仅移动Baki Akaun，不计入收入或支出。','Pindahan hanya memindahkan baki akaun dan tidak dikira sebagai pendapatan atau perbelanjaan.'],
['转账仅移动账户余额，不计入收入或支出。','Pindahan hanya memindahkan baki akaun dan tidak dikira sebagai pendapatan atau perbelanjaan.'],
['转账记录','Sejarah Pindahan'],['暂无转账','Tiada Pindahan'],
['现金','Tunai'],['选择图标','Pilih Ikon'],['新增类别','Tambah Kategori'],
['搜索分类、备注、金额或日期','Cari kategori, nota, amaun atau tarikh'],
['月份筛选','Tapis Mengikut Bulan'],['类型筛选','Tapis Mengikut Jenis'],
['关联账户（可选）','Akaun Berkaitan (Pilihan)'],['不关联账户（旧版模式）','Tanpa Akaun (Mod Lama)'],
['例如：停车费','Contoh: Bayaran parkir'],['例如：午餐','Contoh: Makan tengah hari'],
['例如：Maybank 储蓄账户','Contoh: Akaun Simpanan Maybank'],
['可选','Pilihan']
];
const translations=new Map(pairs);
const phrases=[...translations.entries()].sort((a,b)=>b[0].length-a[0].length);
function isMalay(){try{return JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}').lang==='ms'}catch{return false}}
function safeText(node){const p=node.parentElement;if(!p||p.closest('script,style,textarea,[contenteditable="true"]'))return false;return true}
function translateText(node){if(!safeText(node))return;let s=node.nodeValue;if(!s||!/[\u3400-\u9fff]/.test(s))return;let out=s;for(const [a,b] of phrases)if(out.includes(a))out=out.split(a).join(b);if(out!==s)node.nodeValue=out}
function run(){if(!isMalay())return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while((n=walker.nextNode()))translateText(n);
root.querySelectorAll('input[placeholder],textarea[placeholder],option').forEach(el=>{if(el.hasAttribute('placeholder')){let v=el.getAttribute('placeholder');for(const [a,b] of phrases)if(v.includes(a))v=v.split(a).join(b);if(v!==el.getAttribute('placeholder'))el.setAttribute('placeholder',v)}if(el.tagName==='OPTION'){for(const n of el.childNodes)if(n.nodeType===3)translateText(n)}})}
let scheduled=false;function queue(){if(scheduled)return;scheduled=true;setTimeout(()=>{scheduled=false;run()},120)}
run();new MutationObserver(queue).observe(root,{childList:true,subtree:true});document.addEventListener('change',queue);document.addEventListener('click',queue);
})();
