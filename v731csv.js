/* MyMoney V7.3.0 TEST — selectable three-group CSV export. Read-only. */
(()=>{'use strict';
const $=id=>document.getElementById(id), api=window.mymoneyV73;
if(!api||!$('v731ExportSelected'))return;
const names={1:'mymoney-daily-transactions',2:'mymoney-debts-repayments',3:'mymoney-receivables-collections'};
const val=x=>String(x??'');
const amount=x=>Number.isFinite(Number(x))?Number(x).toFixed(2):'';
const acc=(d,id)=>d.accounts?.find(a=>a.id===id)?.name||'';
const debt=(d,id)=>d.debts?.find(a=>a.id===id)?.name||'';
const borrower=(d,id)=>d.receivables?.find(a=>a.id===id)?.name||'';
function getDates(){const start=$('v731Start').value,end=$('v731End').value;if(!start||!end||start>end){alert('请选择有效日期范围：开始日期不能晚于结束日期。');return null}return {start,end}}
function safeCell(x){let s=val(x);if(/^[\s\u0000-\u001f]*[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
function build(group,d,dates){const cols=['记录类型','日期','名称／对象','金额(MYR)','类别／说明','来源账户','目标／收款账户','本金(MYR)','利息(MYR)','备注','记录编号'];const records=[];
const add=(type,date,name,sum,category,from,to,principal,interest,note,id)=>{if(typeof date!=='string'||date<dates.start||date>dates.end)return;records.push([type,date,name,amount(sum),category,from,to,principal==null?'':amount(principal),interest==null?'':amount(interest),note,id])};
if(group===1){
(d.transactions||[]).forEach(x=>add(x.type==='income'?'收入记录':'支出记录',x.date,x.category,x.amount,x.category,x.payment||'',acc(d,x.accountId),'','',x.note,x.id));
(d.transfers||[]).forEach(x=>add('内部转账记录',x.date,'账户转账',x.amount,'内部转账',acc(d,x.from),acc(d,x.to),'','',x.note,x.id));
}else if(group===2){
(d.debts||[]).forEach(x=>add('负债记录',x.date,x.name,x.original,x.type||'', '', '', '', '',x.note,x.id));
(d.payments||[]).forEach(x=>add('负债还款记录',x.date,debt(d,x.debtId),x.amount,'负债还款',acc(d,x.accountId),'',x.principal,x.interest,x.note,x.id));
}else{
(d.receivables||[]).forEach(x=>add('欠款人记录',x.date,x.name,x.amount,x.due?'约定还款日：'+x.due:'欠款记录','','','','',x.note,x.id));
(d.receivablePayments||[]).forEach(x=>add('收款记录',x.date,borrower(d,x.receivableId),x.amount,'欠款收回','',acc(d,x.accountId)||'未同步账户','','',x.note,x.id));
}
records.sort((a,b)=>a[1].localeCompare(b[1])||a[0].localeCompare(b[0]));
return [cols,...records].map(r=>r.map(safeCell).join(',')).join('\r\n');
}
function download(filename,content){const blob=new Blob(['\ufeff',content],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000)}
function exportGroups(groups){const dates=getDates();if(!dates)return;if(!groups.length){alert('请至少勾选一个导出组别。');return}const d=api.getData();for(const n of groups){download(names[n]+'-'+dates.start+'_'+dates.end+'.csv',build(n,d,dates))}$('v731CsvStatus').textContent='已发起 '+groups.length+' 个 CSV 下载。如浏览器阻止多文件下载，请使用下方的单组导出按钮。'}
$('v731ExportSelected').addEventListener('click',()=>exportGroups([1,2,3].filter(n=>$('v731Group'+n).checked)));
for(const n of [1,2,3])$('v731Export'+n).addEventListener('click',()=>exportGroups([n]));
})();
