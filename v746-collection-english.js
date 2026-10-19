/* V7.4.6: targeted English labels for collections. No financial-data writes. */
(()=>{'use strict';
const english=()=>{try{const p=JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}');return /^en/i.test(p.lang||document.documentElement.lang||'')}catch(_){return /^en/i.test(document.documentElement.lang||'')}};
const rules=[
  ['#v73Paid','Collection Amount (RM)'],
  ['#v73PaidDate','Collection Date']
];
const original=new WeakMap();
function replaceText(el,to){if(!el)return;for(const node of el.childNodes){if(node.nodeType!==3||!node.nodeValue.trim())continue;
 if(english()){if(!original.has(node))original.set(node,node.nodeValue);if(node.nodeValue.trim()!==to)node.nodeValue=to;}
 else if(original.has(node)){node.nodeValue=original.get(node);original.delete(node)}
 }}
function apply(){const root=document.getElementById('receivables');if(!root)return;
 for(const [sel,text] of rules){const input=root.querySelector(sel);replaceText(input?.closest('.field')?.querySelector('label'),text)}
 replaceText(root.querySelector('#v73PaymentForm button[type="submit"]'),'Save Collection');
 root.querySelectorAll('[data-v73-delete]').forEach(b=>replaceText(b,'Delete Receivable'));
 root.querySelectorAll('[data-v73-editpay]').forEach(b=>replaceText(b,'Edit'));
 root.querySelectorAll('[data-v73-delpay]').forEach(b=>replaceText(b,'Delete'));
}
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply()})}
function init(){schedule();document.addEventListener('click',schedule);document.addEventListener('change',schedule);window.addEventListener('mymoney-v73-update',schedule);
 const list=document.getElementById('v73List');if(list)new MutationObserver(records=>{if(records.some(r=>r.addedNodes.length||r.removedNodes.length))schedule()}).observe(list,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
