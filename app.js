const leads=[
 {id:1,name:'Mukunda R.',initials:'MK',phone:'+91 98765 43210',score:96,intent:'Hot Lead',product:'Smart Ortho GRID Mattress',value:8490,sla:'Today · 4:30pm',status:'Open',summary:'Back support is the key need; price-sensitive and comparing the Hybrid range.',notes:['Lead with GRID technology and value.','Confirm preferred sleeping position before pitching.'],journey:[['Today 10:20am','Call Centre','Asked about Ortho GRID and warranty'],['Today 10:32am','WhatsApp','Quote sent · awaiting reply'],['Yesterday 6:10pm','Store','Viewed GRID mattress in person']],buckets:['Quotation demanded','Warranty related']},
 {id:2,name:'Kavitha R.',initials:'KR',phone:'+91 98450 22118',score:88,intent:'Warm Lead',product:'Luxe Hybrid Mattress',value:12990,sla:'Today · 6:00pm',status:'Open',summary:'Wants to compare hybrid options and asked when she can visit.',notes:['Ask for a store visit slot.','Keep the first pitch concise.'],journey:[['Today 11:15am','WhatsApp','Asked when she can see the hybrid'],['Yesterday 4:40pm','Call','Requested pricing'],['Mon','Store','Compared two mattress models']],buckets:['Product related']},
 {id:3,name:'Faizan A.',initials:'FA',phone:'+91 99887 44120',score:78,intent:'Follow-up',product:'Tranquo Recliner',value:7990,sla:'Tomorrow · 12:00pm',status:'Open',summary:'Interested in recliner comfort and bundle pricing.',notes:['Offer bundle price, not only the item.'],journey:[['Today 10:05am','Missed call','No answer'],['Mon','WhatsApp','Shared product images']],buckets:['Quotation demanded']},
 {id:4,name:'Divya P.',initials:'DP',phone:'+91 91234 55667',score:71,intent:'Nurture',product:'Pillows bundle',value:2490,sla:'Tomorrow · 3:00pm',status:'Open',summary:'Low-ticket lead that needs a quick follow-up.',notes:['Use WhatsApp if the call is missed.'],journey:[['Yesterday 2:15pm','Missed call','No answer'],['Tue','Store','Asked about bundle']],buckets:['Financing related']}
];
const calls=[
 {name:'Ritu S.',time:'Today 11:20am',duration:'—',type:'missed',score:96},
 {name:'Mukunda R.',time:'Today 10:42am',duration:'4m 12s',type:'out',score:96},
 {name:'Faizan A.',time:'Today 10:05am',duration:'—',type:'missed',score:78},
 {name:'Kavitha R.',time:'Yesterday 4:40pm',duration:'2m 05s',type:'out',score:88}
];
const events=[
 {day:10,title:'Team QA review',time:'10:30am',type:'purple'},
 {day:10,title:'Mukunda callback',time:'4:30pm',type:''},
 {day:11,title:'Store coaching',time:'11:00am',type:'purple'},
 {day:12,title:'Kavitha revisit',time:'3:00pm',type:''},
 {day:14,title:'Weekly 1:1',time:'5:00pm',type:'purple'}
];
const channels=[
 ['#callcentre-team','Manager: Review call QA scores this week!','2:05pm'],['#all-stores','New Ortho Grid campaign from 1 June!','10:22am'],['#avani-coaching','Your warranty score dropped 12% this week','9:01am'],['#manage-shipment','Ortho Grid Pro · ready for delivery ✓','10:05am'],['#quotation-tickets','Quotation approval · awaiting approval','9:12am'],['#new-hire-onboarding','Welcome to the team!','8:30am']
];
const dms=[['Sunita Rao','SR','🌟 Great work with Mukunda — keep it up','12:40pm'],['Priya Krishnan','PK','Can you cover my 3pm slot today?','9:55am'],['Raju Kumar','RK','Nice cross-sell on the Tranquo chair! 🔥','Yesterday']];
const kudos=[['Sunita Rao','Manager','Great work with Mukunda — closed that warranty objection beautifully. Keep it up!','Today'],['Raju Kumar','Sales Associate','Nice cross-sell on the Tranquo chair! Impressed by how you read the customer.','Yesterday'],['Sunita Rao','Manager','Top SOP score this week — store leader!','2 days ago']];
let currentTab='dash',planTab='outgoing',pulseTab='channels',avaniTab='assess',selectedLead=null,selectedAvatar='Captain',vertical='retail';
const verticalCopy={
 retail:{brand:'The Sleep Company · Call Centre',dash:'The Sleep Company · Call Centre',lead:'customer',product:'product',industry:'Retail — Premium Brands'},
 healthcare:{brand:'Premium Care · Patient Helpline',dash:'Premium Care · Patient Helpline',lead:'patient',product:'service',industry:'Healthcare — Hospital Patient Helpline'}
};
function setVertical(v){vertical=v;document.getElementById('retailBtn')?.classList.toggle('active',v==='retail');document.getElementById('healthBtn')?.classList.toggle('active',v==='healthcare');const sub=document.querySelector('.brand span');if(sub)sub.textContent=verticalCopy[v].brand;renderAll();toast(v==='retail'?'Retail context selected.':'Healthcare context selected.');}


function esc(v){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function switchScreen(tab){currentTab=tab;document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById('screen-'+tab).classList.add('active');document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));renderAll();}
function toggleUserMenu(){document.getElementById('userMenu').classList.toggle('open')}
function closeOverlay(id){document.getElementById(id).classList.remove('open')}
function openOverlay(id){document.getElementById(id).classList.add('open')}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2200)}
function money(n){return '₹'+n.toLocaleString('en-IN')}

function renderDashboard(){
 document.getElementById('screen-dash').innerHTML=`
 <div class="page-title"><div><h1>Good afternoon 👋 Arvind Rajan</h1><p>${verticalCopy[vertical].dash}</p></div><button class="btn" onclick="openDateRange()">This Week ▾</button></div>
 <div class="grid grid4">
  ${stat('76','OG Score™','▲13','green')} ${stat('4m 12s','Avg Handle Time','▼8%','green')} ${stat('94%','CSAT Today','▲2pt','green')} ${stat('2','In Queue','● live','red')}
 </div>
 <div class="section-head"><h2>My Progress · today</h2><button onclick="switchScreen('calls')">Open planner →</button></div>
 <div class="grid grid3">
  <div class="card stat"><div class="label">Leads Created</div><div class="value">3</div><div class="trend">▲ +1</div></div>
  <div class="card stat"><div class="label">Leads Called</div><div class="value">2</div><div class="trend">▲ +2</div></div>
  <div class="card"><div class="label">Who's waiting</div><div style="font-size:13px;font-weight:800;margin-top:7px">Ritu S. · missed</div><button class="btn primary" style="margin-top:8px" onclick="openDialer('Ritu S.')">Call back</button></div>
 </div>
 <div class="grid grid2" style="margin-top:10px">
  <div class="card"><div class="section-head" style="margin-top:0"><h2>💰 My earnings this month</h2></div><div style="font-size:24px;font-weight:900">₹5,200</div><small style="color:var(--muted)">₹1,700 from coached moves · ₹800 to ₹6,000 slab</small></div>
  <div class="card"><div class="section-head" style="margin-top:0"><h2>My Tasks <span class="pill">3</span></h2></div>${task('↩','2 callbacks','next 4:30pm')}${task('🔥','2 hot leads untouched','24h')}${task('📝','1 outcome to log','Today')}</div>
 </div>
 <div class="grid grid2" style="margin-top:10px">
  <div class="card"><div class="section-head" style="margin-top:0"><h2>Calls handled · last 7 days</h2></div>${chart([18,22,15,26,20,12,14],['Mon','Tue','Wed','Thu','Fri','Sat','Today'])}</div>
  <div class="card"><div class="section-head" style="margin-top:0"><h2>CSAT trend · last 7 days</h2></div>${chart([88,90,85,92,89,91,94],['Mon','Tue','Wed','Thu','Fri','Sat','Today'])}</div>
 </div>`;
}
function stat(v,l,t,c){return `<div class="card stat"><div class="label">${l}</div><div class="value">${v}</div><div class="trend" style="color:${c==='red'?'#e24b4a':'var(--green)'}">${t}</div></div>`}
function task(i,a,b){return `<div class="task-row"><div class="row-icon">${i}</div><div class="row-main"><b>${a}</b><small>${b}</small></div></div>`}
function chart(vals,labels){return `<div class="chart">${vals.map((v,i)=>`<div class="bar-col"><b>${v}%</b><div class="bar" style="height:${Math.max(20,v*.75)}px"></div><small>${labels[i]}</small></div>`).join('')}</div>`}

function renderCalls(){
 const outgoing=leads.map(l=>`<div class="lead-row" onclick="openLead(${l.id})"><div class="lead-score ${l.score>90?'score-hot':''}">${l.score}</div><div class="row-main"><b>${l.name} · ${l.product}</b><small>${l.intent} · ${money(l.value)} · SLA ${l.sla}</small></div><div class="row-right"><b>☎</b><small>View</small></div></div>`).join('');
 const incoming=calls.filter(c=>c.type==='missed').map(c=>`<div class="call-row"><div class="row-icon">📵</div><div class="row-main"><b>${c.name}</b><small>Missed · ${c.time}</small></div><div class="row-right"><b>${c.score}</b><button class="btn primary" onclick="event.stopPropagation();openDialer('${c.name}')">Call back</button></div></div>`).join('');
 const recent=calls.map(c=>`<div class="call-row" onclick="openCallReview('${esc(c.name)}')"><div class="row-icon">${c.type==='missed'?'📵':'☎️'}</div><div class="row-main"><b>${c.name}</b><small>${c.time} · ${c.duration}</small></div><div class="row-right"><b>${c.type==='missed'?'Missed':'Completed'}</b><small>Review SOP →</small></div></div>`).join('');
 document.getElementById('screen-calls').innerHTML=`
 <div class="page-title"><div><h1>Today's calling plan</h1><p>Prioritise the right lead, then make the call.</p></div><button class="btn purple" onclick="openDialer('Ritu S.')">Open real dialer</button></div>
 <div class="call-banner"><div class="call-avatar">☎</div><div class="grow"><b>Queue ready</b><small>2 high-intent callbacks · next SLA 4:30pm</small></div><button class="round green" onclick="openDialer('Ritu S.')">☎</button></div>
 <div class="plan-tabs">${tabBtn('outgoing','Calls to make')}${tabBtn('incoming','Incoming')}${tabBtn('recent','Recent')}${tabBtn('practice','Dialer')}</div>
 <div class="card">${planTab==='outgoing'?`<div class="section-head" style="margin-top:0"><h2>Planned outgoing calls</h2><span class="pill">Ranked by lead score</span></div>${outgoing}`:planTab==='incoming'?`<div class="section-head" style="margin-top:0"><h2>Missed calls</h2><span class="pill gray">Expected value first</span></div>${incoming}`:planTab==='recent'?`<div class="section-head" style="margin-top:0"><h2>Recent calls</h2><span class="pill gray">Tap to review</span></div>${recent}`:`<div style="text-align:center;padding:18px"><div style="font-size:36px">☎️</div><h2 style="font-size:16px">Real phone dialer</h2><p style="font-size:11px;color:var(--muted)">Place a real PSTN call from this browser using Twilio Voice.</p><button class="btn purple" onclick="openDialer('Ritu S.')">Open dialer</button></div>`}</div>`;
}
function tabBtn(v,label){return `<button class="${planTab===v?'active':''}" onclick="setPlanTab('${v}')">${label}</button>`}
function setPlanTab(v){planTab=v;renderCalls()}

function renderCalendar(){
 const names=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];let cells='';for(let i=1;i<=30;i++){const ev=events.find(e=>e.day===i);cells+=`<div class="day ${i===10?'today':''}"><b>${i}</b>${ev?`<div class="event ${ev.type}">${ev.title}</div><small style="color:var(--muted)">${ev.time}</small>`:''}</div>`}
 document.getElementById('screen-calendar').innerHTML=`<div class="page-title"><div><h1>Calendar</h1><p>Mirrored from your mailbox · store visits, coaching and meeting invites.</p></div><button class="btn" onclick="openDateRange()">Select range</button></div><div class="card"><div class="section-head" style="margin-top:0"><h2>October 2026</h2><div><button class="btn">‹</button> <button class="btn">Today</button> <button class="btn">›</button></div></div><div class="calendar-grid">${names.map(n=>`<div class="day-head">${n}</div>`).join('')}${cells}</div></div><div class="section-head"><h2>Upcoming</h2></div><div class="card">${events.map(e=>`<div class="event-row"><div class="row-icon">${e.type?'🎓':'📞'}</div><div class="row-main"><b>${e.title}</b><small>Oct ${e.day} · ${e.time}</small></div><span class="pill">Scheduled</span></div>`).join('')}</div>`;
}

function renderPulse(){
 const channelHtml=channels.map(c=>`<div class="channel-row" onclick="openPulseChat('${esc(c[0])}','${esc(c[1])}')"><div class="row-icon">#</div><div class="row-main"><b>${c[0]}</b><small>${c[1]}</small></div><div class="row-right"><small>${c[2]}</small></div></div>`).join('');
 const dmHtml=dms.map(d=>`<div class="dm-row" onclick="openPulseChat('${esc(d[0])}','${esc(d[2])}')"><div class="avatar">${d[1]}</div><div class="row-main"><b>${d[0]}</b><small>${d[2]}</small></div><div class="row-right"><small>${d[3]}</small></div></div>`).join('');
 const cust=`<div class="unanswered">1 unanswered call & 1 unreplied chat need attention</div><div class="card"><div class="section-head" style="margin-top:0"><h2>Customer Conversations</h2><span class="pill">WhatsApp + calls</span></div>${[['Mukunda','Quote for Ortho GRID sent · awaiting reply','2:40pm'],['Kavitha R.','When can I come see the hybrid mattress?','11:15am'],['Ali','Missed call · not returned yet','9:40am']].map(x=>`<div class="channel-row"><div class="row-icon">💬</div><div class="row-main"><b>${x[0]}</b><small>${x[1]}</small></div><div class="row-right"><small>${x[2]}</small></div></div>`).join('')}</div>`;
 const kudosHtml=kudos.map(k=>`<div class="event-row"><div class="row-icon">🏆</div><div class="row-main"><b>${k[0]} · ${k[1]}</b><small>“${k[2]}”</small></div><small>${k[3]}</small></div>`).join('');
 document.getElementById('screen-pulse').innerHTML=`<div class="page-title"><div><h1>Pulse</h1><p>The Sleep Company · Koramangala</p></div><button class="btn primary" onclick="openPulseChat('New message','Start a new conversation')">＋ Message</button></div>
 <div class="pulse-hero"><b>✨ AvaniBot <span style="font-size:9px;background:rgba(255,255,255,.18);padding:3px 6px;border-radius:6px">ALWAYS ON</span></b><p>Ask about daily briefs, action items or anything happening in Pulse.</p><div class="pulse-actions"><button onclick="toast('Daily brief: 2 callbacks, 1 QA action, 1 hot lead.')">Daily Brief</button><button onclick="openPulseChat('AvaniBot','Ask me a question')">Ask a question</button></div></div>
 <div class="subtabs">${['channels','customers','kudos'].map(v=>`<button class="${pulseTab===v?'active':''}" onclick="pulseTab='${v}';renderPulse()">${v==='channels'?'Channels + DMs':v==='customers'?'Customer Conversations':'Kudos'}</button>`).join('')}</div>
 ${pulseTab==='channels'?`<div class="grid grid2"><div class="card"><div class="section-head" style="margin-top:0"><h2>Channels</h2></div>${channelHtml}</div><div class="card"><div class="section-head" style="margin-top:0"><h2>Direct Messages</h2></div>${dmHtml}</div></div>`:pulseTab==='customers'?cust:`<div class="card"><div class="section-head" style="margin-top:0"><h2>Incoming Kudos</h2><span class="pill">12 all-time</span></div>${kudosHtml}</div>`}`;
}

function renderAvani(){
 const assess=`<div class="coach-card"><h3>Ready to assess!</h3><p>Ask about products, sales techniques, or objection handling. Avani will give feedback and coaching.</p><div class="subtabs">${['100-night trial','Price objection','My weak areas','Warranty quiz'].map(x=>`<button onclick="avaniAsk('${x}')">🎯 ${x}</button>`).join('')}</div><div class="chat" id="coachChat"><div class="bubble">Hi Arvind — what would you like to practise today?</div></div><div class="chat-input"><input id="coachInput" placeholder="Ask Avani…"/><button class="btn purple" onclick="sendCoach()">Send</button></div></div>`;
 const learn=`<div class="coach-card"><h3>🎓 Your Learning Path</h3><p>4 modules assigned this week · 2 core + 2 personalised from your store conversations.</p>${[['Product Foundations','GRID vs Luxe · Foam types · SKU specs','Done ✓'],['Warranty & Trial Policy','100-night trial · Return process · Key scripts','40%'],['Objection Handling','Price, competitor and timing objections','20%'],['Lead Follow-up','Book the revisit and confirm next step','10%']].map(m=>`<div class="task-row"><div class="row-icon">📘</div><div class="row-main"><b>${m[0]}</b><small>${m[1]}</small></div><span class="pill">${m[2]}</span></div>`).join('')}</div>`;
 const practise=`<div class="coach-card"><h3>🎙️ Your Net Practise Pick</h3><p>Pick a step, see a model example, record your rendition and get instant feedback.</p><div class="check"><input type="checkbox" checked disabled><div><b>Open with name and store</b><div style="color:var(--muted);margin-top:2px">Example: “Hi Mukunda, Arvind from The Sleep Company Koramangala.”</div></div></div><button class="btn purple" onclick="startPracticeSkill()">Record your rendition</button></div>`;
 document.getElementById('screen-avani').innerHTML=`<div class="page-title"><div><h1>Avani AI</h1><p>Your personal sales coach ✨</p></div><span class="pill" style="background:var(--purple-soft);color:var(--purple)">Coaching active</span></div><div class="avani-nav">${['assess','learn','practise'].map(v=>`<button class="${avaniTab===v?'active':''}" onclick="avaniTab='${v}';renderAvani()">${v[0].toUpperCase()+v.slice(1)}</button>`).join('')}</div>${avaniTab==='assess'?assess:avaniTab==='learn'?learn:practise}`;
}
function avaniAsk(q){document.getElementById('coachChat').insertAdjacentHTML('beforeend',`<div class="bubble me">${q}</div><div class="bubble">For ${q}, start by naming the customer and confirming the specific need before you pitch. Keep the first answer under 20 seconds.</div>`)}
function sendCoach(){const i=document.getElementById('coachInput');if(!i.value.trim())return;const q=esc(i.value.trim());i.value='';document.getElementById('coachChat').insertAdjacentHTML('beforeend',`<div class="bubble me">${q}</div><div class="bubble">Good question. Use the SOP: identify need → confirm constraint → recommend one clear next step → log the outcome.</div>`)}
function startPracticeSkill(){openDialer('Practice · Opening greeting')}

function openLead(id){selectedLead=leads.find(l=>l.id===id);const l=selectedLead;document.getElementById('leadModalTitle').textContent=l.name;document.getElementById('leadModalSub').textContent=`Lead ${l.id} of ${leads.length} · SLA to close`;document.getElementById('leadModalBody').innerHTML=`<div class="lead-hero"><div class="lead-avatar">${l.initials}</div><div class="lead-meta"><b>${l.product}</b><small>${l.phone} · ${l.intent} · ${verticalCopy[vertical].lead}</small></div><span class="pill">Intent ${l.score}</span></div><div class="score-line"><div class="top"><span>Lead attractiveness</span><span>${l.score}/100</span></div><div class="progress"><i style="width:${l.score}%"></i></div></div><div class="card" style="padding:10px;margin:10px 0;background:#faf9f6"><b style="font-size:11px">AI summary</b><div style="font-size:11px;color:#555;margin-top:4px">${l.summary}</div></div><div class="section-head"><h2>How we got here</h2></div><div class="timeline">${l.journey.map(j=>`<div class="timeline-item"><b>${j[0]} · ${j[1]}</b><small>${j[2]}</small></div>`).join('')}</div><div class="section-head"><h2>Where we picked up signals</h2></div>${l.buckets.map(b=>`<div class="bucket">📋 ${b}</div>`).join('')}<div class="section-head"><h2>Before you reach out</h2></div>${l.notes.map(n=>`<div class="task-row"><div class="row-icon">•</div><div class="row-main"><b>${n}</b></div></div>`).join('')}<div class="action-grid"><button class="btn danger" onclick="openAction('No Interest','Why did the customer lose interest?',false)">No Interest</button><button class="btn" style="background:#25D366;color:#fff;border-color:#25D366" onclick="openAction('WhatsApp','Send a follow-up message',true)">WhatsApp</button><button class="btn purple" onclick="openSop()">☎ On-ground Call</button><button class="btn primary" onclick="openAction('Came Back','When did/will the customer come back?',false)">Came Back ✓</button></div>`;openOverlay('leadModal')}
function openSop(){closeOverlay('leadModal');const l=selectedLead;document.getElementById('sopMeta').textContent=`${l.name} · ${l.product}`;document.getElementById('sopBody').innerHTML=`<div class="card" style="background:#faf9f6"><b style="font-size:12px">Why this product</b><p style="font-size:11px;color:#555">Highest-intent product in this thread. Lead with ${l.product} value, then confirm the customer's constraint.</p></div>${['Greet within 10 seconds and name the store','Confirm the customer need before the pitch','Mention one relevant product benefit','Confirm the next step before ending the call'].map((x,i)=>`<label class="check"><input type="checkbox" ${i<1?'checked':''}> <span>${x}</span></label>`).join('')}<button class="btn primary" style="width:100%;margin-top:6px" onclick="proceedOnGroundCall()">Skip · Place the call</button>`;openOverlay('sopModal')}
function proceedOnGroundCall(){closeOverlay('sopModal');openDialer(selectedLead?selectedLead.name:'Mukunda R.')}
function openAction(title,sub,whatsapp){document.getElementById('actionTitle').textContent=title;document.getElementById('actionSub').textContent=sub;let body='';if(title==='No Interest'){body=`<div class="field"><label>Reason</label><div class="option-grid">${['Price too high','Went to competitor','Not ready to buy','Other'].map(x=>`<button class="option" onclick="this.classList.toggle('selected')">${x}</button>`).join('')}</div></div><button class="btn danger" style="width:100%" onclick="closeOverlay('actionModal');toast('No-interest outcome saved.')">Confirm No Interest</button>`}else if(title==='Came Back'){body=`<div class="field"><label>Follow-up timing</label><input value="Saturday · 4:00pm"></div><button class="btn primary" style="width:100%" onclick="closeOverlay('actionModal');toast('Return follow-up saved.')">Confirm Return</button>`}else{body=`<div class="field"><label>Message</label><textarea rows="4">Hi ${selectedLead?selectedLead.name:'there'}, just following up on your ${selectedLead?selectedLead.product:'product'} enquiry. Happy to help with the next step.</textarea></div><button class="btn primary" style="width:100%" onclick="closeOverlay('actionModal');toast('WhatsApp message queued in demo.')">Send on WhatsApp</button>`}document.getElementById('actionBody').innerHTML=body;openOverlay('actionModal')}

let timerInt=null,timer=0,voiceDevice=null,currentVoiceCall=null;

async function getVoiceToken(){
 const identity='arvind_agent';
 const res=await fetch(`/api/token?identity=${identity}`);
 const data=await res.json();
 if(!res.ok) throw new Error(data.error||'Unable to get Twilio access token');
 return data.token;
}

async function initVoiceDevice(){

  toast('Browser calling requires a TwiML App. Using Twilio trial phone calling instead.');

  return null;

}

function formatSeconds(total){const m=String(Math.floor(total/60)).padStart(2,'0');const s=String(total%60).padStart(2,'0');return `${m}:${s}`;}
function startTimer(){clearInterval(timerInt);timer=0;timerInt=setInterval(()=>{timer++;const el=document.getElementById('dialerTimer');if(el)el.textContent=formatSeconds(timer)},1000)}
function bindCallEvents(call){
 currentVoiceCall=call;
 call.on('accept',()=>{startTimer();document.getElementById('transcript').textContent='Live call connected. Audio is coming from the real phone line.';toast('Real call connected');});
 call.on('disconnect',()=>{clearInterval(timerInt);document.getElementById('transcript').textContent='Call ended.';toast('Call ended');});
 call.on('cancel',()=>{clearInterval(timerInt);toast('Incoming call cancelled');});
 call.on('error',e=>{clearInterval(timerInt);toast(`Call error: ${e.message||e}`);});
}

function openDialer(name){
 const matched=leads.find(l=>l.name===name) || leads[0];
 const phone=matched?.phone || '';
 document.getElementById('dialerTitle').textContent='Call centre dialer';
 document.getElementById('dialerSub').textContent='Real PSTN calling · human to human';
 document.getElementById('dialerBody').innerHTML=`<div class="dialer-center">
   <div class="dialer-avatar">☎</div><h2 style="font-size:18px;margin:0">${esc(name||'Customer')}</h2>
   <p style="font-size:11px;color:var(--muted)">Browser agent → real phone number</p>
   <div class="field" style="max-width:320px;margin:12px auto;text-align:left"><label>Customer phone number (E.164)</label><input id="dialerNumber" value="${esc(phone)}" placeholder="+919876543210"></div>
   <div class="dialer-timer" id="dialerTimer">00:00</div>
   <div class="call-actions" style="justify-content:center;gap:10px">
     <button class="round green" id="dialerPrimary" onclick="startLiveCall()">☎</button>
     <button class="round red" onclick="endLiveCall()">✕</button>
   </div>
   <div class="card" style="margin-top:16px;text-align:left"><b style="font-size:11px">Call status</b><p id="transcript" style="font-size:11px;color:#555;line-height:1.5;margin-bottom:0">Ready. This button places a real phone call; no peer ID or simulated audio is used.</p></div>
   <div style="display:flex;gap:8px;justify-content:center;margin-top:10px"><button class="btn" onclick="placeAiCall()">🤖 AI calls this number</button></div>
 </div>`;
 openOverlay('dialerModal');
 initVoiceDevice().catch(e=>{document.getElementById('transcript').textContent=e.message;toast(e.message)});
}

async function startLiveCall(){

  const number=document.getElementById('dialerNumber')?.value.trim();

  if(!/^\+[1-9]\d{7,14}$/.test(number)){
    toast('Enter a valid E.164 number, for example +919876543210.');
    return;
  }

  try{

    const res=await fetch('/api/trial-call',{

      method:'POST',

      headers:{
        'Content-Type':'application/json'
      },

      body:JSON.stringify({
        to:number
      })

    });

    const data=await res.json();

    if(!res.ok){
      throw new Error(data.error || 'Could not start call');
    }

    document.getElementById('transcript').textContent =
      `Real Twilio trial call started. Call SID: ${data.callSid}`;

    toast('📞 Real phone call started');

  }catch(e){

    document.getElementById('transcript').textContent =
      e.message || 'Call failed';

    toast(e.message || 'Could not place call');

  }

}

async function acceptIncomingCall(call){try{await call.accept();bindCallEvents(call);document.getElementById('dialerPrimary').disabled=true;}catch(e){toast(e.message||'Could not accept call')}}
function endLiveCall(){
 clearInterval(timerInt);
 if(currentVoiceCall){try{currentVoiceCall.disconnect()}catch{}}
 document.getElementById('dialerBody').innerHTML=`<div class="card"><h3 style="margin-top:0">Call ended</h3><p style="font-size:11px;color:var(--muted)">This was a real Twilio call. Record the actual outcome below and save it to the lead.</p><div class="field"><label>Outcome</label><div class="option-grid"><button class="option selected">Follow-up booked</button><button class="option">No sale</button><button class="option">Callback requested</button></div></div><div class="field"><label>Notes</label><textarea rows="4" placeholder="Write the real call outcome…"></textarea></div><button class="btn primary" style="width:100%" onclick="closeOverlay('dialerModal');toast('Real call outcome saved locally.')">Save outcome</button></div>`;
 currentVoiceCall=null;
}
async function placeAiCall(){

  const number=document.getElementById('dialerNumber')?.value.trim();

  if(!/^\+[1-9]\d{7,14}$/.test(number)){
    toast('Enter a valid E.164 number first.');
    return;
  }

  toast('AI phone calling is not available on the Twilio trial.');

  document.getElementById('transcript').textContent =
    'AI calling requires Twilio features that are restricted during the free trial.';

}

function openCallReview(name){document.getElementById('dialerTitle').textContent='Call SOP review';document.getElementById('dialerSub').textContent=name;document.getElementById('dialerBody').innerHTML=`<div class="score-line"><div class="top"><span>SOP score</span><span>72/100</span></div><div class="progress"><i style="width:72%"></i></div></div>${['Greeting in first 10 seconds','Confirmed need before pitch','Used relevant benefit','Asked for a next step'].map((x,i)=>`<div class="check"><span>${i<3?'✓':'○'}</span><span>${x}</span></div>`).join('')}<button class="btn purple" style="width:100%;margin-top:6px" onclick="closeOverlay('dialerModal');switchScreen('avani');avaniTab='practise';renderAvani()">Practise weak skill →</button>`;openOverlay('dialerModal')}

function openPulseChat(title,msg){document.getElementById('actionTitle').textContent=title;document.getElementById('actionSub').textContent='Pulse conversation';document.getElementById('actionBody').innerHTML=`<div class="chat"><div class="bubble"><b>${esc(title)}</b><br>${esc(msg)}</div><div class="bubble">AvaniBot: I can help summarise the action items or find the relevant lead conversation.</div></div><div class="chat-input"><input id="pulseInput" placeholder="Message…"><button class="btn primary" onclick="toast('Message sent in demo.');closeOverlay('actionModal')">Send</button></div>`;openOverlay('actionModal')}
function openNotifications(){document.getElementById('notificationsBody').innerHTML=`<div class="subtabs"><button class="active">All</button><button>Needs action</button><button>Alerts</button></div>${[['📞','Ritu S. missed call','Call back before SLA','11:20am'],['💬','Mukunda replied on WhatsApp','Quote thread needs a response','10:32am'],['🏆','New kudos from Sunita Rao','Warranty objection handled well','12:40pm'],['🎯','Avani coaching','Your warranty score dropped 12%','9:01am']].map(n=>`<div class="event-row"><div class="row-icon">${n[0]}</div><div class="row-main"><b>${n[1]}</b><small>${n[2]}</small></div><small>${n[3]}</small></div>`).join('')}`;openOverlay('notificationsModal')}
function openDateRange(){document.getElementById('dateBody').innerHTML=`<div class="option-grid">${['Today','This Week','This Month','Last 30 Days'].map((x,i)=>`<button class="option ${i===1?'selected':''}" onclick="document.querySelectorAll('#dateBody .option').forEach(b=>b.classList.remove('selected'));this.classList.add('selected')">${x}</button>`).join('')}</div><div class="grid grid2"><div class="field"><label>From</label><input type="date" value="2026-10-05"></div><div class="field"><label>To</label><input type="date" value="2026-10-11"></div></div><button class="btn primary" style="width:100%" onclick="closeOverlay('dateModal');toast('Date range applied.')">Apply Range</button>`;openOverlay('dateModal')}
function openSettings(){document.getElementById('userMenu').classList.remove('open');document.getElementById('settingsBody').innerHTML=`<div class="setting-section"><h3>Employee Profile</h3>${field('Full Name','Arvind Rajan')}${field('Employee ID','OG-CC-0142')}${field('Email','arvind@example.com')}</div><div class="setting-section"><h3>Store</h3>${field('Base Store','Koramangala — The Sleep Company')}<p style="font-size:10px;color:var(--muted)">Allocated: Koramangala · HSR Layout · Indiranagar</p></div><div class="setting-section"><h3>Role & Designation</h3><div class="option selected">M0 · Call Centre Staff</div></div><div class="setting-section"><h3>Your Customer Channel</h3><div class="option selected">☎️ Call Centre Staff · I mostly handle customers over the phone</div></div><div class="setting-section"><h3>Industry</h3><div class="option ${vertical==='retail'?'selected':''}" onclick="setVertical('retail');openSettings()">🛏️ Retail — Premium Brands</div><div class="option ${vertical==='healthcare'?'selected':''}" style="margin-top:7px" onclick="setVertical('healthcare');openSettings()">🏥 Healthcare — Hospital Patient Helpline</div></div><div class="setting-section"><h3>OG Score™ on LinkedIn</h3>${field('LinkedIn Profile URL','https://linkedin.com/in/your-profile')}<button class="btn" onclick="toast('LinkedIn connection saved in demo.')">Save & Connect LinkedIn</button></div><button class="btn primary" style="width:100%;margin-top:12px" onclick="closeOverlay('settingsModal');toast('Settings saved.')">Save Changes</button>`;openOverlay('settingsModal')}
function field(label,value){return `<div class="field"><label>${label}</label><input value="${esc(value)}"></div>`}
function openAvatar(){document.getElementById('userMenu').classList.remove('open');document.getElementById('avatarBody').innerHTML=`<p style="font-size:11px;color:var(--muted)">Pick the persona shown on your profile badge.</p><div class="option-grid">${['Captain','Valkyrie','Vortex','Blaze','Shadow'].map(x=>`<button class="option ${selectedAvatar===x?'selected':''}" onclick="selectedAvatar='${x}';openAvatar()">${x}</button>`).join('')}</div><button class="btn primary" style="width:100%;margin-top:10px" onclick="closeOverlay('avatarModal');toast('Avatar saved as '+selectedAvatar+'.')">Save Avatar</button>`;openOverlay('avatarModal')}
function renderAll(){renderDashboard();renderCalls();renderCalendar();renderPulse();renderAvani()}
renderAll();

document.addEventListener('click',e=>{if(!e.target.closest('.top-actions'))document.getElementById('userMenu').classList.remove('open')});


