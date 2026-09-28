(()=>{
  'use strict';
  const $=selector=>document.querySelector(selector);
  const $$=selector=>[...document.querySelectorAll(selector)];
  const pad=value=>String(value).padStart(2,'0');
  const dayKey=(date=new Date())=>`${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;
  const mondayKey=()=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return dayKey(d)};
  const accountKey=()=>($('#settingsEmail')?.textContent||$('#accountName')?.textContent||'guest').trim().toLowerCase().replace(/[^a-z0-9@._-]/g,'_')||'guest';
  const storageKey=name=>`study-life-dashboard-v1:${accountKey()}:${name}`;
  const safeParse=(value,fallback)=>{try{return JSON.parse(value)||fallback}catch{return fallback}};
  const read=(name,fallback)=>safeParse(localStorage.getItem(storageKey(name)),fallback);
  const write=(name,value)=>localStorage.setItem(storageKey(name),JSON.stringify(value));
  const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  function go(panel){const button=$(`.nav-btn[data-panel="${panel}"]`);if(button){button.click();window.scrollTo({top:0,behavior:'smooth'})}}
  $$('[data-go-panel]').forEach(button=>button.addEventListener('click',()=>go(button.dataset.goPanel)));

  function renderGreeting(){
    const now=new Date(),hour=now.getHours();
    const greeting=hour<11?'早安，先完成最小的一步':hour<18?'下午好，把注意力放回眼前這一關':'晚上好，穩穩收尾就很厲害';
    $('#lifeGreeting').textContent=greeting;
    $('#lifeDate').textContent=now.toLocaleDateString('zh-TW',{year:'numeric',month:'long',day:'numeric',weekday:'long'});
    const start=new Date(`${mondayKey()}T00:00:00`),end=new Date(start);end.setDate(end.getDate()+6);
    $('#priorityWeekLabel').textContent=`${start.getMonth()+1}/${start.getDate()}–${end.getMonth()+1}/${end.getDate()}`;
  }

  function syncOverview(){
    const progress=$('#dailyProgress')?.textContent?.trim()||'0%';
    $('#homeProgress').textContent=progress;
    $('#homeProgressBar').style.width=progress;
    $('#homeBoss').textContent=$('#bossTitle')?.textContent?.trim()||'尚未排定';
    $('#homeBossCountdown').textContent=$('#bossCountdown')?.textContent?.trim()||'—';
    $('#homeTimer').textContent=$('#timerDisplay')?.textContent?.trim()||'45:00';
    $('#homeFocusGoal').textContent=$('#focusGoalDisplay')?.textContent?.trim()||'先選一個唯一目標';
  }

  function setupPriorities(){
    const inputs=$$('[data-weekly-priority]');
    const load=()=>{const values=read(`priorities:${mondayKey()}`,['','','']);inputs.forEach((input,index)=>input.value=values[index]||'')};
    let saveTimer;
    inputs.forEach((input,index)=>input.addEventListener('input',()=>{
      clearTimeout(saveTimer);
      $('#prioritySaveState').textContent='正在儲存…';
      saveTimer=setTimeout(()=>{const values=inputs.map(item=>item.value.trim());write(`priorities:${mondayKey()}`,values);$('#prioritySaveState').textContent='✓ 已自動儲存'},350);
    }));
    load();
    return load;
  }

  function setupHabits(){
    const buttons=$$('[data-habit]');
    const render=()=>{const state=read(`habits:${dayKey()}`,{});let count=0;buttons.forEach(button=>{const done=!!state[button.dataset.habit];button.classList.toggle('done',done);button.querySelector('i').textContent=done?'✓':'○';button.setAttribute('aria-pressed',String(done));if(done)count++});$('#habitScore').textContent=`${count} / ${buttons.length}`};
    buttons.forEach(button=>button.addEventListener('click',()=>{const state=read(`habits:${dayKey()}`,{});state[button.dataset.habit]=!state[button.dataset.habit];write(`habits:${dayKey()}`,state);render()}));
    render();
    return render;
  }

  const energyAdvice={1:'快沒電：不要硬撐，先開 15 分鐘，只做最小的一步。',2:'有點累：用 15 分鐘啟動，休息後再決定要不要加一輪。',3:'普通：適合 25 分鐘，選一題型或一小節就好。',4:'狀態不錯：可以開 45 分鐘，做需要思考的主線任務。',5:'滿電：先攻最弱科 45 分鐘，但仍要照時間休息。'};
  function setupEnergy(){
    const buttons=$$('[data-energy]');
    const render=()=>{const value=Number(read(`energy:${dayKey()}`,0));buttons.forEach(button=>{const active=Number(button.dataset.energy)===value;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});$('#checkinResult').textContent=value?`${value} / 5`:'尚未選擇';$('#energyAdvice').textContent=value?energyAdvice[value]:'先選能量，我會幫你決定從 15、25 還是 45 分鐘開始。'};
    buttons.forEach(button=>button.addEventListener('click',()=>{write(`energy:${dayKey()}`,Number(button.dataset.energy));render()}));
    render();
    return render;
  }

  function setupInbox(){
    const form=$('#lifeInboxForm'),input=$('#lifeInboxInput'),list=$('#lifeInboxList');
    const getItems=()=>read('inbox',[]);
    const render=()=>{const items=getItems();$('#inboxCount').textContent=`${items.filter(item=>!item.done).length} 則`;list.innerHTML=items.length?items.map(item=>`<article class="inbox-item ${item.done?'done':''}" data-inbox-id="${escapeHtml(item.id)}"><input type="checkbox" ${item.done?'checked':''} aria-label="完成"><span class="inbox-text">${escapeHtml(item.text)}</span><button class="promote" type="button">轉成任務</button><button class="remove" type="button" aria-label="刪除">−</button></article>`).join(''):'<div class="inbox-empty">腦袋目前很安靜。想到事情就先丟進來。</div>'};
    form.addEventListener('submit',event=>{event.preventDefault();const text=input.value.trim();if(!text)return;const items=getItems();items.unshift({id:`inbox-${Date.now()}`,text,done:false,createdAt:new Date().toISOString()});write('inbox',items.slice(0,40));input.value='';render()});
    list.addEventListener('change',event=>{const card=event.target.closest('[data-inbox-id]');if(!card)return;const items=getItems(),item=items.find(entry=>entry.id===card.dataset.inboxId);if(item){item.done=event.target.checked;write('inbox',items);render()}});
    list.addEventListener('click',event=>{const card=event.target.closest('[data-inbox-id]');if(!card)return;const items=getItems(),item=items.find(entry=>entry.id===card.dataset.inboxId);if(event.target.closest('.remove')){write('inbox',items.filter(entry=>entry.id!==card.dataset.inboxId));render();return}if(event.target.closest('.promote')&&item){go('todayPanel');setTimeout(()=>{const open=$('#openQuestDialog');open?.click();const name=$('#customQuestForm [name="name"]');if(name){name.value=item.text;name.focus()}},80)}});
    render();
    return render;
  }

  renderGreeting();
  const reloadAccountData=[setupPriorities(),setupHabits(),setupEnergy(),setupInbox()];
  syncOverview();
  const targets=['#dailyProgress','#bossTitle','#bossCountdown','#timerDisplay','#focusGoalDisplay'].map($).filter(Boolean);
  const observer=new MutationObserver(syncOverview);targets.forEach(target=>observer.observe(target,{subtree:true,childList:true,characterData:true}));
  let activeAccount=accountKey();
  setInterval(()=>{syncOverview();const nextAccount=accountKey();if(nextAccount!==activeAccount){activeAccount=nextAccount;reloadAccountData.forEach(render=>render())}},1500);
})();

