/* V7.4.4 English-only fixed-label cleanup. Does not touch stored finance data. */
(()=>{'use strict';
const en=()=>{try{const p=JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}');return /^en/i.test(p.lang||document.documentElement.lang||'')}catch(e){return /^en/i.test(document.documentElement.lang||'')}};
const exact=new Map([
['部分Repayment','Partially Repaid'],['部分还款','Partially Repaid'],['未还款','Unpaid'],['已还清','Fully Repaid'],
['欠款Amount (RM)','Amount Owed (RM)'],['借款Date','Loan Date'],['约定Repayment Date（Optional）','Expected Repayment Date (Optional)'],['约定Repayment Date (Optional)','Expected Repayment Date (Optional)'],
['同步增加Bank或CashAccount Balance（Optional）','Add to Bank or Cash Account Balance (Optional)'],['同步增加Bank或CashAccount Balance (Optional)','Add to Bank or Cash Account Balance (Optional)'],
['删除欠款','Delete Receivable'],['未同步账户','Not Synced to Account'],['修改','Edit'],['删除','Delete'],
['收款历史','Collection History'],['借款Date：','Loan Date:'],['约定Repayment：','Expected Repayment Date:'],['约定Repayment:','Expected Repayment Date:'],
['Save欠款记录','Save Receivable'],['Save欠款','Save Receivable'],['保存欠款记录','Save Receivable'],['Save Receivable记录','Save Receivable'],['AddExpense记录','Add Expense'],['AddIncome记录','Add Income']]);
const patterns=[
[/记录别人欠你的钱及分次收款。.*?(?:普通Income|普通收入)[。.]?/g,'Track money owed to you and record collections. Optionally credit a bank or cash account without counting it as regular income.'],
[/欠款Amount\s*\(RM\)/g,'Amount Owed (RM)'],
[/借款Date/g,'Loan Date'],[/约定\s*Repayment\s*Date/g,'Expected Repayment Date'],
[/约定\s*Repayment(?:\s*Date)?\s*[:：]/g,'Expected Repayment Date:'],
[/约定还款\s*[:：]/g,'Expected Repayment Date:'],
[/同步增加\s*Bank\s*或\s*Cash\s*Account\s*Balance/g,'Add to Bank or Cash Account Balance'],
[/部分\s*Repayment/g,'Partially Repaid'],[/删除欠款/g,'Delete Receivable'],
[/未同步账户/g,'Not Synced to Account'],
[/\b修改\b/g,'Edit'],[/\b删除\b/g,'Delete'],
[/借款日期\s*[:：]/g,'Loan Date:'],
[/收款历史（(\d+)\s*笔）/g,(_,n)=>`Collection History (${n})`],
];
const originals=new WeakMap();let pending=false;
function convert(s){const k=s.trim();if(exact.has(k))return s.replace(k,exact.get(k));let v=s;for(const [p,r] of patterns)v=v.replace(p,r);return v;}
function run(){pending=false;const english=en();const root=document.getElementById('receivables');if(!root)return;
const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
while((n=walker.nextNode())){const parent=n.parentElement;if(!parent||!n.nodeValue.trim()||parent.closest('script,style,textarea,input,option,[contenteditable]'))continue;
// Never alter user-provided borrower names, notes or account names.
if(parent.closest('.name')&&!parent.closest('.pill'))continue;
if(parent.closest('.sub')&&!/(借款|约定|Repayment|未同步账户|已同步账户|借出|已收|剩余|收款历史)/.test(n.nodeValue)&&!originals.has(n))continue;
if(english){const val=convert(n.nodeValue);if(val!==n.nodeValue){if(!originals.has(n))originals.set(n,n.nodeValue);n.nodeValue=val;}}
else if(originals.has(n)){n.nodeValue=originals.get(n);originals.delete(n);}
}}
function schedule(){if(!pending){pending=true;requestAnimationFrame(run)}}
function init(){schedule();document.addEventListener('click',schedule);document.addEventListener('change',schedule);const root=document.getElementById('receivables');if(root)new MutationObserver(records=>{if(records.some(r=>r.addedNodes.length||r.removedNodes.length))schedule()}).observe(root,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();