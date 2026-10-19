/* V7.4.3: English-only UI completion. No changes to finance data or storage. */
(()=>{'use strict';
const isEn=()=>{try{const p=JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}');return /^en/i.test(p.lang||document.documentElement.lang||'')}catch{return /^en/i.test(document.documentElement.lang||'')}};
const dict={
'新增支出记录':'Add Expense','新增收入记录':'Add Income','新增收支记录':'Add Transaction','编辑支出记录':'Edit Expense','编辑收入记录':'Edit Income','AddExpense记录':'Add Expense','AddIncome记录':'Add Income',
'收款Overview':'Collections Overview','收款总览':'Collections Overview','欠款人记录':'Receivables','新增欠款人 / 欠款记录':'Add Receivable','Add欠款人 / 欠款记录':'Add Receivable','欠款人姓名':'Borrower Name','欠款金额 (RM)':'Amount Owed (RM)','借款日期':'Loan Date','约定还款日期（可选）':'Due Date (optional)','保存欠款记录':'Save Receivable',
'记录收款':'Record Collection','选择欠款记录':'Select Receivable','请选择欠款人':'Select a borrower','请选择账户':'Select an account','收款金额 (RM)':'Amount Collected (RM)','收款日期':'Collection Date','同步增加银行或现金账户余额（可选）':'Also credit bank or cash account (optional)','选择实际收款账户':'Select Receiving Account','保存收款':'Save Collection','欠款清单及收款历史':'Receivables & Collection History',
'原始欠款':'Original Amount','已收回':'Collected','尚未收回':'Outstanding','欠款记录':'Receivables','未还款':'Unpaid','部分还款':'Partially Paid','已还清':'Fully Paid','修改欠款':'Edit Receivable','删除欠款':'Delete Receivable','暂无欠款记录':'No receivables yet','暂无收款记录':'No collections yet','收款历史':'Collection History','展开':'Expand','收起':'Collapse','修改':'Edit','删除':'Delete','已同步账户':'Credited to account','未同步账户':'Not credited to an account','已删除账户':'Deleted account',
'当前图标':'Current Icon','当前图标：':'Current Icon:','车贷':'Car Loan','汽车贷款':'Car Loan',
'统一管理Income、 Expense、账户Transfer与账户资料':'Manage income, expenses, transfers and accounts',
'FINANCE OPERATIONS / Records管理':'FINANCE OPERATIONS / RECORDS MANAGEMENT'
};
const rules=[
[/\bAdd\s*Expense\s*记录\b/g,'Add Expense'],[/\bAdd\s*Income\s*记录\b/g,'Add Income'],[/收款Overview/g,'Collections Overview'],
[/FINANCE OPERATIONS\s*\/\s*Records管理/g,'FINANCE OPERATIONS / RECORDS MANAGEMENT'],
[/统一管理\s*Income[、,，]\s*Expense[、,，]\s*账户\s*Transfer\s*与账户资料/g,'Manage income, expenses, transfers and accounts'],
[/填写\s*Expense\s*Amount[、,，]\s*Date\s*及\s*Category[，,]\s*Save\s*后会记录为\s*Expense[。.]?/g,'Enter the expense amount, date and category, then save.'],
[/填写\s*Income\s*Amount[、,，]\s*Date\s*及\s*Category[，,]\s*Save\s*后会记录为\s*Income[。.]?/g,'Enter the income amount, date and category, then save.'],
[/收款历史（(\d+)\s*笔）\s*·\s*(展开|收起)/g,(_,n,state)=>`Collection History (${n}) · ${state==='展开'?'Expand':'Collapse'}`],
[/借出\s*(?=RM)/g,'Lent '],[/已收\s*(?=RM)/g,'Collected '],[/剩余\s*(?=RM)/g,'Outstanding '],
[/已收回\s*(?=\d+(?:\.\d+)?%)/g,'Collected '],[/尚未收回\s*(?=\d+(?:\.\d+)?%)/g,'Outstanding '],
[/借款日期：/g,'Loan Date: '],[/约定还款：/g,'Expected Repayment Date: '],[/已同步账户：/g,'Credited to account: '],
[/\b(\d+)\s*笔\b/g,'$1 entries']
];
const originals=new WeakMap();let queued=false;
function change(s){const trimmed=s.trim();if(dict[trimmed])return s.replace(trimmed,dict[trimmed]);let out=s;for(const [re,v] of rules)out=out.replace(re,v);return out;}
function run(){queued=false;const en=isEn();const scopes=['#transactions .v736-page-head','#transactions .v736-action-panel','#txEntryWrap','#receivables .box','#receivables .cards','#receivables #v73Summary','#receivables #v73List','#receivables #v73DebtForm','#receivables #v73PaymentForm','#receivables #v73Choose','#receivables #v73Account'];
for(const selector of scopes){document.querySelectorAll(selector).forEach(root=>{
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
 while((node=walker.nextNode())){const parent=node.parentElement;if(!parent||parent.closest('script,style,textarea,[contenteditable],.name')||!node.nodeValue.trim())continue;
 // Avoid changing user-entered names, notes, and financial amounts.
 if(parent.closest('#v73List') && (parent.matches('.sub')||parent.closest('.sub')) && !/(借出|已收|剩余|借款日期|约定还款|同步账户|收款历史|尚未收回)/.test(node.nodeValue))continue;
 if(en){const next=change(node.nodeValue);if(next!==node.nodeValue){if(!originals.has(node))originals.set(node,node.nodeValue);node.nodeValue=next;}}
 else if(originals.has(node)){node.nodeValue=originals.get(node);originals.delete(node)}
 }
 if(en)root.querySelectorAll('option').forEach(opt=>{if(opt.value===''&&dict[opt.textContent.trim()])opt.textContent=dict[opt.textContent.trim()]});
});}
}
function schedule(){if(!queued){queued=true;requestAnimationFrame(run)}}
function init(){schedule();document.addEventListener('click',schedule);document.addEventListener('change',schedule);const area=document.querySelector('main')||document.body;new MutationObserver(records=>{if(records.some(r=>r.addedNodes.length))schedule()}).observe(area,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
