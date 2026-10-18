/* V7.1: bills are a separate primary panel. Existing localStorage and backup remain unchanged. */
(()=>{'use strict';
 const nav=document.querySelector('[data-tab="bills"]');
 const labels={en:'Bills & Reminders','zh-CN':'账单与提醒','zh-TW':'帳單與提醒',ms:'Bil & Peringatan'};
 function sync(){let lang='zh-CN';try{const s=JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}');const x=s.lang||document.documentElement.lang||'zh-CN';lang=/^ms/i.test(x)?'ms':/^en/i.test(x)?'en':/tw|hant/i.test(x)?'zh-TW':'zh-CN'}catch{}if(nav)nav.textContent='▣ '+labels[lang];}
 sync();document.addEventListener('click',e=>{if(e.target.closest('[data-tab]'))setTimeout(sync,0)});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync()});
})();

/* V7.1.1: label-only update for Settings & Backup; preserve navigation and data. */
(()=>{'use strict';
 const tab=document.querySelector('.tabs [data-tab="my"]');
 const heading=document.querySelector('#my h2');
 const labels={en:'Settings & Backup','zh-CN':'设置与备份','zh-TW':'設定與備份',ms:'Tetapan & Sandaran'};
 function update(){
  let lang='zh-CN';
  try{const cfg=JSON.parse(localStorage.getItem('mymoney-v604-preferences')||'{}');
   const v=cfg.lang||document.documentElement.lang||'zh-CN';
   lang=/^ms/i.test(v)?'ms':/^en/i.test(v)?'en':/tw|hant/i.test(v)?'zh-TW':'zh-CN';
  }catch(e){}
  const label='⚙ '+labels[lang];
  if(tab&&tab.textContent!==label)tab.textContent=label;
  if(heading&&heading.textContent!==label)heading.textContent=label;
 }
 update();
 const observer=new MutationObserver(update);
 if(tab)observer.observe(tab,{childList:true,characterData:true,subtree:true});
 if(heading)observer.observe(heading,{childList:true,characterData:true,subtree:true});
 document.addEventListener('click',()=>setTimeout(update,0));
 document.addEventListener('change',()=>setTimeout(update,0));
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)update()});
})();
