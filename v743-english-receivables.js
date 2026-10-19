/* V7.4.3: English text consistency in accounting and receivables. Display only. */
(()=>{'use strict';
const isEnglish=()=>{try{const p=JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}');return /^en/i.test(p.lang||document.documentElement.lang||'')}catch{return /^en/i.test(document.documentElement.lang||'')}};
const phrases=[
['AddExpense记录','Add Expense Record'],['AddIncome记录','Add Income Record'],['Add收入记录','Add Income Record'],['Add支出记录','Add Expense Record'],['新增支出记录','Add Expense Record'],['新增收入记录','Add Income Record'],
['收款总览','Collections Overview'],['记录别人欠你的钱及分次收款。收款可自行选择是否同步增加银行或现金余额；不会算作普通收入。','Track money owed to you and payments received. Optionally credit a bank or cash account; collections are not counted as ordinary income.'],
['新增欠款人 / 欠款记录','Add Receivable / Borrower'],['Add欠款人 / 欠款记录','Add Receivable / Borrower'],['Add欠款人 / 欠款记录','Add Receivable / Borrower'],['新增欠款人','Add Borrower'],['欠款人姓名','Borrower Name'],['欠款金额 (RM)','Amount Owed (RM)'],['借款日期','Loan Date'],['约定还款日期（可选）','Due Date (optional)'],['保存欠款记录','Save Receivable'],['记录收款','Record Collection'],['选择欠款记录','Select Receivable'],['收款金额 (RM)','Collection Amount (RM)'],['收款日期','Collection Date'],['同步增加银行或现金账户余额（可选）','Credit a bank or cash account (optional)'],['选择实际收款账户','Select Receiving Account'],['保存收款','Save Collection'],['欠款清单及收款历史','Receivables & Collection History'],
['原始欠款','Total Receivables'],['已收回','Collected'],['尚未收回','Outstanding'],['欠款记录','Receivables'],['请选择欠款人','Select a borrower'],['请选择账户','Select an account'],['部分还款','Partially Paid'],['未还款','Unpaid'],['已还清','Fully Paid'],['借出','Lent'],['已收','Collected'],['剩余','Remaining'],['借款日期：','Loan date: '],['约定还款：','Due date: '],['修改欠款','Edit Receivable'],['删除欠款','Delete Receivable'],['收款历史','Collection History'],['收起','Collapse'],['展开','Expand'],['暂无收款记录','No collections yet'],['暂无欠款记录','No receivables yet'],['已同步账户：','Credited to account: '],['已删除账户','Deleted account'],['未同步账户','Not credited to an account'],['修改','Edit'],['删除','Delete'],['备注','Notes'],['当前图标：','Current icon: '],['车贷','Car Loan']
];
const dictionary=new Map(phrases);
const textReplacements=[
[/^Add\s*Expense\s*记录$/i,'Add Expense Record'],[/^Add\s*Income\s*记录$/i,'Add Income Record'],
[/收款Overview/g,'Collections Overview'],[/收款记录/g,'Collections'],
[/\bAdd\s*欠款人\s*\/\s*欠款记录/g,'Add Receivable / Borrower'],
[/\bRecord\s*Collection/g,'Record Collection'],
[/\bBorrower\s*Name/g,'Borrower Name'],
[/\b欠款Amount\s*\(RM\)/g,'Amount Owed (RM)'],
[/\b借款Date/g,'Loan Date'],[/\b约定Repayment\s*Date\s*\(optional\)/g,'Due Date (optional)'],
[/\b收款Amount\s*\(RM\)/g,'Collection Amount (RM)'],
[/\b收款Date/g,'Collection Date'],
[/\b同步增加Bank或CashAccount\s*Balance\s*\(Optional\)/gi,'Credit a bank or cash account (optional)'],
[/\b保存欠款记录/g,'Save Receivable'],[/\b保存收款/g,'Save Collection'],
[/\b借出\s*(?=RM)/g,'Lent '],[/\b已收\s*(?=RM)/g,'Collected '],[/\b剩余\s*(?=RM)/g,'Remaining '],
[/借款日期：/g,'Loan date: '],[/约定还款：/g,'Due date: '],
[/已收回\s*(?=\d)/g,'Collected '],[/尚未收回\s*(?=\d)/g,'Outstanding '],
[/收款历史（(\d+)\s*笔）\s*·\s*(收起|展开)/g,(_,n,act)=>`Collection History (${n}) · ${act==='收起'?'Collapse':'Expand'}`],
[/已同步账户：/g,'Credited to account: '],[/未同步账户/g,'Not credited to an account'],
[/部分还款/g,'Partially Paid'],[/未还款/g,'Unpaid'],[/已还清/g,'Fully Paid'],
[/修改欠款/g,'Edit Receivable'],[/删除欠款/g,'Delete Receivable'],
[/暂无收款记录/g,'No collections yet'],[/暂无欠款记录/g,'No receivables yet'],
[/收款总览/g,'Collections Overview'],[/收款清单/g,'Collections List'],
[/新增欠款人/g,'Add Borrower'],[/欠款人姓名/g,'Borrower Name'],[/欠款金额/g,'Amount Owed'],
[/收款金额/g,'Collection Amount'],[/收款日期/g,'Collection Date'],
[/当前图标：/g,'Current icon: ']
];
const originals=new WeakMap();let pending=false;
function convert(s){let out=s;const t=s.trim();if(dictionary.has(t))return s.replace(t,dictionary.get(t));for(const [re,to] of textReplacements)out=out.replace(re,to);return out;}
function run(){pending=false;const en=isEnglish();const targets=document.querySelectorAll('#receivables, #txEntryWrap, .v736-page-head, .v736-action-panel');targets.forEach(root=>{
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode()){
  const el=node.parentElement;if(!el||el.closest('script,style,textarea,[contenteditable],input'))continue;
  // User-entered borrower names and notes must remain exactly as saved.
  if(el.closest('#v73List .name') && !el.closest('.pill'))continue;
  if(el.closest('#v73List .sub') && !el.closest('.v73-progress')){
    // Only translate fixed labels; preserve user notes and names.
    if(!/借出|已收|剩余|借款日期：|约定还款：|已同步账户：|未同步账户|暂无收款记录/.test(node.nodeValue))continue;
  }
  if(!node.nodeValue.trim())continue;
  if(en){const changed=convert(node.nodeValue);if(changed!==node.nodeValue){if(!originals.has(node))originals.set(node,node.nodeValue);node.nodeValue=changed;}}
  else if(originals.has(node)){node.nodeValue=originals.get(node);originals.delete(node)}
 }
 root.querySelectorAll('select option').forEach(option=>{if(option.value!=='')return;const value=option.textContent.trim();if(en){const newText=convert(value);if(newText!==value){if(!option.dataset.v743Original)option.dataset.v743Original=value;option.textContent=newText;}}else if(option.dataset.v743Original){option.textContent=option.dataset.v743Original;delete option.dataset.v743Original;}});
 });}
function schedule(){if(!pending){pending=true;requestAnimationFrame(run)}}
function init(){schedule();document.addEventListener('change',schedule);document.addEventListener('click',schedule);window.addEventListener('mymoney-v73-update',schedule);const el=document.getElementById('receivables');if(el)new MutationObserver(m=>{if(m.some(x=>x.addedNodes.length||x.removedNodes.length))schedule()}).observe(el,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
