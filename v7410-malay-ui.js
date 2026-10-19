/* MyMoney NEXT V7.4.12 TEST — Malay UI presentation translations only.
   No writes to localStorage or finance data. */
(()=>{'use strict';
const isMs=()=>{try{const p=JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}');return /^ms/i.test(p.lang||document.documentElement.lang||'')}catch{return /^ms/i.test(document.documentElement.lang||'')}};
const words={
'FINANCE OPERATIONS / 记账管理':'OPERASI KEWANGAN / PENGURUSAN TRANSAKSI',
'FINANCE OPERATIONS / Records管理':'OPERASI KEWANGAN / PENGURUSAN TRANSAKSI',
'交易与账户管理':'Pengurusan Transaksi & Akaun',
'统一管理收入、支出、账户转账与账户资料':'Urus pendapatan, perbelanjaan, pindahan dan maklumat akaun',
'统一管理Income、Expense、账户Transfer与账户资料':'Urus pendapatan, perbelanjaan, pindahan dan maklumat akaun',
'新增记录':'Tambah Transaksi','选择操作类型':'Pilih Jenis Transaksi',
'＋ 收入':'+ Pendapatan','－ 支出':'− Perbelanjaan','⇄ 内部转账':'⇄ Pindahan Dalaman',
'▣ 新增 / 编辑账户':'Tambah / Edit Akaun','新增 / 编辑账户':'Tambah / Edit Akaun',
'Tambah Pendapatan记录':'Tambah Rekod Pendapatan','Tambah Pendapatan記錄':'Tambah Rekod Pendapatan','新增收入记录':'Tambah Rekod Pendapatan','新增收支记录':'Tambah Transaksi','新增收入记录':'Tambah Pendapatan','新增支出记录':'Tambah Rekod Perbelanjaan','Tambah Perbelanjaan记录':'Tambah Rekod Perbelanjaan','Tambah Perbelanjaan記錄':'Tambah Rekod Perbelanjaan',
'编辑收入记录':'Edit Pendapatan','编辑支出记录':'Edit Perbelanjaan','编辑收支记录':'Edit Rekod Transaksi',
'转账日期':'Tarikh Pindahan','例如：Maybank 转入 TNG':'Contoh: Pindahan dari Maybank ke TNG','转账仅在账户之间移动余额，不计入收入或支出。手续费请另外记为支出并选择付款账户。':'Pindahan hanya memindahkan baki antara akaun dan tidak dikira sebagai pendapatan atau perbelanjaan. Jika terdapat caj transaksi, rekodkan caj tersebut secara berasingan sebagai perbelanjaan dan pilih akaun pembayaran.','填写账户名称、类别及初始余额后保存；也可选择下方已有账户进行编辑。':'Masukkan nama akaun, kategori dan baki awal, kemudian simpan. Anda juga boleh memilih akaun sedia ada di bawah untuk mengeditnya.','新增内部转账':'Pindahan Dalaman Baharu','新增转账':'Pindahan Baharu',
'填写收入金额、日期及类别，保存后会记录为收入。':'Masukkan amaun, tarikh dan kategori pendapatan, kemudian simpan.',
'填写支出金额、日期及类别，保存后会记录为支出。':'Masukkan amaun, tarikh dan kategori perbelanjaan, kemudian simpan.',
'转账只移动账户余额，不计入收入或支出。':'Pindahan hanya memindahkan baki antara akaun dan tidak dikira sebagai pendapatan atau perbelanjaan.',
'首页':'Laman Utama','记账':'Transaksi','负债':'Hutang','收款记录':'Kutipan','预算':'Bajet',
'账单与提醒':'Bil & Peringatan','报表':'Laporan','设置与备份':'Tetapan & Sandaran',
'车贷':'Pinjaman Kereta','汽车贷款':'Pinjaman Kereta','房贷':'Pinjaman Perumahan','房屋贷款':'Pinjaman Perumahan',
'信用卡':'Kad Kredit','个人借款':'Pinjaman Peribadi','个人贷款':'Pinjaman Peribadi',
'收入':'Pendapatan','支出':'Perbelanjaan','内部转账':'Pindahan Dalaman',
'请选择账户':'Sila pilih akaun','选择账户':'Pilih Akaun','转出账户':'Akaun Asal','转入账户':'Akaun Penerima',
'日期':'Tarikh','金额（RM）':'Amaun (RM)','金额 (RM)':'Amaun (RM)','类别':'Kategori','类型':'Jenis',
'付款方式':'Kaedah Pembayaran','备注（可选）':'Nota (pilihan)','保存记录':'Simpan Transaksi',
'保存收入':'Simpan Pendapatan','保存支出':'Simpan Perbelanjaan','保存转账':'Simpan Pindahan',
'取消编辑':'Batal Edit','取消':'Batal','保存':'Simpan','删除':'Padam','修改':'Edit','编辑':'Edit',
'现金':'Tunai','银行转账':'Pindahan Bank','银行卡':'Kad Bank','电子钱包':'E-Dompet','其他':'Lain-lain',
'选择图标':'Pilih Ikon','当前图标：':'Ikon semasa:','当前图标':'Ikon semasa',
'收款总览':'Ringkasan Kutipan','收款Overview':'Ringkasan Kutipan',
'记录别人欠你的钱及分次收款。收款可自行选择是否同步增加银行或现金账户余额；不会算作普通收入。':'Rekod wang yang dipinjamkan dan kutipan secara ansuran. Anda boleh memilih untuk menambah baki akaun bank atau tunai tanpa mengiranya sebagai pendapatan biasa.',
'新增欠款人 / 欠款记录':'Tambah Penghutang / Rekod Hutang','新增欠款记录':'Tambah Rekod Hutang',
'欠款人姓名':'Nama Penghutang','欠款金额 (RM)':'Amaun Terhutang (RM)','欠款Amount (RM)':'Amaun Terhutang (RM)',
'借款日期':'Tarikh Pinjaman','借款Date':'Tarikh Pinjaman','约定还款日期（可选）':'Tarikh Bayaran Balik Dijangka (pilihan)',
'约定Repayment Date（Optional）':'Tarikh Bayaran Balik yang Dijangka (Pilihan)','约定Tarikh Bayaran Balik（可选）':'Tarikh Bayaran Balik yang Dijangka (Pilihan)','约定Tarikh Bayaran Balik (可选)':'Tarikh Bayaran Balik yang Dijangka (Pilihan)',
'保存欠款记录':'Simpan Rekod Hutang','Save欠款记录':'Simpan Rekod Hutang',
'记录收款':'Rekod Kutipan','选择欠款记录':'Pilih Rekod Hutang','请选择欠款人':'Sila pilih penghutang',
'收款金额 (RM)':'Amaun Kutipan (RM)','收款Amount (RM)':'Amaun Kutipan (RM)',
'收款日期':'Tarikh Kutipan','收款Date':'Tarikh Kutipan',
'同步增加银行或现金账户余额（可选）':'Tambah baki akaun bank atau tunai (pilihan)',
'同步增加银行或现金Baki Akaun（可选）':'Tambah ke Baki Akaun Bank atau Tunai (Pilihan)',
'同步增加银行或现金Baki Akaun (可选)':'Tambah ke Baki Akaun Bank atau Tunai (Pilihan)',
'同步增加Bank或CashAccount Balance（Optional）':'Tambah baki akaun bank atau tunai (pilihan)',
'保存收款':'Simpan Kutipan','Save收款':'Simpan Kutipan',
'欠款清单及收款历史':'Senarai Penghutang & Sejarah Kutipan',
'原始欠款':'Jumlah Pinjaman','已收回':'Telah Dikutip','尚未收回':'Belum Dikutip',
'欠款记录':'Rekod Hutang','已还清':'Selesai Dibayar','部分还款':'Bayaran Sebahagian',
'未还款':'Belum Dibayar','删除欠款':'Padam Rekod Hutang','Delete欠款':'Padam Rekod Hutang',
'修改欠款':'Edit Rekod Hutang','收款历史':'Sejarah Kutipan','收起':'Tutup','展开':'Buka',
'暂无收款记录':'Tiada rekod kutipan','暂无欠款记录':'Tiada rekod hutang',
'未同步账户':'Tidak Diselaraskan ke Akaun','已删除账户':'Akaun Telah Dipadam',
'收款进度':'Kemajuan Kutipan','已收':'Telah Diterima','已收回':'Telah Dikutip','借款日期：':'Tarikh Pinjaman: ',
'约定还款：':'Tarikh Bayaran Balik Dijangka: ',
'借款Date:':'Tarikh Pinjaman:','约定Repayment:':'Tarikh Bayaran Balik Dijangka:',
'记录日期':'Tarikh Rekod','负债管理':'Pengurusan Hutang','负债名称':'Nama Hutang',
'负债类别':'Kategori Hutang','新增负债':'Tambah Hutang','保存负债':'Simpan Hutang',
'负债清单':'Senarai Hutang','新增还款记录':'Tambah Rekod Bayaran Balik',
'还款日期':'Tarikh Bayaran Balik','还款金额（RM）':'Amaun Bayaran Balik (RM)',
'保存还款':'Simpan Bayaran Balik','预算管理':'Pengurusan Bajet',
'全部日期':'Semua Tarikh','开始日期':'Tarikh Mula','结束日期':'Tarikh Tamat',
'自定义 CSV 导出（三组）':'Eksport CSV Tersuai (3 Kumpulan)',
'导出选中的组别':'Eksport Kumpulan Dipilih',
'仅导出第 1 组':'Eksport Kumpulan 1 Sahaja','仅导出第 2 组':'Eksport Kumpulan 2 Sahaja','仅导出第 3 组':'Eksport Kumpulan 3 Sahaja'
};
const segments=[
[/^Tambah\s+Pendapatan\s*(?:记录|記錄)/g,'Tambah Rekod Pendapatan'],
[/^Tambah\s+Perbelanjaan\s*(?:记录|記錄)/g,'Tambah Rekod Perbelanjaan'],
[/^转账日期$/g,'Tarikh Pindahan'],
[/^例如[:：]\s*Maybank\s*转入\s*TNG$/g,'Contoh: Pindahan dari Maybank ke TNG'],
[/^转账仅在账户之间移动余额.*手续费请另外记为支出并选择(?:付款账户|Akaun Pembayaran)。$/g,'Pindahan hanya memindahkan baki antara akaun dan tidak dikira sebagai pendapatan atau perbelanjaan. Jika terdapat caj transaksi, rekodkan caj tersebut secara berasingan sebagai perbelanjaan dan pilih akaun pembayaran.'],
[/^填写(?:Nama Akaun|账户名称)[、，]类别及初始余额后保存；也(?:Pilih|可选择)下方已有账户进行编辑。$/g,'Masukkan nama akaun, kategori dan baki awal, kemudian simpan. Anda juga boleh memilih akaun sedia ada di bawah untuk mengeditnya.'],
[/^填写Nama Akaun、类别及初始余额后保存；也Pilih下方已有账户进行编辑。$/g,'Masukkan nama akaun, kategori dan baki awal, kemudian simpan. Anda juga boleh memilih akaun sedia ada di bawah untuk mengeditnya.'],

[/已收(?=\s*RM\s*[\d,])/g,'Diterima'], // Inline collection amount after separator
[/^Tambah\s+Perbelanjaan\s*(?:记录|記錄)/g,'Tambah Rekod Perbelanjaan'],[/^约定\s*Tarikh Bayaran Balik\s*[（(]可选[）)]/g,'Tarikh Bayaran Balik yang Dijangka (Pilihan)'],[/^已收\s*$/g,'Telah Diterima'],[/·\s*已收\s*$/g,'· Telah Diterima'],[/^借出\s*/g,'Dipinjamkan '],[/^已收\s+(?=RM|\d)/g,'Telah Diterima '],[/^Dikutip\s*回\s*/g,'Telah Dikutip '],[/^Dikutip\s*回/g,'Telah Dikutip'],[/^剩余\s*/g,'Baki '],
[/^已收回\s*/g,'Dikutip '],[/^尚未收回\s*/g,'Belum Dikutip '],
[/借款日期：/g,'Tarikh Pinjaman: '],[/约定还款：/g,'Tarikh Bayaran Balik Dijangka: '],
[/约定Repayment:/g,'Tarikh Bayaran Balik Dijangka:'],
[/收款历史（(\d+) 笔）/g,'Sejarah Kutipan ($1 rekod)'],
[/Sejarah Kutipan\s*\((\d+)\s*rekod\)\s*[·・]\s*展开/g,'Sejarah Kutipan ($1 rekod) · Kembangkan'],
[/Sejarah Kutipan\s*\((\d+)\s*rekod\)\s*[·・]\s*收起/g,'Sejarah Kutipan ($1 rekod) · Runtuhkan'],
[/收款历史\s*\((\d+)\s*(?:笔|rekod)\)\s*[·・]\s*展开/g,'Sejarah Kutipan ($1 rekod) · Kembangkan'],
[/收款历史\s*\((\d+)\s*(?:笔|rekod)\)\s*[·・]\s*收起/g,'Sejarah Kutipan ($1 rekod) · Runtuhkan'],
[/\bDikutip\s*回\s*(\d+(?:\.\d+)?%)/g,'Telah Dikutip $1'],
[/同步增加银行或现金(?:Baki Akaun|账户余额)(?:\s*（可选）|\s*\(可选\))?/g,'Tambah ke Baki Akaun Bank atau Tunai (Pilihan)'],
[/^编辑收支记录$/g,'Edit Rekod Transaksi'],
[/记录别人欠你的钱及分次收款。.*不会算作普通收入。/g,'Rekod wang yang dipinjamkan dan kutipan secara ansuran. Anda boleh memilih untuk menambah baki akaun bank atau tunai tanpa mengiranya sebagai pendapatan biasa.'],
[/^已收\s*$/g,'Telah Diterima'],[/^展开$/g,'Kembangkan'],[/^收起$/g,'Runtuhkan'],
[/已同步账户：/g,'Diselaraskan ke akaun: '],[/未同步账户/g,'Tidak Diselaraskan ke Akaun'],
[/部分Repayment/g,'Bayaran Sebahagian'],[/删除欠款/g,'Padam Rekod Hutang'],
[/收款Amount/g,'Amaun Kutipan'],[/收款Date/g,'Tarikh Kutipan'],
[/欠款Amount/g,'Amaun Terhutang'],[/借款Date/g,'Tarikh Pinjaman'],
[/约定Repayment Date/g,'Tarikh Bayaran Balik Dijangka'],
[/Save收款/g,'Simpan Kutipan'],[/Save欠款记录/g,'Simpan Rekod Hutang'],
[/同步增加Bank或CashAccount Balance/g,'Tambah baki akaun bank atau tunai'],
[/Records管理/g,'Pengurusan Rekod'],[/账户Transfer/g,'pindahan akaun']
];
function translate(s){const t=s.trim();if(!t)return s;let v=words[t];if(v===undefined){v=t;for(const [re,to] of segments)v=v.replace(re,to);if(v===t)return s;}return s.replace(t,v)}
function scan(root){if(!isMs())return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){const p=n.parentElement;if(!p||p.closest('script,style,textarea,pre,code,[contenteditable],#transactionList,#accountList'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT}});const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);for(const n of nodes){const updated=translate(n.nodeValue);if(updated!==n.nodeValue)n.nodeValue=updated;}
// Only translate literal placeholders / accessibility labels, never values or user-entered data.
for(const el of root.querySelectorAll?.('[placeholder],[aria-label]')||[]){for(const attr of ['placeholder','aria-label']){const old=el.getAttribute(attr);if(old){const translated=translate(old);if(translated!==old)el.setAttribute(attr,translated);}}}
}
let pending=false;function schedule(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;scan(document.body)})}
function init(){schedule();document.addEventListener('change',schedule);document.addEventListener('click',schedule);const obs=new MutationObserver(ms=>{if(!isMs())return;if(ms.some(m=>m.addedNodes.length || m.type==='characterData'))schedule()});obs.observe(document.body,{subtree:true,childList:true,characterData:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
