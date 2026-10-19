/* MyMoney NEXT V7.4.1 TEST: English UI corrections only. No financial data changes. */
(()=>{'use strict';
const dict={
'FINANCE OPERATIONS / 记账管理':'FINANCE OPERATIONS / RECORDS MANAGEMENT',
'交易与账户管理':'Transactions & Account Management',
'统一管理收入、支出、账户转账与账户资料':'Manage income, expenses, transfers and accounts',
'收款记录':'Collections','首页':'Home','记账':'Transactions','负债':'Debts','预算':'Budget','账单与提醒':'Bills & Reminders','报表':'Reports','设置与备份':'Settings & Backup','我的':'My Profile',
'新增记录':'New Entry','选择操作类型':'Select an action','＋ 收入':'+ Income','－ 支出':'− Expense','⇄ 内部转账':'⇄ Internal Transfer','▣ 新增 / 编辑账户':'Manage Accounts',
'新增收支记录':'New Transaction','新增内部转账':'New Transfer','新增转账':'New Transfer','转出账户':'From Account','转入账户':'To Account','请选择账户':'Select an account',
'不关联账户（旧版模式）':'No linked account (legacy mode)','不关联账户（兼容旧记录）':'No linked account (legacy records)',
'填写收入金额、日期及类别，保存后会记录为收入。':'Enter the income amount, date and category, then save.',
'填写支出金额、日期及类别，保存后会记录为支出。':'Enter the expense amount, date and category, then save.',
'转账只移动账户余额，不计入收入或支出。':'Transfers move money between accounts and do not count as income or expenses.',
'填写账户名称、类别及初始余额后保存；也可选择下方已有账户进行编辑。':'Enter an account name, type and opening balance, or edit an existing account below.',
'日期':'Date','金额（RM）':'Amount (RM)','类别':'Category','关联账户（可选）':'Linked Account (optional)','付款方式':'Payment Method','备注（可选）':'Notes (optional)','备注':'Notes','保存记录':'Save Transaction','取消编辑':'Cancel Editing',
'账户名称':'Account Name','账户类别':'Account Type','初始余额':'Opening Balance','保存账户':'Save Account','新增 / 编辑账户':'Add / Edit Account',
'保存转账':'Save Transfer','内部转账':'Internal Transfer','收入':'Income','支出':'Expense','转账':'Transfer',
'收款总览':'Collections Overview','新增欠款人 / 欠款记录':'New Receivable','欠款人姓名':'Borrower Name','欠款金额 (RM)':'Amount Owed (RM)','借款日期':'Loan Date','约定还款日期（可选）':'Due Date (optional)','保存欠款记录':'Save Receivable',
'记录收款':'Record Collection','选择欠款记录':'Select Receivable','收款金额 (RM)':'Amount Collected (RM)','收款日期':'Collection Date','同步增加银行或现金账户余额（可选）':'Also credit bank or cash account (optional)','选择实际收款账户':'Select Receiving Account','保存收款':'Save Collection','欠款清单及收款历史':'Receivables & Collection History',
'自定义 CSV 导出（三组）':'Custom CSV Export (3 Groups)','开始日期':'Start Date','结束日期':'End Date','导出勾选的组别':'Export Selected Groups','仅导出第 1 组':'Export Group 1 Only','仅导出第 2 组':'Export Group 2 Only','仅导出第 3 组':'Export Group 3 Only',
'数据备份与恢复':'Data Backup & Restore','下载完整备份（JSON）':'Download Full Backup (JSON)','导入备份（JSON）':'Import Backup (JSON)','清除本机数据':'Clear Local Data','清除全部数据':'Delete All Data','使用提示':'Usage Tips',
'第 1 组：日常收支与转账记录（收入、支出、内部转账）':'Group 1: Income, Expenses & Transfers',
'第 2 组：负债与还款记录（负债、负债还款）':'Group 2: Debts & Repayments',
'第 3 组：欠款人与收款记录（欠款人、收款）':'Group 3: Receivables & Collections',
'请选择账户':'Select an account','暂无账户':'No accounts yet','编辑':'Edit','删除':'Delete','删除转账':'Delete Transfer',
'餐饮':'Food & Dining','交通':'Transport','购物':'Shopping','房租/房贷':'Rent / Mortgage','水电网费':'Utilities & Internet','医疗':'Medical','薪水':'Salary','奖金':'Bonus','生意收入':'Business Income','家庭':'Family','其他':'Other',
'现金':'Cash','银行卡':'Bank Card','信用卡':'Credit Card','银行转账':'Bank Transfer','电子钱包':'E-Wallet',
'例如：午餐':'e.g. Lunch','年份':'Year','账户筛选':'Filter by Account','导出报表 CSV':'Export Report CSV','选择月份':'Select Month','分析类型':'Analysis Type','普通支出':'Regular Expenses','每日收支日历':'Daily Cash Flow Calendar','类别占比':'Category Breakdown','每日趋势':'Daily Trend','年度财务报表':'Annual Financial Report','收支分析':'Income & Expense Analysis'
};
const exact=(s)=>dict[s]||s;
const isEn=()=>{try{const p=JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}');return /^en/i.test(p.lang||document.documentElement.lang||'')}catch{return /^en/i.test(document.documentElement.lang||'')}};
const fixed=new WeakMap();let queued=false;
function translate(){queued=false;if(!isEn())return;
  const selector='nav.tabs button, .v736-page-head *, .v736-action-panel *, #txEntryWrap label, #txEntryWrap h2, #txEntryWrap button, #txEntryWrap option, #txEntryWrap input, #transferEntryWrap label, #transferEntryWrap h2, #transferEntryWrap button, #transferEntryWrap option, #accountsEmbedded label, #accountsEmbedded h2, #accountsEmbedded button, #receivables h2, #receivables label, #receivables button, #backup h2, #backup label, #backup button, #backup p, #analytics h2, #analytics label, #analytics button';
  document.querySelectorAll(selector).forEach(el=>{
    if(el.matches('input[placeholder]')){const p=el.getAttribute('placeholder');if(dict[p])el.setAttribute('placeholder',dict[p]);}
    if(el.matches('option')){const t=el.textContent.trim();if(dict[t])el.textContent=dict[t];return;}
    for(const node of el.childNodes){if(node.nodeType!==3)continue;const old=node.nodeValue;const trimmed=old.trim();if(!trimmed||!dict[trimmed])continue;node.nodeValue=old.replace(trimmed,dict[trimmed]);}
  });
  document.querySelectorAll('#transferFrom,#transferTo').forEach(el=>{const opt=el.options[0];if(opt&&opt.value===''&&opt.textContent.trim()==='请选择账户')opt.textContent='Select an account';});
}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(translate)}
function init(){schedule();document.addEventListener('change',schedule);document.addEventListener('click',schedule);const target=document.querySelector('main')||document.body;const obs=new MutationObserver(changes=>{if(!isEn())return; if(changes.some(c=>c.addedNodes.length>0 || (c.type==='characterData'&&dict[c.target.nodeValue?.trim()])))schedule()});obs.observe(target,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
