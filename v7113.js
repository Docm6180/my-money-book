/* V7.1.13: focused Malay text fixes; no financial data changes. */
(()=>{'use strict';
const root=document.getElementById('transactions');if(!root)return;
const source='原有类别继续保留。你可以新增自己的收入／支出类别并选择图标，删除类别不会删除旧交易。';
const translated='Kategori sedia ada akan dikekalkan. Anda boleh menambah kategori pendapatan atau perbelanjaan sendiri dan memilih ikon. Memadam kategori tidak akan memadam transaksi terdahulu.';
function isMs(){try{return JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}').lang==='ms'}catch{return false}}
function fix(){if(!isMs())return;
const details=document.getElementById('categoryDetails');if(details){const hint=details.querySelector('p.hint');if(hint && (hint.textContent.includes('原有类别')||hint.textContent.includes('你可以新增')))hint.textContent=translated;}
const panel=document.getElementById('v640Panel');if(panel){const income=document.getElementById('v640Income'),expense=document.getElementById('v640Expense'),save=document.getElementById('v640Save');if(income && income.textContent!=='＋ Pendapatan Pantas')income.textContent='＋ Pendapatan Pantas';if(expense && expense.textContent!=='＋ Perbelanjaan Pantas')expense.textContent='＋ Perbelanjaan Pantas';if(save && save.textContent!=='☆ Simpan Rekod Semasa sebagai Templat')save.textContent='☆ Simpan Rekod Semasa sebagai Templat';}
}
fix();document.addEventListener('change',()=>setTimeout(fix,80));document.addEventListener('click',()=>setTimeout(fix,80));
// No MutationObserver: avoid recursive DOM writes and browser lockups.

})();
