/* V7.1.11: scoped Malay UI translations for Records only; never modifies stored ledger data. */
(()=>{'use strict';
const root=document.getElementById('transactions');if(!root)return;
const dict=new Map(Object.entries({
'新增记录':'Tambah Rekod','转账仅移动账户余额，不计入收入或支出。':'Pindahan hanya memindahkan baki antara akaun dan tidak dikira sebagai pendapatan atau perbelanjaan.',
'转账仅在账户之间移动余额，不计入收入或支出。手续费请另外记为支出并选择付款账户。':'Pindahan hanya memindahkan baki antara akaun dan tidak dikira sebagai pendapatan atau perbelanjaan. Rekodkan caj pemindahan sebagai perbelanjaan berasingan.',
'自定义收支类别与图标':'Sesuaikan Kategori & Ikon','原有类别继续保留。你可以新增自己的收入／支出类别并选择图标，删除类别不会删除旧交易。':'Kategori sedia ada dikekalkan. Anda boleh menambah kategori pendapatan atau perbelanjaan serta memilih ikon. Memadam kategori tidak memadam transaksi lama.',
'类别类型':'Jenis Kategori','类别名称':'Nama Kategori','选择图标':'Pilih Ikon','选择品牌图标（银行／电子钱包／购物等）':'Pilih Ikon Jenama (Bank / E-dompet / Beli-belah)','上传自己的图标':'Muat Naik Ikon Sendiri','恢复默认图标':'Pulihkan Ikon Lalai','新增类别':'Tambah Kategori','当前图标：':'Ikon Semasa: ',
'新增收支记录':'Tambah Pendapatan / Perbelanjaan','新增收入 / 支出':'Tambah Pendapatan / Perbelanjaan','类型':'Jenis','日期':'Tarikh','金额（RM）':'Amaun (RM)','类别':'Kategori','关联账户（可选）':'Akaun Berkaitan (Pilihan)','付款方式':'Kaedah Pembayaran','备注（可选）':'Nota (Pilihan)','保存记录':'Simpan Rekod','取消编辑':'Batal Suntingan',
'交易记录':'Sejarah Transaksi','月份筛选':'Tapis Mengikut Bulan','类型筛选':'Tapis Mengikut Jenis','全部':'Semua','收入':'Pendapatan','支出':'Perbelanjaan','不关联账户（旧版模式）':'Tanpa Akaun (Mod Lama)',
'现金':'Tunai','银行卡':'Kad Bank','信用卡':'Kad Kredit','银行转账':'Pindahan Bank','电子钱包':'E-dompet','其他':'Lain-lain',
'账户与余额':'Akaun & Baki','账户与余额管理':'Akaun & Baki','新增／编辑账户':'Tambah / Edit Akaun','新增 / 编辑账户':'Tambah / Edit Akaun','账户名称':'Nama Akaun','账户类型':'Jenis Akaun','初始余额（RM）':'Baki Permulaan (RM)','账户图标':'Ikon Akaun','默认图标':'Ikon Lalai','保存账户':'Simpan Akaun','账户余额':'Baki Akaun','账户总余额（不扣除负债）':'Jumlah Baki Akaun (Tidak Termasuk Hutang)','初始余额：':'Baki Permulaan: ','全部账户余额':'Jumlah Baki Semua Akaun','转账记录':'Sejarah Pindahan','暂无转账':'Tiada Pindahan','暂无账户':'Tiada Akaun','暂无交易':'Tiada Transaksi','暂无符合条件的交易':'Tiada Transaksi Yang Sepadan','删除转账':'Padam Pindahan',
'编辑':'Edit','删除':'Padam','取消':'Batal','银行':'Bank','储蓄':'Simpanan','电子钱包':'E-dompet','未分类':'Tidak Dikategorikan',
'转账':'Pindahan','转出账户':'Akaun Pengirim','转入账户':'Akaun Penerima','转账金额（RM）':'Amaun Pindahan (RM)','保存转账':'Simpan Pindahan','请选择账户':'Sila Pilih Akaun','暂无转账记录':'Tiada Rekod Pindahan',
'还没有自定义类别':'Belum Ada Kategori Tersuai','恢复默认':'Pulihkan Lalai','使用默认图标':'Guna Ikon Lalai','选择品牌图标':'Pilih Ikon Jenama',
'快捷记收入':'Rekod Pendapatan Pantas','快捷记支出':'Rekod Perbelanjaan Pantas','搜索分类、备注、金额或日期':'Cari kategori, nota, amaun atau tarikh','搜索分类、备注、金额或日期':'Cari kategori, nota, amaun atau tarikh',
'在这里新增银行、现金及E-dompet账户。每笔收入、支出或转账都可选择对应账户。':'Tambah akaun bank, tunai dan e-dompet di sini. Setiap transaksi boleh dipautkan kepada akaun yang berkaitan.',
'首次建立账户时填当前实际余额。以前的收支记录不会自动归属到新账户，避免重复计算。日后可在收支记录中选择账户。':'Masukkan baki sebenar semasa membuka akaun. Transaksi lama tidak akan dipautkan secara automatik untuk mengelakkan pengiraan berganda. Anda boleh memilih akaun bagi transaksi baharu.',
'暂无转账':'Tiada Pindahan','无转账记录':'Tiada Rekod Pindahan','暂无转账记录':'Tiada Rekod Pindahan'
}));
const partial=[['转账只移动','Pindahan hanya memindahkan'],['不计入收入或支出','tidak dikira sebagai pendapatan atau perbelanjaan'],['选择图标','Pilih Ikon'],['当前图标：','Ikon Semasa: ']];
const placeholders={'例如：停车费':'Contoh: Bayaran parkir','例如：午餐':'Contoh: Makan tengah hari','例如：Maybank 储蓄账户':'Contoh: Akaun Simpanan Maybank','可选':'Pilihan','不关联账户（旧版模式）':'Tanpa Akaun (Mod Lama)'};
function lang(){try{return JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}').lang==='ms'}catch{return false}}
const staticSelectors='h2,h3,summary,label,button,.hint,.pill,.empty,option,.sub,.metric span,.field > p,.v58-muted';
function replaceText(node,allowPartial=false){const s=node.nodeValue;if(!s||!s.trim())return;const trimmed=s.trim();let out=dict.get(trimmed);if(!out&&allowPartial){out=s;for(const [a,b] of partial)out=out.replaceAll(a,b);if(out===s)out=null;}if(out!=null&&out!==s){node.nodeValue=out===dict.get(trimmed)?s.replace(trimmed,out):out;}}
function translateElement(el,partial=false){for(const n of el.childNodes){if(n.nodeType===3)replaceText(n,partial)}}
let running=false;function run(){if(running||!lang())return;running=true;try{
 root.querySelectorAll(staticSelectors).forEach(el=>translateElement(el,true));
 root.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{const v=el.getAttribute('placeholder');if(placeholders[v])el.setAttribute('placeholder',placeholders[v])});
 for(const id of ['txList','accountList','accountTotals','transferList','customCategories']){const host=document.getElementById(id);if(!host)continue;const walker=document.createTreeWalker(host,NodeFilter.SHOW_TEXT);let n;while(n=walker.nextNode()){const s=n.nodeValue; if(!s)continue;let out=s;for(const [a,b] of [['初始余额：','Baki Permulaan: '],['账户总余额（不扣除负债）','Jumlah Baki Akaun (Tidak Termasuk Hutang)'],['暂无转账','Tiada Pindahan'],['暂无账户','Tiada Akaun'],['暂无符合条件的交易','Tiada Transaksi Yang Sepadan'],['暂无交易','Tiada Transaksi']])out=out.replaceAll(a,b);const t=out.trim();if(dict.has(t))out=out.replace(t,dict.get(t));if(out!==s)n.nodeValue=out;}}
}finally{running=false}}
let queued=false;function schedule(){if(queued)return;queued=true;setTimeout(()=>{queued=false;run()},80)}
run();new MutationObserver(schedule).observe(root,{subtree:true,childList:true});document.addEventListener('change',schedule);document.addEventListener('click',schedule);
})();
