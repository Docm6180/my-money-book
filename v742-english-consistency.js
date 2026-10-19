/* V7.4.2 English consistency patch. Presentation only; never reads/writes financial records. */
(()=>{'use strict';
const exact={
'FINANCE OPERATIONS / Records管理':'FINANCE OPERATIONS / RECORDS MANAGEMENT',
'FINANCE OPERATIONS / 记账管理':'FINANCE OPERATIONS / RECORDS MANAGEMENT',
'统一管理Income、Expense、账户Transfer与账户资料':'Manage income, expenses, transfers and accounts',
'统一管理Income、 Expense、账户Transfer与账户资料':'Manage income, expenses, transfers and accounts',
'统一管理收入、支出、账户转账与账户资料':'Manage income, expenses, transfers and accounts',
'填写ExpenseAmount、 Date及Category， Save后会记录为Expense。':'Enter the expense amount, date and category, then save it as an expense.',
'填写IncomeAmount、 Date及Category， Save后会记录为Income。':'Enter the income amount, date and category, then save it as income.',
'填写支出金额、日期及类别，保存后会记录为支出。':'Enter the expense amount, date and category, then save it as an expense.',
'填写收入金额、日期及类别，保存后会记录为收入。':'Enter the income amount, date and category, then save it as income.',
'当前图标：':'Current icon: ', '当前图标:':'Current icon: ',
'车贷':'Car Loan','汽车贷款':'Car Loan','房贷':'Home Loan','房屋贷款':'Home Loan',
'记录管理':'Records Management','管理':'Management',
'请选择账户':'Select an account',
'账户资料':'account details',
'选择品牌图标（银行／电子钱包／购物等）':'Choose Brand Icon (Bank / E-Wallet / Shopping)',
'选择品牌图标（银行/电子钱包/购物等）':'Choose Brand Icon (Bank / E-Wallet / Shopping)',
'选择品牌图标':'Choose Brand Icon','当前图标':'Current icon',
'选择图标':'Choose Icon','恢复默认图标':'Restore Default Icon',
'上传自己的图标':'Upload Custom Icon',
'类别类型':'Category Type','类别名称':'Category Name',
'自定义收支类别与图标':'Custom Income & Expense Categories and Icons',
'新增类别':'Add Category',
'账户总余额（不扣除负债）':'Total Account Balance (Before Debts)',
'初始余额：':'Opening balance: ',
'已使用':'Spent', '预算':'Budget',
'收入记录':'Income Records','支出记录':'Expense Records',
'内部转账':'Internal Transfer',
'新增记录':'New Entry',
'负债与还款记录':'Debts & Repayments',
'收款记录':'Collections'
};
const isEnglish=()=>{try{const p=JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}');return /^en/i.test(p.lang||document.documentElement.lang||'')}catch{return /^en/i.test(document.documentElement.lang||'')}};
const areas='nav.tabs, .v740-sidebar, .v736-page-head, .v736-action-panel, #txEntryWrap, #transferEntryWrap, #accountsEmbedded, #categoryDetails, #budget, #debts, #receivables, #backup, #analytics';
const originals=new WeakMap();
const substitutions=[
[/FINANCE OPERATIONS\s*\/\s*(?:Records管理|记账管理)/g,'FINANCE OPERATIONS / RECORDS MANAGEMENT'],
[/统一管理\s*(?:Income|收入)\s*[、,，]\s*(?:Expense|支出)\s*[、,，]\s*账户\s*(?:Transfer|转账)\s*与账户资料/g,'Manage income, expenses, transfers and accounts'],
[/填写\s*(?:Expense|支出)\s*(?:Amount|金额)\s*[、,，]\s*(?:Date|日期)\s*(?:及|and)\s*(?:Category|类别)\s*[，,]\s*(?:Save|保存)\s*后会记录为\s*(?:Expense|支出)[。.]?/g,'Enter the expense amount, date and category, then save it as an expense.'],
[/填写\s*(?:Income|收入)\s*(?:Amount|金额)\s*[、,，]\s*(?:Date|日期)\s*(?:及|and)\s*(?:Category|类别)\s*[，,]\s*(?:Save|保存)\s*后会记录为\s*(?:Income|收入)[。.]?/g,'Enter the income amount, date and category, then save it as income.'],
[/当前图标\s*[:：]/g,'Current icon: ']
];
function fixText(s){const trimmed=s.trim();if(exact[trimmed])return s.replace(trimmed,exact[trimmed]);let out=s;for(const [re,val] of substitutions)out=out.replace(re,val);if(out===s&&/^当前图标/.test(trimmed))out=s.replace(/当前图标/, 'Current icon');return out;}
let pending=false;
function translate(){pending=false;const en=isEnglish();document.querySelectorAll(areas).forEach(root=>{
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
 while((node=walker.nextNode())){
  const parent=node.parentElement;if(!parent||parent.closest('script,style,textarea,[contenteditable="true"],#txList,#accountList,#homeAccounts,#transferList,#debtList,#paymentList,#customCategories,#receivablesList'))continue;
  if(!node.nodeValue.trim())continue;
  if(en){const next=fixText(node.nodeValue);if(next!==node.nodeValue){if(!originals.has(node))originals.set(node,node.nodeValue);node.nodeValue=next;}}
  else if(originals.has(node)){node.nodeValue=originals.get(node);originals.delete(node);}
 }
 });
 if(en){document.querySelectorAll('#transferFrom,#transferTo').forEach(sel=>{const opt=sel.options[0];if(opt&&opt.value===''&&opt.textContent.trim()==='请选择账户')opt.textContent='Select an account';});}
}
function schedule(){if(!pending){pending=true;requestAnimationFrame(translate)}}
function init(){schedule();document.addEventListener('click',schedule);document.addEventListener('change',schedule);const root=document.querySelector('main')||document.body;new MutationObserver(m=>{if(m.some(x=>x.addedNodes.length))schedule()}).observe(root,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
