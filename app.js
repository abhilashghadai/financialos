Exit code: 0
Wall time: 1.5 seconds
Output:
const $ = (s) => document.querySelector(s);
const fmtL = (value) => `â‚¹${(value / 100000).toFixed(2)}L`;

const allocations = [
  { name: 'Equity funds', value: '38%', color: '#146c57' },
  { name: 'Retirement', value: '22%', color: '#618f73' },
  { name: 'Cash & debt', value: '12%', color: '#d0e955' },
  { name: 'Gold', value: '11%', color: '#e5bd5a' },
  { name: 'Global equity', value: '17%', color: '#8190f0' }
];

$('#allocation-list').innerHTML = allocations.map(a => `<p><span><i style="background:${a.color}"></i>${a.name}</span><b>${a.value}</b></p>`).join('');

function chart(svg, values, color = '#056c57', fill = true) {
  const w = 640, h = 155, pad = 7;
  const min = Math.min(...values) * .96, max = Math.max(...values) * 1.02;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - pad - ((v - min) / (max - min)) * (h - 2 * pad)}`);
  const line = `M ${pts.join(' L ')}`;
  svg.innerHTML = `<defs><linearGradient id="fade" x1="0" x2="0" y1="0" y2="1"><stop stop-color="${color}" stop-opacity=".23"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>${fill ? `<path d="${line} L ${w},${h} L 0,${h} Z" fill="url(#fade)"/>` : ''}<path d="${line}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${pts.map((p,i)=> i===pts.length-1 ? `<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="5" fill="#fff" stroke="${color}" stroke-width="3"/>`:'').join('')}`;
}
chart($('#networth-chart'), [34.2,35.4,35.1,36.6,38.4,37.9,39.7,41.1,42.5,42.2,44.1,46.0,48.62]);

const navTitle = {overview:['Good morning, Abhilash.','Your financial position is stronger than 84% of peers.'],portfolio:['Portfolio intelligence','Performance, diversification, and risk in one place.'],cashflow:['Cash flow intelligence','See where your money is workingâ€”and where it is leaking.'],goals:['Goals & retirement','Turn your intended future into a funded plan.'],debt:['Debt optimizer','A lower interest burden accelerates every goal.'],tax:['Tax intelligence','Legal optimization based on your current assumptions.'],protect:['Protection audit','Insure the financial plan, not just the assets.'],scenarios:['Scenario lab','Model uncertainty before it becomes reality.']};
document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => {
  const id = btn.dataset.view;
  document.querySelectorAll('.nav-item,.view').forEach(e => e.classList.remove('active'));
  btn.classList.add('active'); $(`#${id}`).classList.add('active');
  $('#page-title').textContent = navTitle[id][0]; $('#page-subtitle').textContent = navTitle[id][1];
  window.scrollTo({top:0,behavior:'smooth'});
}));
document.querySelectorAll('[data-target]').forEach(b => b.addEventListener('click', () => $(`.nav-item[data-view="${b.dataset.target}"]`).click()));

const modal = $('#modal');
$('#add-data').onclick = () => modal.classList.add('show');
$('#modal-close').onclick = () => modal.classList.remove('show');
modal.onclick = e => { if(e.target === modal) modal.classList.remove('show'); };

function money(v) { return `â‚¹${Math.round(v).toLocaleString('en-IN')}`; }
function updateScenario() {
  const monthly = +$('#sip-input').value, rate = +$('#return-input').value / 100, years = +$('#years-input').value;
  $('#sip-output').textContent = money(monthly); $('#return-output').textContent = `${(rate*100).toFixed(1)}%`; $('#years-output').textContent = `${years} years`;
  const base = 4862000, existingMonthly = 75000;
  const monthlyRate = rate / 12;
  const values = Array.from({length: years + 1}, (_, y) => base * Math.pow(1 + rate, y) + (existingMonthly + monthly) * 12 * ((Math.pow(1+rate,y)-1)/rate));
  const end = values.at(-1);
  $('#scenario-value').textContent = fmtL(end);
  $('#scenario-subtitle').textContent = `in ${years} years Â· ${fmtL(end - (base * Math.pow(1+rate,years) + existingMonthly*12*((Math.pow(1+rate,years)-1)/rate)))} added by this decision`;
  $('#fi-age').textContent = Math.max(40, 51 - Math.floor(monthly/6000) - Math.floor((rate-.105)*10));
  $('#success-rate').textContent = `${Math.min(96, Math.round(73 + monthly/2200 + (rate-.08)*100))}%`;
  $('#passive-income').textContent = money(end * .035 / 12);
  chart($('#scenario-chart'), values, '#056c57');
}
['sip-input','return-input','years-input'].forEach(id => $(`#${id}`).addEventListener('input',updateScenario));
document.querySelectorAll('.scenario-presets button').forEach(b=>b.addEventListener('click',()=>{
  if(b.dataset.preset==='crash'){ $('#return-input').value=8; $('#sip-input').value=10000; }
  if(b.dataset.preset==='job'){ $('#sip-input').value=0; $('#return-input').value=10; }
  if(b.dataset.preset==='home'){ $('#sip-input').value=20000; $('#years-input').value=12; }
  updateScenario();
}));
updateScenario();

