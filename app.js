// RE+ 26 McKinsey 10-Minute Executive Briefing & Supabase BaaS App Logic

const D = window.REPLUS_DATA;
const S = window.REPLUS_SVGS;

// Initialize Supabase Client (Publishable Client Key Only — Zero service_role key)
let sbClient = null;
try {
  if (window.supabase && D.supabase.url && D.supabase.publishableKey) {
    sbClient = window.supabase.createClient(D.supabase.url, D.supabase.publishableKey);
  }
} catch (e) {
  console.warn('Supabase init warning:', e);
}

// App State
const state = {
  viewMode: 'deck', // 'deck' | 'scroll'
  currentSlide: 1,
  showNotes: true,
  timerSeconds: 600,
  timerRunning: false,
  timerInterval: null,
  startupFilter: '全部',
  actionHorizonFilter: '全部',
  user: null,
  actions: [...D.fallbackActions],
  evaluations: [],
  sbConnected: false
};

// ---------------- Presenter Notes Renderer ----------------
function renderPresenterNotes(slideId) {
  const meta = D.slidesMeta.find(m => m.id === slideId);
  if (!meta) return '';
  return `
    <div class="presenter-notes ${state.showNotes ? '' : 'hidden'} mt-5 bg-slate-50 border-t border-slate-200 px-6 py-4 rounded-b-xl">
      <div class="flex items-center justify-between mb-2">
        <span class="text-[11px] font-extrabold tracking-wider text-mckNavy uppercase">🎤 麥肯錫三段式講者備忘錄（建議停留 ${meta.duration}）</span>
        <span class="text-[10px] font-mono text-slate-400">Slide ${String(slideId).padStart(2, '0')} / 14</span>
      </div>
      <div class="grid md:grid-cols-3 gap-3 text-xs leading-relaxed">
        <div class="bg-white p-3 rounded-lg border border-slate-200">
          <div class="font-bold text-blue-700 mb-1">① 本頁結論</div>
          <p class="text-slate-700">${meta.notes.conclusion}</p>
        </div>
        <div class="bg-white p-3 rounded-lg border border-slate-200">
          <div class="font-bold text-amber-700 mb-1">② 數據與補充說明</div>
          <p class="text-slate-700">${meta.notes.detail}</p>
        </div>
        <div class="bg-white p-3 rounded-lg border border-slate-200">
          <div class="font-bold text-emerald-700 mb-1">③ 下一頁轉場</div>
          <p class="text-slate-700">${meta.notes.transition}</p>
        </div>
      </div>
    </div>
  `;
}

// ---------------- Build All 14 Slides HTML ----------------
function buildAllSlides() {
  return [
    // SLIDE 01: Executive Cover
    `
    <section data-slide="1" class="slide-card">
      <div class="bg-gradient-to-br from-[#0B1F3A] via-[#132E57] to-[#1E3A8A] text-white p-8 md:p-12 relative overflow-hidden">
        <div class="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
        <div class="relative z-10 max-w-4xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold mb-5">
            <span>RE+ 26 LAS VEGAS (2026/11/16–19)</span>
            <span>•</span>
            <span>進金生能源 6692｜進能服事業部高階決策簡報</span>
          </div>
          <h2 class="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            RE+ 26 深度產業洞察：<br/>
            <span class="text-amber-400">從補貼減碳轉向 AI 算力電力基建競賽</span>
          </h2>
          <p class="text-slate-200 text-base md:text-lg leading-relaxed max-w-3xl mb-8">
            北美能源轉型邁入全新分水嶺——由 <b>AI 資料中心算力爆發</b>、<b>儲能優先（Storage-First）</b>、<b>800 VDC 固態變壓器（SST）革命</b>與<b>去中化三重監管海嘯</b>主導全局。本簡報以麥肯錫金字塔架構萃取十大技術與十大新創，並由進能服事業總監視角轉譯為台灣市場落地行動。
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="bg-white/10 backdrop-blur border border-white/15 rounded-xl p-4">
              <div class="text-xs text-blue-200 font-semibold">電池儲能關注度</div>
              <div class="text-2xl font-black text-amber-300 mt-1">79%</div>
              <div class="text-[11px] text-slate-300">領先光電模組 +16pp</div>
            </div>
            <div class="bg-white/10 backdrop-blur border border-white/15 rounded-xl p-4">
              <div class="text-xs text-blue-200 font-semibold">美國累計儲能裝機</div>
              <div class="text-2xl font-black text-white mt-1">215.9 GWh</div>
              <div class="text-[11px] text-slate-300">2030 上修至 708 GWh</div>
            </div>
            <div class="bg-white/10 backdrop-blur border border-white/15 rounded-xl p-4">
              <div class="text-xs text-blue-200 font-semibold">SST 單級轉換峰值</div>
              <div class="text-2xl font-black text-emerald-300 mt-1">98.86%</div>
              <div class="text-[11px] text-slate-300">直轉 800 VDC AI 算力</div>
            </div>
            <div class="bg-white/10 backdrop-blur border border-white/15 rounded-xl p-4">
              <div class="text-xs text-blue-200 font-semibold">年度冠軍新創 ROI</div>
              <div class="text-2xl font-black text-amber-300 mt-1">1/10 成本</div>
              <div class="text-[11px] text-slate-300">Magnefy >98% 準確率</div>
            </div>
          </div>
        </div>
      </div>
      ${renderPresenterNotes(1)}
    </section>
    `,

    // SLIDE 02: Pyramid Skeleton
    `
    <section data-slide="2" class="slide-card">
      <div class="p-6 md:p-8">
        <div class="mck-kicker mb-1.5">SLIDE 02｜EXECUTIVE ARCHITECTURE</div>
        <h2 class="mck-action-title mb-5">本報告採「展會現象→十大技術→十大新創→四大規律→進能服落地」五層金字塔推進</h2>
        <div class="bg-slate-50 rounded-xl p-3 border border-slate-200">
          ${S.pyramidSkeleton()}
        </div>
      </div>
      ${renderPresenterNotes(2)}
    </section>
    `,

    // SLIDE 03: Buyer Persona (Redrawn Image 1)
    `
    <section data-slide="3" class="slide-card">
      <div class="p-6 md:p-8">
        <div class="mck-kicker mb-1.5">SLIDE 03｜PART 1：展會買家畫像與重心轉移（重繪原圖 1）</div>
        <h2 class="mck-action-title mb-5">電池儲能以 79% 關注度領先光電 16 個百分點，且逾八成買家手握採購決策權</h2>
        <div class="bg-slate-50 rounded-xl p-3 border border-slate-200">
          ${S.buyerPersonaRedrawn()}
        </div>
        <div class="grid md:grid-cols-3 gap-4 mt-4 text-xs">
          <div class="p-3.5 rounded-lg bg-blue-50 border border-blue-100">
            <div class="font-bold text-blue-900 mb-1">高密度 B2B 資本與長約場域</div>
            <p class="text-slate-700">C-Suite/VP 佔 40–41%、總監級 28%，搭配 82% 採購決策權與 17% 國際買家（115+ 國），現場對話直指 GW 級長約與專案融資。</p>
          </div>
          <div class="p-3.5 rounded-lg bg-amber-50 border border-amber-100">
            <div class="font-bold text-amber-900 mb-1">儲能優先（Storage-First）確立</div>
            <p class="text-slate-700">電池儲能（79%）大幅超車太陽能模組（63%）與逆變器（55%），反映「電池是主角、光電負責幫電池充電」的商業典範轉移。</p>
          </div>
          <div class="p-3.5 rounded-lg bg-slate-100 border border-slate-200">
            <div class="font-bold text-slate-900 mb-1">工商業（C&I）成最大終端主戰場</div>
            <p class="text-slate-700">工商業終端（61%）高居服務市場首位，與本屆「資料中心＋工商業表後儲能」成為核心交易主軸高度吻合。</p>
          </div>
        </div>
      </div>
      ${renderPresenterNotes(3)}
    </section>
    `,

    // SLIDE 04: 5 Curation Upgrades & LVCC Layout
    `
    <section data-slide="4" class="slide-card">
      <div class="p-6 md:p-8">
        <div class="mck-kicker mb-1.5">SLIDE 04｜PART 1：五大策展亮點與政治經濟定調</div>
        <h2 class="mck-action-title mb-5">五大策展升級打破跨域邊界，SEIA 新定調「更多電力、更快建置」跨黨派共識</h2>
        <div class="grid md:grid-cols-3 gap-4 mb-5">
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div class="text-xs font-extrabold text-blue-700 mb-1">01 跨歐美研發轉量產</div>
            <div class="font-bold text-mckNavy text-sm mb-1.5">首創 RE+ Tech & Innovation Forum</div>
            <p class="text-xs text-slate-600 leading-relaxed">與歐洲 EU PVSEC 主辦方 WIP 結盟，直擊鈣鈦礦/矽疊層、長時儲能（LDES）、AI 能源與 O&M 跨越「實驗室→量產」鴻溝。</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div class="text-xs font-extrabold text-blue-700 mb-1">02 交通電氣化合流</div>
            <div class="font-bold text-mckNavy text-sm mb-1.5">併展 GTSE 打通車隊與微電網</div>
            <p class="text-xs text-slate-600 leading-relaxed">整合美西綠色交通高峰會，導入零排放商用車隊、重型 EV 充電與微電網買家；園區以零排放 Tesla Vegas Loop 地下隧道串聯。</p>
          </div>
          <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div class="text-xs font-extrabold text-amber-700 mb-1">03 政治經濟新論述</div>
            <div class="font-bold text-mckNavy text-sm mb-1.5">拋棄環保補助，主攻電力可負擔性</div>
            <p class="text-xs text-slate-700 leading-relaxed">SEIA 執行長 Tim Pawlenty（前共和黨州長）號召以「更多電力、更快建置、美國就業」爭取跨黨派支持；GM 副總與前 F1 副領隊對談量產韌性。</p>
          </div>
        </div>
        <!-- LVCC 4-Zone Table -->
        <div class="overflow-x-auto rounded-xl border border-slate-200">
          <table class="w-full text-xs text-left">
            <thead class="bg-mckNavy text-white">
              <tr>
                <th class="px-4 py-2.5 font-bold">LVCC 四大場館 / 軌道</th>
                <th class="px-4 py-2.5 font-bold">核心配置與代表大廠</th>
                <th class="px-4 py-2.5 font-bold">戰略價值與資本焦點</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 bg-white">
              <tr><td class="px-4 py-2.5 font-bold text-mckNavy">Central Hall 中央館</td><td class="px-4 py-2.5">Innovation Zone（50+ 新創）、焦點國家館：<b>義大利</b></td><td class="px-4 py-2.5">前沿技術孵化、全球供應鏈合規與歐美電網對接</td></tr>
              <tr><td class="px-4 py-2.5 font-bold text-mckNavy">North Hall 北館</td><td class="px-4 py-2.5">Tesla、Enphase、Delta、Sungrow、Nextpower、T1 Energy</td><td class="px-4 py-2.5">核心設備採購、NABCEP 培訓與 ROTH 第 13 屆投資論壇</td></tr>
              <tr><td class="px-4 py-2.5 font-bold text-mckNavy">West Hall 西館</td><td class="px-4 py-2.5">Storage Central、Grid Edge（EMerge）、GTSE 電動交通</td><td class="px-4 py-2.5">儲能安全構網、微電網標準與開幕主舞台演說</td></tr>
              <tr><td class="px-4 py-2.5 font-bold text-mckNavy">Silver Lot 戶外區</td><td class="px-4 py-2.5">農電共生（活體牧羊）、Enphase 雙向 V2H/V2G 實測</td><td class="px-4 py-2.5">現場實車驗證車網互動與重型戶外電力設備</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      ${renderPresenterNotes(4)}
    </section>
    `,

    // SLIDE 05: Tech #1 SST 800 VDC
    `
    <section data-slide="5" class="slide-card">
      <div class="p-6 md:p-8">
        <div class="mck-kicker mb-1.5">SLIDE 05｜PART 2：十大技術突破 #1（原創電力電子架構 SVG）</div>
        <h2 class="mck-action-title mb-4">800 VDC 固態變壓器 (SST) 引爆六強大戰，單級無油轉換終結 1–4 年變壓器交期瓶頸</h2>
        <div class="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4">
          ${S.sstArchitecture()}
        </div>
        <div class="overflow-x-auto rounded-xl border border-slate-200">
          <table class="w-full text-xs text-left">
            <thead class="bg-mckNavy text-white">
              <tr>
                <th class="px-3 py-2">廠商 / 產品</th>
                <th class="px-3 py-2">功率規模</th>
                <th class="px-3 py-2">電壓規格</th>
                <th class="px-3 py-2">效率與核心差異</th>
                <th class="px-3 py-2">交付時程與指標客戶</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 bg-white">
              <tr class="bg-blue-50/50"><td class="px-3 py-2 font-bold text-blue-900">Tesla Powercore</td><td class="px-3 py-2 font-bold">7.4 MW (10 MVA 構網)</td><td class="px-3 py-2">10–34.5kV ↔ 800–2000VDC</td><td class="px-3 py-2"><b>98.86%</b>；斷路快 1,000x；保固 25 年；NVIDIA 合作</td><td class="px-3 py-2">2027 美國投產；未公開客戶定價</td></tr>
              <tr><td class="px-3 py-2 font-bold text-mckNavy">Heron Power (Link)</td><td class="px-3 py-2">5 MW 模組化</td><td class="px-3 py-2">MV AC ↔ 800 VDC / PV</td><td class="px-3 py-2"><b>98.6%</b>；前 Tesla 高管創辦；加州 40 GW 工廠</td><td class="px-3 py-2">2027 底量產；簽 <b>Intersect 1.5 GW</b></td></tr>
              <tr class="bg-amber-50/60"><td class="px-3 py-2 font-bold text-amber-900">台達電子 (Delta) ★</td><td class="px-3 py-2">預製式直流系統</td><td class="px-3 py-2">MV AC → 800 VDC</td><td class="px-3 py-2">整合 SST+DC/DC+高倍率電池；搭省地 40% DELTerra U</td><td class="px-3 py-2">NVIDIA DSX 夥伴；2027 擴德州產線</td></tr>
              <tr><td class="px-3 py-2 font-bold text-mckNavy">陽光電源 EnerNeo</td><td class="px-3 py-2">1.5–6 MW 模組化</td><td class="px-3 py-2">MV AC → 800 VDC</td><td class="px-3 py-2">三種 AI 資料中心 BESS 架構（GFM / MV-UPS / Dual-PCS）</td><td class="px-3 py-2">RE+ 26 發布北美整合方案</td></tr>
              <tr><td class="px-3 py-2 font-bold text-mckNavy">Enphase IQ SST</td><td class="px-3 py-2">機櫃 5 MW / 滑橇 10 MW</td><td class="px-3 py-2">13.8 & 34.5kV → 800VDC</td><td class="px-3 py-2">半導體架構跨界高壓 AI 算力供電</td><td class="px-3 py-2">2027 客戶試點、2028 商用</td></tr>
              <tr><td class="px-3 py-2 font-bold text-mckNavy">MatrixSST (新創)</td><td class="px-3 py-2">3.0 MW (3,750 A)</td><td class="px-3 py-2">10–13.8kV ↔ 800VDC</td><td class="px-3 py-2">目標 <b>98.5%</b>；交期 3–6 月；xPowerOS 次毫秒構網</td><td class="px-3 py-2">2027 Q1 試點、Q4 初期出貨</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      ${renderPresenterNotes(5)}
    </section>
    `,

    // SLIDE 06: Tech #2-3 Storage >200 GWh + BAAJA (Redrawn Image 2)
    `
    <section data-slide="6" class="slide-card">
      <div class="p-6 md:p-8">
        <div class="mck-kicker mb-1.5">SLIDE 06｜PART 2：十大技術突破 #2–3（重繪原圖 2）</div>
        <h2 class="mck-action-title mb-4">美國儲能累計突破 200 GWh 且 2030 上修至 708 GWh，《BAAJA》可望解鎖 167 GW 光電</h2>
        <div class="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4">
          ${S.storageGrowthRedrawn()}
        </div>
        <div class="grid md:grid-cols-2 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div class="font-extrabold text-blue-900 mb-1.5">《BAAJA》聯邦審批改革法案（參院 62–33 通過）</div>
            <ul class="space-y-1 text-slate-700 list-disc pl-4">
              <li>簡化 NEPA 環評並賦予 FERC 跨州輸電「聯邦後盾權」，SEIA 估 2028–35 解鎖 <b>167 GW</b>。</li>
              <li><b>資料中心防火牆條款</b>：強制高耗能資料中心全額自負電網升級成本，避免轉嫁民生電價。</li>
              <li>風險校準：仍須度過眾院跛腳鴨會期與 FERC 執行 14 項立法程序之量能考驗。</li>
            </ul>
          </div>
          <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div class="font-extrabold text-amber-900 mb-1.5">表前巨單搶灘 × 表後 TPO 租賃與 VPP 逆襲</div>
            <ul class="space-y-1 text-slate-700 list-disc pl-4">
              <li><b>e-STORAGE</b> 簽 590 MW / 1.43 GWh（待執行訂單 35 億美元）；<b>LG ES Vertech</b> 擴北美產能至 70 GWh；<b>Ford Energy</b> 簽 5 年 20 GWh 框架協議。</li>
              <li>住宅 25D 抵免雖於 2025 底到期，但靠 <b>TPO 租賃（適用 48E）＋VPP 分潤</b>（Tesla 加州 VPP 年增 ~50%），2026 全年仍估達 3 GWh。</li>
            </ul>
          </div>
        </div>
      </div>
      ${renderPresenterNotes(6)}
    </section>
    `,

    // SLIDE 07: Tech #4-5 Regulatory Tsunami & Made in America
    `
    <section data-slide="7" class="slide-card">
      <div class="p-6 md:p-8">
        <div class="mck-kicker mb-1.5">SLIDE 07｜PART 2：十大技術突破 #4–5（原創合規防線 SVG）</div>
        <h2 class="mck-action-title mb-4">OBBBA/FEOC、FCC 禁令與 EO 14421 形成三重監管防線，美國製造跨越 1 GW 商業門檻</h2>
        <div class="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4">
          ${S.regulatoryTsunami()}
        </div>
        <div class="grid md:grid-cols-3 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="text-blue-700 font-extrabold mb-1">ES Foundry｜本土矽電池破 1 GW</div>
            <p class="text-slate-600 leading-relaxed">全美首家出貨破 <b>1 GW</b> 本土結晶矽電池製造商，南卡廠達 3 GW 年產能，直接與開發商簽約鎖定本土含量配額。</p>
          </div>
          <div class="p-4 rounded-xl bg-amber-50/70 border border-amber-200 shadow-sm">
            <div class="text-amber-800 font-extrabold mb-1">Nextpower NX CoreFrame｜鋼邊框 +6% ITC</div>
            <p class="text-slate-700 leading-relaxed">俄亥俄量產（目標 6.5 GW），簽下晶科/Thornova/T1。抗彎勝鋁框、碳足跡少 80%、Magnelis 耐鹽霧 25 年、48hr JIT 交貨且賺 <b>6% ITC</b>。</p>
          </div>
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div class="text-emerald-700 font-extrabold mb-1">SolarEdge 佛州廠｜2:1 雙 MPPT 優化器</div>
            <p class="text-slate-600 leading-relaxed">工商業 Duo Power Optimizer 全符合 FEOC 與 FCC 規範，減少 50% 優化器與接點並內建 Sense Connect 過溫預警。</p>
          </div>
        </div>
      </div>
      ${renderPresenterNotes(7)}
    </section>
    `,

    // SLIDE 08: Tech #6-10 Consolidated Matrix
    `
    <section data-slide="8" class="slide-card">
      <div class="p-6 md:p-8">
        <div class="mck-kicker mb-1.5">SLIDE 08｜PART 2：十大技術突破 #6–10 全景濃縮</div>
        <h2 class="mck-action-title mb-5">從大儲防火鈉電、免改電箱到全生命週期 AI 與 13.2 億美元併購，產業邁向寡占整合</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          ${D.top10Techs.slice(5, 10).map(t => `
            <div class="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition shadow-sm flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="px-2 py-0.5 rounded bg-mckNavy text-amber-300 font-extrabold text-[10px]">TECH #${t.num}｜${t.cat}</span>
                  <span class="font-bold text-blue-700">${t.metric}</span>
                </div>
                <div class="font-extrabold text-mckNavy text-sm mb-2">${t.title}</div>
                <p class="text-slate-600 leading-relaxed mb-3">${t.summary}</p>
              </div>
              <div class="pt-2.5 border-t border-slate-100 text-[11px] text-emerald-800 font-semibold">
                🇹🇼 台灣啟示：${t.twNote}
              </div>
            </div>
          `).join('')}
          <!-- Summary Insight Card -->
          <div class="p-4 rounded-xl bg-gradient-to-br from-mckNavy to-blue-900 text-white flex flex-col justify-center">
            <div class="text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-1">KEY TAKEAWAY</div>
            <div class="text-base font-extrabold mb-2">單點零組件時代結束</div>
            <p class="text-xs text-slate-200 leading-relaxed">
              ARRAY × Shoals 合併（2027 備考營收 22–24 億美元）迎戰在手訂單破 60 億美元的 Nextpower，證明未來競爭已全面升級為「結構＋電力電子＋儲能＋AI 維運」的一站式可融資平台對決。
            </p>
          </div>
        </div>
      </div>
      ${renderPresenterNotes(8)}
    </section>
    `,

    // SLIDE 09: Top 10 Startups Panorama Matrix (Redrawn Image 3)
    `
    <section data-slide="9" class="slide-card">
      <div class="p-6 md:p-8">
        <div class="mck-kicker mb-1.5">SLIDE 09｜PART 3：十大決選新創全景圖譜（重繪原圖 3・互動可點擊）</div>
        <h2 class="mck-action-title mb-4">十大新創四成鎖定電網電力電子、半數進入規模化，Magnefy 憑 1/10 成本免斷電貼片奪冠</h2>
        <div class="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4">
          ${S.startupMatrixRedrawn()}
        </div>
        <div class="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs flex flex-wrap items-center justify-between gap-3">
          <div>
            <span class="font-extrabold text-blue-900">🏆 冠軍勝出密碼（HASI × Clairvest × Mercom 專案金融評審視角）：</span>
            <span class="text-slate-700">美國 >65% 變壓器超齡且交期 >12 月，<b>Magnefy</b> 以史丹佛 GaAs 磁感貼片免斷電安裝，成本降至傳統 1/10（$500–$3,000＋$100/年）、準確率 >98%、目標 <1 年回本。</span>
          </div>
          <button onclick="openStartupModal(1)" class="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold shrink-0">查看 Magnefy 完整剖析 →</button>
        </div>
      </div>
      ${renderPresenterNotes(9)}
    </section>
    `,

    // SLIDE 10: Top 10 Startups Interactive Comparison Table
    `
    <section data-slide="10" class="slide-card">
      <div class="p-6 md:p-8">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div class="mck-kicker mb-1">SLIDE 10｜PART 3：十大新創商業模式深度對照</div>
            <h2 class="mck-action-title">十家新創涵蓋 HaaS、RaaS、純軟 SaaS 與巨頭通路槓桿，成熟度顯著分化</h2>
          </div>
          <div id="startupFilterBar" class="flex flex-wrap gap-1.5 text-xs">
            ${['全部', '電網診斷、電力電子與資安', '表後負載與屋頂整合', '實體 AI 施工與維運機器人', 'AI 能源調度與法規軟體'].map(cat => `
              <button onclick="setStartupFilter('${cat}')" class="startup-filter-btn px-2.5 py-1 rounded-full border font-semibold ${cat === '全部' ? 'bg-mckNavy text-white border-mckNavy' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'}">${cat === '全部' ? '全部 (10)' : cat.slice(0, 6)}</button>
            `).join('')}
          </div>
        </div>
        <div class="overflow-x-auto rounded-xl border border-slate-200">
          <table class="w-full text-xs text-left">
            <thead class="bg-mckNavy text-white">
              <tr>
                <th class="px-3 py-2.5"># / 新創名稱</th>
                <th class="px-3 py-2.5">階段與模式</th>
                <th class="px-3 py-2.5">核心技術與變現架構</th>
                <th class="px-3 py-2.5">關鍵量化實證</th>
                <th class="px-3 py-2.5 text-center">操作</th>
              </tr>
            </thead>
            <tbody id="startupTableBody" class="divide-y divide-slate-200 bg-white"></tbody>
          </table>
        </div>
      </div>
      ${renderPresenterNotes(10)}
    </section>
    `,

    // SLIDE 11: 4 Underlying Business Laws
    `
    <section data-slide="11" class="slide-card">
      <div class="p-6 md:p-8">
        <div class="mck-kicker mb-1.5">SLIDE 11｜PART 4：跨維度戰略總結</div>
        <h2 class="mck-action-title mb-5">「非侵入免改造、監管轉護城河、AI 算力電力化、輕資產通路槓桿」決定未來五年勝負</h2>
        <div class="grid md:grid-cols-2 gap-4">
          ${[
            { n: '01', color: 'border-blue-600 bg-blue-50/40', title: '「非侵入、免改造 (Retrofit / Drop-in)」是最強加速引擎',
              desc: 'Magnefy（免斷電變壓器貼片）、ConnectDER/Noble Carbon（5–15 分鐘免改電箱）、evPower.ai（1 分鐘免換硬體雲端接管）、SWIF Rack（免拆板不破保固）——凡能消除既有資產沉沒成本與停機阻力者，商業牽引力最快。' },
            { n: '02', color: 'border-amber-600 bg-amber-50/40', title: '監管紅利與國安壁壘已從「合規成本」反轉為「產品護城河」',
              desc: 'OBBBA/FEOC、FCC 逆變器禁令與 EO 14421 催生 LexaVolt、Fordje、ES Foundry 與 Nextpower 鋼框等原生紅利贏家。亞洲供應鏈單靠第三地組裝已難過關，須靠在地製造或 800 VDC 高值化電力電子守住入場券。' },
            { n: '03', color: 'border-emerald-600 bg-emerald-50/40', title: '「AI 算力電力化」打破光儲與資料中心基礎設施邊界',
              desc: 'AI 資料中心已是單價最高、對交期最敏感且最願為新架構買單的「超級買家」。若《BAAJA》強制自負電網升級成本生效，超大規模算力園區將更迫切自建「表後光儲＋800 VDC SST＋微電網」。' },
            { n: '04', color: 'border-indigo-600 bg-indigo-50/40', title: '硬體巨頭一站式寡占下，新創須借力「輕資產或巨頭通路」',
              desc: '面對 ARRAY+Shoals 與 Nextpower 平台霸權，硬碰硬極易陷入可融資性泥淖。SWIF Rack 綁定 Duro-Last/NRP 零外資突圍、Fordje 成為底層 API、Magnefy 低價硬體疊加 SaaS，才是最高資本效率典範。' }
          ].map(l => `
            <div class="p-5 rounded-xl border-l-4 ${l.color} border border-slate-200">
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-0.5 rounded bg-mckNavy text-amber-300 font-black text-xs">LAW ${l.n}</span>
                <h3 class="font-extrabold text-mckNavy text-sm md:text-base">${l.title}</h3>
              </div>
              <p class="text-xs text-slate-700 leading-relaxed">${l.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
      ${renderPresenterNotes(11)}
    </section>
    `,

    // SLIDE 12: Director Part I — Taiwan Localization Strategy (SVG #7)
    `
    <section data-slide="12" class="slide-card border-2 border-amber-400">
      <div class="bg-gradient-to-r from-mckNavy to-[#1E3A8A] px-6 py-3 flex items-center justify-between text-white">
        <span class="text-xs font-extrabold text-amber-300 tracking-wider">★ 新增專章｜扮演進能服事業總監（進金生能源 6692）</span>
        <span class="text-[11px] bg-amber-500 text-mckNavy font-extrabold px-2.5 py-0.5 rounded-full">台灣市場落地戰略 I</span>
      </div>
      <div class="p-6 md:p-8">
        <h2 class="mck-action-title mb-4">立足進能服既設案場與數位資產，鎖定台灣 AIDC 800VDC、表後儲能與非侵入 AI 維運三大紅利</h2>
        <div class="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4">
          ${S.directorStrategyMatrix()}
        </div>
        <div class="grid md:grid-cols-3 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div class="font-extrabold text-amber-900 mb-1">🎯 為何進能服有主場優勢？</div>
            <p class="text-slate-700 leading-relaxed">進金生能源 (6692) 已建置<b>客戶電費單資料庫</b>、<b>CF-086 智慧巡檢平台</b>與<b>運維告警戰情平台</b>，並手握中南部光電案場與 EPC 工程底氣，最能發揮「非侵入、免改造」的即戰力倍增效果。</p>
          </div>
          <div class="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div class="font-extrabold text-blue-900 mb-1">⚡ 台灣市場 3 大結構痛點對應</div>
            <p class="text-slate-700 leading-relaxed">① 台電饋線壅塞＋時間電價價差擴大 → <b>表後儲能削峰＋免費電費單模擬</b>；② 台灣 AIDC 算力廠急缺高效率供電 → <b>結盟台達 800 VDC</b>；③ 高鹽害颱風＋缺工 → <b>非侵入變壓器監測＋零重壓清洗</b>。</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-100 border border-slate-200">
            <div class="font-extrabold text-slate-900 mb-1">🚫 總監紀律：明確「不做什麼」</div>
            <p class="text-slate-700 leading-relaxed">不盲目引進尚無商轉實績、且不符台灣高濕多雨氣候的 0 度平鋪光儲地毯（Axentum）；不投入重資產大型打樁機器人自研（Cosmic），維持輕資產高毛利能源服務定位。</p>
          </div>
        </div>
      </div>
      ${renderPresenterNotes(12)}
    </section>
    `,

    // SLIDE 13: Director Part II — 4 Teams Execution Playbook
    `
    <section data-slide="13" class="slide-card border-2 border-amber-400">
      <div class="bg-gradient-to-r from-mckNavy to-[#1E3A8A] px-6 py-3 flex items-center justify-between text-white">
        <span class="text-xs font-extrabold text-amber-300 tracking-wider">★ 新增專章｜進能服事業總監：四大團隊實戰應用手冊</span>
        <span class="text-[11px] bg-amber-500 text-mckNavy font-extrabold px-2.5 py-0.5 rounded-full">團隊落地 SOP 與 KPI</span>
      </div>
      <div class="p-6 md:p-8">
        <h2 class="mck-action-title mb-5">將 RE+ 26 技術拆解至 BD、EPC、O&M 與數位 AI 四大團隊，確立 90 天可驗收 KPI</h2>
        <div class="grid md:grid-cols-2 gap-4 text-xs">
          <!-- Team 1: BD -->
          <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm border-t-4 border-t-amber-500">
            <div class="flex items-center justify-between mb-2">
              <span class="font-black text-mckNavy text-sm">1. 事業開發部（BD / 業務團隊）</span>
              <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">對標：evPower.ai / 台達</span>
            </div>
            <ul class="space-y-1.5 text-slate-700 list-disc pl-4 mb-3">
              <li><b>免費電費單 Digital Twin 獲客法</b>：利用進能服既有電費單資料庫，向用電大戶（半導體、冷鏈、傳產）免費產出「削峰填谷＋超約罰款節省 35–40%」ROI 模擬報告。</li>
              <li><b>TPO 租賃 / ESCO 分潤模式</b>：降低企業表後儲能初期 CapEx 阻力，並主動拜訪台達電子建立台灣 AIDC 800 VDC 專案聯合投標管道。</li>
            </ul>
            <div class="bg-amber-50 px-3 py-2 rounded-lg font-bold text-amber-900">📌 季度 KPI：完成 15 家大戶免費電費模擬、簽下 3 案表後儲能合約</div>
          </div>

          <!-- Team 2: EPC -->
          <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm border-t-4 border-t-blue-600">
            <div class="flex items-center justify-between mb-2">
              <span class="font-black text-mckNavy text-sm">2. EPC 工程設計與採購部</span>
              <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">對標：SWIF Rack / SolarEdge / UL LSFT</span>
            </div>
            <ul class="space-y-1.5 text-slate-700 list-disc pl-4 mb-3">
              <li><b>突破屋頂保固恐懼</b>：與台灣主流防水膜／鋼構廠結盟，推出「免破壞保固高架屋頂工法」搭配雙面模組（+12–20% 發電增益）攻佔科學園區與物流廠。</li>
              <li><b>高鹽害與極端氣候規格升級</b>：評估導入 2:1 雙 MPPT 優化器（減半接點＋過溫預警）、鋼製耐鹽霧邊框及具備 UL 大規模燃燒驗證之液冷儲能櫃。</li>
            </ul>
            <div class="bg-blue-50 px-3 py-2 rounded-lg font-bold text-blue-900">📌 季度 KPI：完成 2 家屋頂廠策略結盟、建立 AIDC 800 VDC 標準設計圖說</div>
          </div>

          <!-- Team 3: O&M -->
          <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm border-t-4 border-t-emerald-600">
            <div class="flex items-center justify-between mb-2">
              <span class="font-black text-mckNavy text-sm">3. 案場維運管理部（O&M 團隊）</span>
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">對標：Magnefy / O&M Robotics / EL-AI</span>
            </div>
            <ul class="space-y-1.5 text-slate-700 list-disc pl-4 mb-3">
              <li><b>非侵入式變壓器心電圖 PoC</b>：挑選 2 座主力 22.8kV 升壓站，免斷電安裝高頻磁場/局部放電邊緣感測，提前數月預警絕緣劣化，防範百萬級跳機損失。</li>
              <li><b>零重壓清洗與出貨 EL 全檢</b>：中南部大型地面／漁電案場導入地面行走零重壓清洗評估（防微裂紋保固糾紛），並將模組抽檢升級為 AI 100% EL 全檢。</li>
            </ul>
            <div class="bg-emerald-50 px-3 py-2 rounded-lg font-bold text-emerald-900">📌 季度 KPI：2 座升壓站 PoC 上線、清洗人力成本降 50%+、意外跳機歸零</div>
          </div>

          <!-- Team 4: Digital AI -->
          <div class="p-5 rounded-xl bg-white border border-slate-200 shadow-sm border-t-4 border-t-indigo-600">
            <div class="flex items-center justify-between mb-2">
              <span class="font-black text-mckNavy text-sm">4. 數位轉型與 AI 小組</span>
              <span class="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">對標：SiteCaptureAI / Fordje / LexaVolt</span>
            </div>
            <ul class="space-y-1.5 text-slate-700 list-disc pl-4 mb-3">
              <li><b>升級 CF-086 智慧巡檢平台</b>：導入 SiteCaptureAI 概念自動審核現場巡檢與施工照片，異常自動串聯 8D 報告派工單，退件與重複派車率降 60%。</li>
              <li><b>台灣 22 縣市法規 AI 與資安閘道</b>：結構化能源署、漁電與台電併網規則（3 分鐘出初評）；並規劃 EMS 硬體隔離閘道，對應台電資安與外商 RE100 非紅稽核。</li>
            </ul>
            <div class="bg-indigo-50 px-3 py-2 rounded-lg font-bold text-indigo-900">📌 季度 KPI：CF-086 AI 審核上線、台灣法規初評時間由 5 天壓縮至 3 分鐘</div>
          </div>
        </div>
      </div>
      ${renderPresenterNotes(13)}
    </section>
    `,

    // SLIDE 14: Live Supabase Action Tracker & Tech Evaluation Dashboard
    `
    <section data-slide="14" class="slide-card border-2 border-emerald-500">
      <div class="bg-gradient-to-r from-[#0B1F3A] to-emerald-900 px-6 py-3.5 flex flex-wrap items-center justify-between gap-2 text-white">
        <div>
          <div class="text-[11px] font-bold text-emerald-300 tracking-wider">SUPABASE BAAS LIVE INTEGRATION｜ZERO PRIVATE KEY + RLS</div>
          <div class="text-sm font-extrabold">進能服事業總監：台灣落地 8 大行動追蹤戰情室 ✕ 團隊技術評分板</div>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <span id="sbStatusBadge" class="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 font-bold">連線偵測中...</span>
          <button onclick="loadSupabaseData()" class="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 font-bold">↻ 重新同步</button>
        </div>
      </div>

      <div class="p-6 md:p-8 space-y-6">
        <!-- Live KPI Summary -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div class="text-xs text-slate-500 font-semibold">總監核定行動方案</div>
            <div id="kpiTotalActions" class="text-2xl font-black text-mckNavy mt-1">8 項</div>
          </div>
          <div class="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div class="text-xs text-blue-700 font-semibold">整體平均執行進度</div>
            <div id="kpiAvgProgress" class="text-2xl font-black text-blue-800 mt-1">21%</div>
          </div>
          <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div class="text-xs text-amber-800 font-semibold">P0 最優先快贏項目</div>
            <div id="kpiP0Count" class="text-2xl font-black text-amber-700 mt-1">4 項</div>
          </div>
          <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <div class="text-xs text-emerald-800 font-semibold">雲端團隊技術評分</div>
            <div id="kpiEvalCount" class="text-2xl font-black text-emerald-700 mt-1">3 筆</div>
          </div>
        </div>

        <!-- Action Items Tracker -->
        <div>
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 class="text-base font-extrabold text-mckNavy">📋 進能服台灣落地行動追蹤表（Supabase PostgreSQL 即時同步）</h3>
            <div class="flex flex-wrap gap-1.5 text-xs">
              ${['全部', 'Q1 快贏 (0–3M)', 'Q2–Q3 深化 (3–9M)', 'Q4+ 護城河 (9–18M)'].map(h => `
                <button onclick="setActionFilter('${h}')" class="action-filter-btn px-2.5 py-1 rounded-full border font-semibold ${h === '全部' ? 'bg-mckNavy text-white border-mckNavy' : 'bg-white text-slate-600 border-slate-300'}">${h}</button>
              `).join('')}
            </div>
          </div>
          <div class="overflow-x-auto rounded-xl border border-slate-200">
            <table class="w-full text-xs text-left">
              <thead class="bg-slate-800 text-white">
                <tr>
                  <th class="px-3 py-2.5">編號 / 優先</th>
                  <th class="px-3 py-2.5">行動方案與對應 RE+ 26 技術</th>
                  <th class="px-3 py-2.5">負責團隊 / 波段</th>
                  <th class="px-3 py-2.5">狀態與進度（登入可即時調整）</th>
                </tr>
              </thead>
              <tbody id="actionTableBody" class="divide-y divide-slate-200 bg-white"></tbody>
            </table>
          </div>
        </div>

        <!-- Team Tech Evaluations Board -->
        <div class="grid md:grid-cols-5 gap-5 pt-2">
          <div class="md:col-span-3 space-y-2.5">
            <h3 class="text-base font-extrabold text-mckNavy">💬 跨部門技術適用性評分與實戰建議</h3>
            <div id="evalList" class="space-y-2.5 max-h-72 overflow-y-auto pr-1"></div>
          </div>
          <div class="md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 class="text-sm font-extrabold text-mckNavy mb-2">➕ 新增部門技術評估（寫入 Supabase）</h4>
            <form id="evalForm" onsubmit="submitEvaluation(event)" class="space-y-2.5 text-xs">
              <select id="evalTarget" class="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-white">
                <option value="台達電子 800 VDC SST + DELTerra U 儲能">十大技術｜台達 800 VDC SST</option>
                <option value="Tesla Powercore / Heron Link SST">十大技術｜Tesla / Heron SST</option>
                <option value="表後儲能 TPO 租賃 + VPP 商業模式">十大技術｜表後儲能與 VPP</option>
                <option value="Intertek EL-AI / SiteCaptureAI 巡檢">十大技術｜EL-AI 與巡檢 AI</option>
                <option value="Magnefy (非侵入式變壓器磁場監測)">十大新創｜Magnefy (冠軍)</option>
                <option value="evPower.ai (免費 Digital Twin 模擬獲客)">十大新創｜evPower.ai</option>
                <option value="SWIF Rack (免破防水保固高架屋頂)">十大新創｜SWIF Rack</option>
                <option value="O&M Robotics (零重壓清洗機器人)">十大新創｜O&M Robotics</option>
                <option value="Fordje (AI 法規合規引擎)">十大新創｜Fordje</option>
                <option value="LexaVolt (邊緣資安隔離閘道)">十大新創｜LexaVolt</option>
              </select>
              <div class="grid grid-cols-2 gap-2">
                <input id="evalReviewer" type="text" required placeholder="您的姓名 / 職稱" class="px-2.5 py-2 rounded-lg border border-slate-300 bg-white"/>
                <select id="evalDept" class="px-2.5 py-2 rounded-lg border border-slate-300 bg-white">
                  <option>事業開發部 (BD)</option>
                  <option>EPC 工程設計部</option>
                  <option>維運管理部 (O&M)</option>
                  <option>數位 AI 小組</option>
                  <option>策略與高階主管</option>
                </select>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <label class="bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 flex items-center justify-between">
                  <span class="font-semibold text-slate-600">台灣適配 (1–5)</span>
                  <input id="evalFit" type="number" min="1" max="5" value="5" class="w-10 text-center font-bold text-blue-700"/>
                </label>
                <label class="bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 flex items-center justify-between">
                  <span class="font-semibold text-slate-600">急迫性 (1–5)</span>
                  <input id="evalUrgency" type="number" min="1" max="5" value="4" class="w-10 text-center font-bold text-amber-700"/>
                </label>
              </div>
              <textarea id="evalComment" rows="2" required placeholder="填寫台灣案場導入建議、潛在客戶或風險提醒..." class="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-white"></textarea>
              <button type="submit" class="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold">送出並同步至 Supabase 雲端</button>
              <div id="evalHint" class="text-[11px] text-slate-500">※ 依 RLS 安全政策，寫入前需先透過右上角完成 Supabase 登入。</div>
            </form>
          </div>
        </div>
      </div>
      ${renderPresenterNotes(14)}
    </section>
    `
  ];
}

// ---------------- Render & Navigation ----------------
function renderApp() {
  const container = document.getElementById('slidesContainer');
  container.innerHTML = buildAllSlides().join('');

  // Populate Slide Selector
  const select = document.getElementById('slideSelect');
  select.innerHTML = D.slidesMeta.map(m =>
    `<option value="${m.id}">S${String(m.id).padStart(2, '0')}｜${m.chapter}：${m.title.slice(0, 24)}...</option>`
  ).join('');

  renderStartupsTable();
  renderActionsTable();
  renderEvaluationsList();
  applyViewVisibility();
}

function applyViewVisibility() {
  const sections = document.querySelectorAll('#slidesContainer section[data-slide]');
  const navBar = document.getElementById('deckNavBar');
  const btnDeck = document.getElementById('btnModeDeck');
  const btnScroll = document.getElementById('btnModeScroll');

  if (state.viewMode === 'deck') {
    navBar.classList.remove('hidden');
    btnDeck.className = 'px-2.5 py-1 rounded-md bg-blue-600 text-white transition';
    btnScroll.className = 'px-2.5 py-1 rounded-md text-slate-300 hover:text-white transition';
    sections.forEach(sec => {
      const id = Number(sec.getAttribute('data-slide'));
      sec.classList.toggle('hidden', id !== state.currentSlide);
    });
    document.getElementById('slideSelect').value = String(state.currentSlide);
    document.getElementById('slideCounter').textContent = `${String(state.currentSlide).padStart(2, '0')} / 14`;
    document.getElementById('progressBar').style.width = `${(state.currentSlide / 14) * 100}%`;
  } else {
    navBar.classList.add('hidden');
    btnScroll.className = 'px-2.5 py-1 rounded-md bg-blue-600 text-white transition';
    btnDeck.className = 'px-2.5 py-1 rounded-md text-slate-300 hover:text-white transition';
    sections.forEach(sec => sec.classList.remove('hidden'));
  }
}

window.setViewMode = function(mode) {
  state.viewMode = mode;
  applyViewVisibility();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.goToSlide = function(num) {
  state.currentSlide = Math.max(1, Math.min(14, num));
  if (state.viewMode === 'deck') {
    applyViewVisibility();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const el = document.querySelector(`section[data-slide="${state.currentSlide}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

window.nextSlide = () => goToSlide(state.currentSlide + 1);
window.prevSlide = () => goToSlide(state.currentSlide - 1);

window.toggleNotes = function() {
  state.showNotes = !state.showNotes;
  document.getElementById('notesStateLabel').textContent = state.showNotes ? '開' : '關';
  document.getElementById('notesStateLabel').className = state.showNotes ? 'text-emerald-400' : 'text-slate-400';
  document.querySelectorAll('.presenter-notes').forEach(el => el.classList.toggle('hidden', !state.showNotes));
};

// ---------------- 10-Minute Timer ----------------
function updateTimerUI() {
  const m = String(Math.floor(state.timerSeconds / 60)).padStart(2, '0');
  const s = String(state.timerSeconds % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${m}:${s}`;
}
window.toggleTimer = function() {
  if (state.timerRunning) {
    clearInterval(state.timerInterval);
    state.timerRunning = false;
  } else {
    state.timerRunning = true;
    state.timerInterval = setInterval(() => {
      if (state.timerSeconds > 0) {
        state.timerSeconds--;
        updateTimerUI();
      } else {
        clearInterval(state.timerInterval);
        state.timerRunning = false;
      }
    }, 1000);
  }
};
window.resetTimer = function() {
  clearInterval(state.timerInterval);
  state.timerRunning = false;
  state.timerSeconds = 600;
  updateTimerUI();
};

// ---------------- Startups Table & Modal ----------------
window.setStartupFilter = function(cat) {
  state.startupFilter = cat;
  document.querySelectorAll('.startup-filter-btn').forEach(btn => {
    const isMatch = (cat === '全部' && btn.textContent.startsWith('全部')) || btn.textContent.startsWith(cat.slice(0, 6));
    btn.className = `startup-filter-btn px-2.5 py-1 rounded-full border font-semibold ${isMatch ? 'bg-mckNavy text-white border-mckNavy' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'}`;
  });
  renderStartupsTable();
};

function renderStartupsTable() {
  const tbody = document.getElementById('startupTableBody');
  if (!tbody) return;
  const list = state.startupFilter === '全部' ? D.startups : D.startups.filter(s => s.chain === state.startupFilter);
  tbody.innerHTML = list.map(s => `
    <tr class="hover:bg-blue-50/40 transition ${s.rank === 1 ? 'bg-blue-50/30' : ''}">
      <td class="px-3 py-2.5">
        <div class="font-extrabold text-mckNavy">${s.rank}. ${s.name}</div>
        <span class="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold ${s.rank === 1 ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}">${s.badge}</span>
      </td>
      <td class="px-3 py-2.5">
        <div class="font-bold text-slate-800">${s.stage.split('｜')[0]}</div>
        <div class="text-[11px] text-slate-500">${s.modelType}</div>
      </td>
      <td class="px-3 py-2.5 max-w-xs">
        <div class="font-semibold text-slate-800">${s.tech}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">${s.bizModel}</div>
      </td>
      <td class="px-3 py-2.5 max-w-xs text-slate-700">${s.proof}</td>
      <td class="px-3 py-2.5 text-center">
        <button onclick="openStartupModal(${s.rank})" class="px-2.5 py-1 rounded-lg bg-mckNavy hover:bg-blue-800 text-white font-bold text-[11px]">深度剖析</button>
      </td>
    </tr>
  `).join('');
}

window.openStartupModal = function(rank) {
  const s = D.startups.find(x => x.rank === rank);
  if (!s) return;
  document.getElementById('startupModalContent').innerHTML = `
    <div class="flex items-start justify-between gap-3 mb-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="px-2.5 py-0.5 rounded-full bg-mckNavy text-amber-300 text-xs font-extrabold">#${s.rank}｜${s.badge}</span>
          <span class="text-xs font-bold text-blue-700">${s.stage}</span>
        </div>
        <h3 class="text-2xl font-black text-mckNavy">${s.name}</h3>
        <div class="text-xs text-slate-500 mt-0.5">${s.hq} ｜ 融資：${s.funding}</div>
      </div>
      <button onclick="closeStartupModal()" class="text-slate-400 hover:text-slate-800 text-2xl font-bold leading-none">&times;</button>
    </div>
    <div class="space-y-3 text-xs leading-relaxed">
      <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
        <div class="font-extrabold text-mckNavy mb-1">核心產品與技術護城河</div>
        <p class="text-slate-700">${s.tech}</p>
      </div>
      <div class="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
        <div class="font-extrabold text-blue-900 mb-1">商業變現模式與實證數據</div>
        <p class="text-slate-700 mb-1.5"><b>模式：</b>${s.bizModel}</p>
        <p class="text-slate-700"><b>實證：</b>${s.proof}</p>
      </div>
      <div class="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
        <div class="font-extrabold text-rose-900 mb-1">主要挑戰與風險校準</div>
        <p class="text-slate-700">${s.risk}</p>
      </div>
      <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-300">
        <div class="font-extrabold text-amber-900 mb-1">★ 進能服事業總監台灣落地評析</div>
        <p class="text-slate-800 font-medium">${s.twAction}</p>
      </div>
    </div>
  `;
  document.getElementById('startupModal').classList.remove('hidden');
};
window.closeStartupModal = () => document.getElementById('startupModal').classList.add('hidden');

// ---------------- Supabase Live Data & Auth ----------------
window.loadSupabaseData = async function() {
  const badge = document.getElementById('sbStatusBadge');
  if (!sbClient) {
    if (badge) badge.textContent = '離線備援模式';
    return;
  }
  try {
    const [actRes, evalRes] = await Promise.all([
      sbClient.from('replus26_action_items').select('*').order('code', { ascending: true }),
      sbClient.from('replus26_tech_evaluations').select('*').order('created_at', { ascending: false })
    ]);
    if (!actRes.error && actRes.data && actRes.data.length > 0) {
      state.actions = actRes.data;
      state.sbConnected = true;
    }
    if (!evalRes.error && evalRes.data) {
      state.evaluations = evalRes.data;
    }
    if (badge) {
      badge.textContent = state.sbConnected ? '● Supabase 雲端已同步' : '離線備援模式';
    }
    renderActionsTable();
    renderEvaluationsList();
  } catch (err) {
    console.error('Supabase fetch error:', err);
    if (badge) badge.textContent = '雲端連線異常（顯示本機資料）';
  }
};

window.setActionFilter = function(h) {
  state.actionHorizonFilter = h;
  document.querySelectorAll('.action-filter-btn').forEach(btn => {
    btn.className = `action-filter-btn px-2.5 py-1 rounded-full border font-semibold ${btn.textContent === h ? 'bg-mckNavy text-white border-mckNavy' : 'bg-white text-slate-600 border-slate-300'}`;
  });
  renderActionsTable();
};

function renderActionsTable() {
  const tbody = document.getElementById('actionTableBody');
  if (!tbody) return;
  const list = state.actionHorizonFilter === '全部'
    ? state.actions
    : state.actions.filter(a => a.horizon === state.actionHorizonFilter);

  // Update KPIs
  const total = state.actions.length;
  const avg = total ? Math.round(state.actions.reduce((acc, a) => acc + Number(a.progress || 0), 0) / total) : 0;
  const p0 = state.actions.filter(a => a.priority === 'P0').length;
  const kpiT = document.getElementById('kpiTotalActions');
  if (kpiT) {
    kpiT.textContent = `${total} 項`;
    document.getElementById('kpiAvgProgress').textContent = `${avg}%`;
    document.getElementById('kpiP0Count').textContent = `${p0} 項`;
    document.getElementById('kpiEvalCount').textContent = `${state.evaluations.length} 筆`;
  }

  const statuses = ['待啟動', '評估中', 'PoC試點中', '已導入量產', '暫緩'];
  tbody.innerHTML = list.map(a => `
    <tr class="hover:bg-slate-50">
      <td class="px-3 py-3 whitespace-nowrap">
        <div class="font-mono font-extrabold text-mckNavy">${a.code}</div>
        <span class="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${a.priority === 'P0' ? 'bg-rose-100 text-rose-700' : a.priority === 'P1' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}">${a.priority}</span>
      </td>
      <td class="px-3 py-3">
        <div class="font-bold text-mckNavy">${a.title}</div>
        <div class="text-[11px] text-blue-700 font-semibold mt-0.5">對標技術：${a.replus_tech}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">KPI：${a.target_kpi || ''}</div>
      </td>
      <td class="px-3 py-3 whitespace-nowrap">
        <div class="font-semibold text-slate-800">${a.owner_team}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">${a.horizon}</div>
      </td>
      <td class="px-3 py-3 min-w-[180px]">
        <div class="flex items-center gap-2 mb-1.5">
          <select ${state.user ? '' : 'disabled'} onchange="updateActionField('${a.code}', 'status', this.value)"
            class="px-2 py-1 rounded border text-[11px] font-bold ${state.user ? 'bg-white border-blue-400 text-mckNavy cursor-pointer' : 'bg-slate-100 border-slate-200 text-slate-600'}">
            ${statuses.map(st => `<option value="${st}" ${a.status === st ? 'selected' : ''}>${st}</option>`).join('')}
          </select>
          <span class="font-mono font-extrabold text-blue-700">${a.progress}%</span>
        </div>
        <input type="range" min="0" max="100" step="5" value="${a.progress}" ${state.user ? '' : 'disabled'}
          onchange="updateActionField('${a.code}', 'progress', Number(this.value))"
          class="w-full accent-blue-600 ${state.user ? 'cursor-pointer' : 'opacity-60'}"/>
      </td>
    </tr>
  `).join('');
}

window.updateActionField = async function(code, field, value) {
  if (!state.user || !sbClient) {
    openAuthModal();
    return;
  }
  const { error } = await sbClient
    .from('replus26_action_items')
    .update({ [field]: value, updated_by: state.user.email, updated_at: new Date().toISOString() })
    .eq('code', code);
  if (error) {
    alert('更新失敗：' + error.message);
  } else {
    const item = state.actions.find(a => a.code === code);
    if (item) item[field] = value;
    renderActionsTable();
  }
};

function renderEvaluationsList() {
  const el = document.getElementById('evalList');
  if (!el) return;
  if (!state.evaluations.length) {
    el.innerHTML = `<div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">尚無評估紀錄，歡迎登入後新增第一筆部門評估。</div>`;
    return;
  }
  el.innerHTML = state.evaluations.map(ev => `
    <div class="p-3.5 rounded-xl bg-white border border-slate-200 text-xs shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
        <span class="font-extrabold text-mckNavy">${ev.target_name}</span>
        <div class="flex gap-1.5">
          <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold">台灣適配 ${ev.tw_fit_score}/5</span>
          <span class="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold">急迫性 ${ev.urgency_score}/5</span>
        </div>
      </div>
      <p class="text-slate-700 leading-relaxed mb-1.5">${ev.comment}</p>
      <div class="text-[10px] text-slate-400">${ev.reviewer_name}（${ev.department}）• ${new Date(ev.created_at).toLocaleDateString('zh-TW')}</div>
    </div>
  `).join('');
}

window.submitEvaluation = async function(e) {
  e.preventDefault();
  if (!state.user || !sbClient) {
    alert('依 Supabase RLS 安全規範，請先點擊右上角「登入編輯」完成身分驗證！');
    openAuthModal();
    return;
  }
  const targetVal = document.getElementById('evalTarget').value;
  const isStartup = document.getElementById('evalTarget').selectedOptions[0].text.startsWith('十大新創');
  const payload = {
    target_name: targetVal,
    target_type: isStartup ? '十大新創' : '十大技術',
    reviewer_name: document.getElementById('evalReviewer').value.trim(),
    department: document.getElementById('evalDept').value,
    tw_fit_score: Number(document.getElementById('evalFit').value),
    urgency_score: Number(document.getElementById('evalUrgency').value),
    comment: document.getElementById('evalComment').value.trim(),
    user_id: state.user.id
  };
  const { error } = await sbClient.from('replus26_tech_evaluations').insert([payload]);
  if (error) {
    alert('寫入失敗：' + error.message);
  } else {
    document.getElementById('evalComment').value = '';
    await loadSupabaseData();
  }
};

// ---------------- Auth Modal ----------------
window.openAuthModal = () => document.getElementById('authModal').classList.remove('hidden');
window.closeAuthModal = () => document.getElementById('authModal').classList.add('hidden');
window.openSqlModal = () => document.getElementById('sqlModal').classList.remove('hidden');
window.closeSqlModal = () => document.getElementById('sqlModal').classList.add('hidden');

function syncAuthUI(user) {
  state.user = user || null;
  const label = document.getElementById('authBtnLabel');
  const loggedBox = document.getElementById('authLoggedInBox');
  const form = document.getElementById('authForm');
  const hint = document.getElementById('evalHint');
  if (state.user) {
    label.textContent = `已登入：${state.user.email.split('@')[0]}`;
    document.getElementById('authUserEmail').textContent = state.user.email;
    loggedBox.classList.remove('hidden');
    form.classList.add('hidden');
    if (hint) hint.textContent = `✓ 已登入 (${state.user.email})，可直接寫入雲端資料庫。`;
  } else {
    label.textContent = 'Supabase 登入編輯';
    loggedBox.classList.add('hidden');
    form.classList.remove('hidden');
  }
  renderActionsTable();
}

window.handleAuthSubmit = async function(e) {
  e.preventDefault();
  if (!sbClient) return;
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const msg = document.getElementById('authMessage');
  msg.classList.remove('hidden');
  msg.className = 'text-xs p-2.5 rounded-lg bg-blue-50 text-blue-800';
  msg.textContent = '驗證中...';

  const res = window._authMode === 'signup'
    ? await sbClient.auth.signUp({ email, password })
    : await sbClient.auth.signInWithPassword({ email, password });

  if (res.error) {
    msg.className = 'text-xs p-2.5 rounded-lg bg-rose-50 text-rose-700';
    msg.textContent = '驗證失敗：' + res.error.message;
  } else {
    msg.className = 'text-xs p-2.5 rounded-lg bg-emerald-50 text-emerald-800';
    msg.textContent = window._authMode === 'signup' ? '註冊成功！若需信箱確認請查看信件。' : '登入成功！已解鎖雲端編輯權限。';
    syncAuthUI(res.data.user);
    setTimeout(closeAuthModal, 900);
  }
};

window.handleSignOut = async function() {
  if (sbClient) await sbClient.auth.signOut();
  syncAuthUI(null);
  closeAuthModal();
};

// ---------------- Global Search ----------------
function setupGlobalSearch() {
  const input = document.getElementById('globalSearchInput');
  const drop = document.getElementById('searchDropdown');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { drop.classList.add('hidden'); return; }
    const hits = [];
    D.slidesMeta.forEach(m => {
      if ((m.title + m.chapter + m.notes.conclusion + m.notes.detail).toLowerCase().includes(q)) {
        hits.push({ type: `Slide ${String(m.id).padStart(2,'0')}`, title: m.title, action: () => goToSlide(m.id) });
      }
    });
    D.startups.forEach(s => {
      if ((s.name + s.tech + s.bizModel + s.twAction).toLowerCase().includes(q)) {
        hits.push({ type: '十大新創', title: `${s.name} — ${s.badge}`, action: () => openStartupModal(s.rank) });
      }
    });
    state.actions.forEach(a => {
      if ((a.code + a.title + a.replus_tech + a.owner_team).toLowerCase().includes(q)) {
        hits.push({ type: a.code, title: a.title, action: () => goToSlide(14) });
      }
    });
    if (!hits.length) {
      drop.innerHTML = `<div class="p-3 text-xs text-slate-400">找不到符合「${q}」的內容</div>`;
    } else {
      drop.innerHTML = hits.slice(0, 8).map((h, i) => `
        <button data-hit="${i}" class="w-full text-left px-3 py-2.5 hover:bg-blue-50 flex items-start gap-2">
          <span class="px-1.5 py-0.5 rounded bg-slate-100 text-mckNavy font-bold text-[10px] shrink-0">${h.type}</span>
          <span class="text-xs font-medium text-slate-800 line-clamp-2">${h.title}</span>
        </button>
      `).join('');
      drop.querySelectorAll('button[data-hit]').forEach(btn => {
        btn.onclick = () => {
          hits[Number(btn.getAttribute('data-hit'))].action();
          drop.classList.add('hidden');
          input.value = '';
        };
      });
    }
    drop.classList.remove('hidden');
  });
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !drop.contains(e.target)) drop.classList.add('hidden');
  });
}

// ---------------- Keyboard Shortcuts & Boot ----------------
document.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
  if (state.viewMode === 'deck') {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  renderApp();
  setupGlobalSearch();
  if (sbClient) {
    const { data } = await sbClient.auth.getUser();
    syncAuthUI(data?.user);
    sbClient.auth.onAuthStateChange((_ev, session) => syncAuthUI(session?.user));
  }
  await loadSupabaseData();
});
