// 7 張高解析麥肯錫顧問風格原創與重繪 SVG 圖表模組
// 包含完整精準重繪原報告 3 張核心圖表 (Image 1, 2, 3) + 4 張原創工程/政策/總監戰略 SVG

window.REPLUS_SVGS = {
  // SVG 01: 全報告 SCQA 金字塔架構圖
  pyramidSkeleton() {
    return `
    <svg viewBox="0 0 960 340" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="navyGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0B1F3A"/>
          <stop offset="100%" stop-color="#1E3A8A"/>
        </linearGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#B45309"/>
          <stop offset="100%" stop-color="#D97706"/>
        </linearGradient>
        <filter id="cardShadow" x="-4%" y="-6%" width="108%" height="118%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0F172A" flood-opacity="0.08"/>
        </filter>
      </defs>

      <!-- Top Pyramid Conclusion Banner -->
      <rect x="40" y="14" width="880" height="58" rx="10" fill="url(#navyGrad)" filter="url(#cardShadow)"/>
      <text x="64" y="38" fill="#FCD34D" font-size="11" font-weight="700" letter-spacing="1.5">EXECUTIVE CORE THESIS｜核心頂層結論</text>
      <text x="64" y="59" fill="#FFFFFF" font-size="15.5" font-weight="700">北美清潔能源正式告別補貼減碳敘事，轉入「AI 算力供電 × 儲能優先 × 非紅合規」電力基建競賽</text>

      <!-- Connecting Lines -->
      <path d="M480 72 L480 96 M130 96 L830 96 M130 96 L130 112 M305 96 L305 112 M480 96 L480 112 M655 96 L655 112 M830 96 L830 112" stroke="#94A3B8" stroke-width="1.8" fill="none"/>

      <!-- 5 Pillars -->
      ${[
        { x: 40,  step: 'PART 1｜S3–S4', title: '展會結構轉向', color: '#1D4ED8', items: ['37,000 人 / 82% 採購權', '儲能 79% > 光電 63%', 'C&I 工商業 61% 居冠', '跨黨派電力可負擔敘事'] },
        { x: 215, step: 'PART 2｜S5–S8', title: '十大技術突破', color: '#0284C7', items: ['800 VDC SST 六強大戰', '美國儲能破 200 GWh', '三重去中化監管海嘯', 'AI 代理與巨頭 13.2B 整併'] },
        { x: 390, step: 'PART 3｜S9–S10', title: '十大決選新創', color: '#0F766E', items: ['Magnefy 1/10 成本奪冠', '4 成鎖定電網電力電子', '5 成進入商業規模化', 'HaaS / RaaS / API 分化'] },
        { x: 565, step: 'PART 4｜S11', title: '四大商業規律', color: '#4338CA', items: ['非侵入免改造最快變現', '監管合規反轉護城河', 'AI 算力成超級買家', '輕資產或巨頭通路槓桿'] },
        { x: 740, step: 'PART 5｜S12–S14', title: '進能服台灣落地', color: '#D97706', items: ['3×3 台灣市場戰略矩陣', '台達 800VDC / 表後儲能', '四大團隊 SOP 與 KPI', 'Supabase 雲端即時追蹤'] }
      ].map((p, idx) => `
        <g filter="url(#cardShadow)">
          <rect x="${p.x}" y="112" width="166" height="170" rx="10" fill="#FFFFFF" stroke="${idx === 4 ? '#D97706' : '#E2E8F0'}" stroke-width="${idx === 4 ? '2' : '1.2'}"/>
          <rect x="${p.x}" y="112" width="166" height="36" rx="10" fill="${p.color}"/>
          <rect x="${p.x}" y="138" width="166" height="10" fill="${p.color}"/>
          <text x="${p.x + 12}" y="128" fill="#E2E8F0" font-size="9.5" font-weight="700">${p.step}</text>
          <text x="${p.x + 12}" y="143" fill="#FFFFFF" font-size="13" font-weight="700">${p.title}</text>
          ${p.items.map((it, i) => `
            <circle cx="${p.x + 14}" cy="${170 + i * 26}" r="3" fill="${p.color}"/>
            <text x="${p.x + 24}" y="${174 + i * 26}" fill="#334155" font-size="11" font-weight="500">${it}</text>
          `).join('')}
        </g>
      `).join('')}

      <!-- Bottom Flow Arrow -->
      <rect x="40" y="298" width="880" height="30" rx="6" fill="#F1F5F9"/>
      <text x="480" y="317" text-anchor="middle" fill="#334155" font-size="11.5" font-weight="600">
        閱讀節奏：14 頁 × 40–45 秒 = 10 分鐘高階決策簡報  ｜  所有數據 100% 忠於 RE+ 26 報告實績與媒體實證
      </text>
    </svg>`;
  },

  // SVG 02: 重繪原圖 1 — RE+ 與會者買家畫像與技術關注度 (100% 保留所有真實數據)
  buyerPersonaRedrawn() {
    const techs = [
      { label: '電池儲能 (Batteries)', pct: 79, color: '#1D4ED8', tag: '領先模組 +16pp' },
      { label: '太陽能模組 (PV Modules)', pct: 63, color: '#0284C7' },
      { label: '逆變器 (Inverters)', pct: 55, color: '#0284C7' },
      { label: '支架與安裝系統', pct: 41, color: '#64748B' },
      { label: '微電網技術', pct: 40, color: '#64748B' },
      { label: '能源軟體', pct: 34, color: '#64748B' },
      { label: '電動車技術', pct: 31, color: '#94A3B8' },
      { label: '負載管理技術', pct: 30, color: '#94A3B8' },
      { label: '風能技術', pct: 28, color: '#94A3B8' },
      { label: '燃料電池', pct: 26, color: '#94A3B8' },
      { label: '電解槽 (氫能)', pct: 12, color: '#CBD5E1' }
    ];
    const industries = [
      { label: 'EPC 工程總包', pct: 20, color: '#1D4ED8' },
      { label: '設備製造商', pct: 13, color: '#64748B' },
      { label: '顧問機構', pct: 9, color: '#94A3B8' },
      { label: '安裝商', pct: 9, color: '#94A3B8' },
      { label: '專案開發商', pct: 9, color: '#94A3B8' },
      { label: '獨立發電商 (IPP)', pct: 7, color: '#94A3B8' },
      { label: '經銷商', pct: 6, color: '#CBD5E1' },
      { label: '金融與投資機構', pct: 5, color: '#CBD5E1' }
    ];
    const markets = [
      { label: '工商業 (C&I)', pct: 61, color: '#1D4ED8' },
      { label: '住宅用戶', pct: 48, color: '#64748B' },
      { label: '民營電力公司 (IOUs)', pct: 46, color: '#64748B' },
      { label: '電力合作社 (Co-ops)', pct: 23, color: '#94A3B8' },
      { label: '市政電力 (Munis)', pct: 9, color: '#CBD5E1' }
    ];

    return `
    <svg viewBox="0 0 960 520" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Top KPI Strip -->
      ${[
        { x: 16,  k: '預期與基準與會人數', v: '37,000', sub: '來自 115+ 國' },
        { x: 252, k: '參展商規模', v: '1,300+', sub: 'RE+ 25 實績 1,325 家' },
        { x: 488, k: '具備採購決策權', v: '82%', sub: '純 B2B 專業買家' },
        { x: 724, k: 'C-Suite 與副總裁級', v: '40%–41%', sub: '總監級另佔 28%' }
      ].map(c => `
        <rect x="${c.x}" y="8" width="220" height="72" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1"/>
        <text x="${c.x + 14}" y="27" fill="#64748B" font-size="10.5" font-weight="600">${c.k}</text>
        <text x="${c.x + 14}" y="54" fill="#0B1F3A" font-size="22" font-weight="800">${c.v}</text>
        <text x="${c.x + 14}" y="71" fill="#475569" font-size="10">${c.sub}</text>
      `).join('')}

      <!-- Left Panel: Technology Interest (11 bars) -->
      <rect x="16" y="94" width="538" height="408" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="32" y="118" fill="#0B1F3A" font-size="13" font-weight="700">與會者關注之產品與技術領域（複選比例）</text>
      <circle cx="350" cy="114" r="4" fill="#1D4ED8"/><text x="358" y="118" fill="#475569" font-size="10">儲能焦點</text>
      <circle cx="412" cy="114" r="4" fill="#0284C7"/><text x="420" y="118" fill="#475569" font-size="10">核心光電</text>
      <circle cx="474" cy="114" r="4" fill="#64748B"/><text x="482" y="118" fill="#475569" font-size="10">延伸技術</text>

      <!-- Grid lines -->
      ${[0, 25, 50, 75, 100].map(g => {
        const gx = 186 + g * 3.1;
        return `<line x1="${gx}" y1="130" x2="${gx}" y2="472" stroke="#F1F5F9" stroke-width="1"/>
                <text x="${gx}" y="488" text-anchor="middle" fill="#94A3B8" font-size="9.5">${g}%</text>`;
      }).join('')}

      ${techs.map((t, i) => {
        const y = 138 + i * 30;
        const w = t.pct * 3.1;
        return `
          <text x="178" y="${y + 14}" text-anchor="end" fill="${i === 0 ? '#1D4ED8' : '#334155'}" font-size="11" font-weight="${i === 0 ? '700' : '500'}">${t.label}</text>
          <rect x="186" y="${y + 2}" width="${w}" height="17" rx="3" fill="${t.color}"/>
          <text x="${192 + w}" y="${y + 14}" fill="${i === 0 ? '#1D4ED8' : '#334155'}" font-size="11" font-weight="700">${t.pct}%</text>
          ${t.tag ? `<rect x="${222 + w}" y="${y + 1}" width="84" height="18" rx="9" fill="#DBEAFE"/><text x="${264 + w}" y="${y + 13}" text-anchor="middle" fill="#1D4ED8" font-size="9.5" font-weight="700">${t.tag}</text>` : ''}
        `;
      }).join('')}

      <!-- Right Top Panel: Industry Distribution -->
      <rect x="568" y="94" width="376" height="224" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="584" y="118" fill="#0B1F3A" font-size="13" font-weight="700">主要與會產業別分布（前 8 大）</text>
      ${industries.map((ind, i) => {
        const y = 132 + i * 22;
        const w = ind.pct * 9.5;
        return `
          <text x="694" y="${y + 12}" text-anchor="end" fill="${i === 0 ? '#1D4ED8' : '#334155'}" font-size="10.5" font-weight="${i === 0 ? '700' : '500'}">${ind.label}</text>
          <rect x="702" y="${y + 2}" width="${w}" height="13" rx="3" fill="${ind.color}"/>
          <text x="${708 + w}" y="${y + 12}" fill="${i === 0 ? '#1D4ED8' : '#475569'}" font-size="10.5" font-weight="700">${ind.pct}%</text>
        `;
      }).join('')}

      <!-- Right Bottom Panel: End Markets -->
      <rect x="568" y="330" width="376" height="172" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="584" y="354" fill="#0B1F3A" font-size="13" font-weight="700">主要服務終端市場（複選比例）</text>
      ${markets.map((m, i) => {
        const y = 370 + i * 24;
        const w = m.pct * 2.9;
        return `
          <text x="708" y="${y + 13}" text-anchor="end" fill="${i === 0 ? '#1D4ED8' : '#334155'}" font-size="10.5" font-weight="${i === 0 ? '700' : '500'}">${m.label}</text>
          <rect x="716" y="${y + 2}" width="${w}" height="14" rx="3" fill="${m.color}"/>
          <text x="${722 + w}" y="${y + 13}" fill="${i === 0 ? '#1D4ED8' : '#475569'}" font-size="10.5" font-weight="700">${m.pct}%</text>
        `;
      }).join('')}

      <text x="16" y="515" fill="#64748B" font-size="9.5">重繪自原報告圖 1｜資料基準：RE+ 25 官方展後實績暨 RE+ 26 策展基準（SEIA / SEPA / Vendelux）</text>
    </svg>`;
  },

  // SVG 03: 原創工程架構 — 800 VDC 固態變壓器 (SST) vs 傳統多級交流架構
  sstArchitecture() {
    return `
    <svg viewBox="0 0 960 320" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Legacy Architecture Row -->
      <rect x="16" y="12" width="928" height="122" rx="10" fill="#FEF2F2" stroke="#FECACA" stroke-width="1.2"/>
      <text x="32" y="34" fill="#991B1B" font-size="12" font-weight="700">傳統多級交流架構（Legacy Multi-Stage AC）— 轉換損耗翻倍、佔地龐大、油浸變壓器交期長達 1–4 年</text>
      ${[
        { x: 32,  w: 138, t1: '中壓電網', t2: '10–34.5 kVAC' },
        { x: 204, w: 158, t1: '油浸式變壓器', t2: '交期 1–4 年 / 漏油風險' },
        { x: 396, w: 148, t1: '480 VAC 配電盤', t2: '大量銅纜與工時' },
        { x: 578, w: 156, t1: '獨立逆變/整流器', t2: 'AC↔DC 二次轉換損耗' },
        { x: 768, w: 160, t1: 'AI 機櫃 / 儲能', t2: '系統效率折損 4–6%' }
      ].map((b, i) => `
        <rect x="${b.x}" y="48" width="${b.w}" height="68" rx="8" fill="#FFFFFF" stroke="#FCA5A5"/>
        <text x="${b.x + b.w/2}" y="76" text-anchor="middle" fill="#7F1D1D" font-size="12" font-weight="700">${b.t1}</text>
        <text x="${b.x + b.w/2}" y="96" text-anchor="middle" fill="#991B1B" font-size="10">${b.t2}</text>
        ${i < 4 ? `<path d="M${b.x + b.w + 4} 82 L${b.x + b.w + 26} 82" stroke="#EF4444" stroke-width="2" marker-end="url(#arrRed)"/>` : ''}
      `).join('')}

      <!-- SST 800 VDC Architecture Row -->
      <rect x="16" y="148" width="928" height="156" rx="10" fill="#EFF6FF" stroke="#93C5FD" stroke-width="1.5"/>
      <text x="32" y="172" fill="#1E3A8A" font-size="12.5" font-weight="800">RE+ 26 新典範：SiC 中壓固態變壓器 (SST) 單級無油架構 — 峰值效率達 98.86%、斷路快 1,000 倍</text>

      <!-- Left: MV Grid -->
      <rect x="32" y="190" width="146" height="94" rx="8" fill="#0B1F3A"/>
      <text x="105" y="230" text-anchor="middle" fill="#93C5FD" font-size="11" font-weight="700">中壓交流電網</text>
      <text x="105" y="252" text-anchor="middle" fill="#FFFFFF" font-size="14" font-weight="800">10–34.5 kVAC</text>

      <path d="M182 237 L224 237" stroke="#1D4ED8" stroke-width="3"/>
      <polygon points="224,231 236,237 224,243" fill="#1D4ED8"/>

      <!-- Center: Solid-State Transformer All-in-One -->
      <rect x="240" y="186" width="388" height="102" rx="10" fill="#1D4ED8"/>
      <text x="434" y="209" text-anchor="middle" fill="#FDE68A" font-size="11" font-weight="700" letter-spacing="1">ALL-IN-ONE OIL-FREE SiC SOLID-STATE TRANSFORMER</text>
      <text x="434" y="232" text-anchor="middle" fill="#FFFFFF" font-size="15.5" font-weight="800">單機整合：中壓變壓 ＋ 雙向逆變整流 ＋ 固態斷路 ＋ 構網</text>
      <rect x="256" y="246" width="112" height="30" rx="5" fill="#1E40AF"/>
      <text x="312" y="265" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="700">效率 98.5–98.86%</text>
      <rect x="378" y="246" width="116" height="30" rx="5" fill="#1E40AF"/>
      <text x="436" y="265" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="700">無油 / 3–6月交期</text>
      <rect x="504" y="246" width="110" height="30" rx="5" fill="#D97706"/>
      <text x="559" y="265" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="700">六強全員參戰</text>

      <!-- Right 3 DC Outputs -->
      <path d="M632 212 L674 204 M632 237 L674 237 M632 262 L674 270" stroke="#1D4ED8" stroke-width="2.5"/>
      <rect x="678" y="186" width="250" height="30" rx="6" fill="#FFFFFF" stroke="#2563EB" stroke-width="1.4"/>
      <text x="803" y="205" text-anchor="middle" fill="#1E3A8A" font-size="11" font-weight="700">800 VDC AI 算力機櫃 (NVIDIA DSX)</text>

      <rect x="678" y="222" width="250" height="30" rx="6" fill="#FFFFFF" stroke="#0284C7" stroke-width="1.4"/>
      <text x="803" y="241" text-anchor="middle" fill="#0369A1" font-size="11" font-weight="700">直流耦合大儲能 (Megapack / BESS)</text>

      <rect x="678" y="258" width="250" height="30" rx="6" fill="#FFFFFF" stroke="#0F766E" stroke-width="1.4"/>
      <text x="803" y="277" text-anchor="middle" fill="#0F766E" font-size="11" font-weight="700">1,500–2,000 VDC 次世代高壓光電</text>
    </svg>`;
  },

  // SVG 04: 重繪原圖 2 — 美國儲能突破 200 GWh 成長軌跡、細分動能與市場結構 (100% 真實數據)
  storageGrowthRedrawn() {
    return `
    <svg viewBox="0 0 960 470" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Top Left: 01 Scale Trajectory -->
      <rect x="16" y="8" width="464" height="278" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="32" y="32" fill="#0B1F3A" font-size="12.5" font-weight="700">01 規模成長軌跡：前九月新增、累計容量與 2030 上修（單位：GWh）</text>

      <!-- Y Axis & 200 GWh dashed reference -->
      <line x1="56" y1="226" x2="460" y2="226" stroke="#CBD5E1" stroke-width="1"/>
      <line x1="56" y1="181" x2="460" y2="181" stroke="#94A3B8" stroke-width="1" stroke-dasharray="4 3"/>
      <text x="50" y="184" text-anchor="end" fill="#64748B" font-size="9.5">200</text>
      <text x="50" y="136" text-anchor="end" fill="#64748B" font-size="9.5">400</text>
      <text x="50" y="88" text-anchor="end" fill="#64748B" font-size="9.5">600</text>

      <!-- 4 Bars (scale: 750 GWh -> 170px => 0.226 px/GWh) -->
      <!-- Bar 1: 48.3 -->
      <rect x="78" y="215" width="64" height="11" rx="2" fill="#1D4ED8"/>
      <rect x="78" y="213" width="64" height="3" fill="#06B6D4"/>
      <rect x="74" y="171" width="72" height="17" rx="8" fill="#DCFCE7"/>
      <text x="110" y="183" text-anchor="middle" fill="#15803D" font-size="9.5" font-weight="700">+20% YoY</text>
      <text x="110" y="204" text-anchor="middle" fill="#0B1F3A" font-size="12" font-weight="800">48.3</text>
      <text x="110" y="242" text-anchor="middle" fill="#334155" font-size="10" font-weight="700">2026 前 9 月新增</text>
      <text x="110" y="256" text-anchor="middle" fill="#64748B" font-size="9">電網 40.8 / 表後 7.5</text>

      <!-- Bar 2: 215.9 -->
      <rect x="178" y="177" width="64" height="49" rx="3" fill="#475569"/>
      <rect x="170" y="142" width="80" height="17" rx="8" fill="#F1F5F9"/>
      <text x="210" y="154" text-anchor="middle" fill="#0B1F3A" font-size="9.5" font-weight="700">突破 200 GWh</text>
      <text x="210" y="171" text-anchor="middle" fill="#0B1F3A" font-size="12" font-weight="800">215.9</text>
      <text x="210" y="242" text-anchor="middle" fill="#334155" font-size="10" font-weight="700">2026 累計裝機</text>
      <text x="210" y="256" text-anchor="middle" fill="#64748B" font-size="9">截至 Q3 2026</text>

      <!-- Bar 3: 683 -->
      <rect x="278" y="72" width="64" height="154" rx="3" fill="#CBD5E1"/>
      <text x="310" y="65" text-anchor="middle" fill="#475569" font-size="12" font-weight="700">683</text>
      <text x="310" y="242" text-anchor="middle" fill="#64748B" font-size="10" font-weight="600">2030 累計目標</text>
      <text x="310" y="256" text-anchor="middle" fill="#94A3B8" font-size="9">(前次預估)</text>

      <!-- Bar 4: 708 -->
      <rect x="378" y="66" width="64" height="160" rx="3" fill="#1D4ED8"/>
      <rect x="374" y="38" width="72" height="17" rx="8" fill="#DBEAFE"/>
      <text x="410" y="50" text-anchor="middle" fill="#1D4ED8" font-size="9.5" font-weight="700">上修 +3.7%</text>
      <text x="410" y="63" text-anchor="middle" fill="#1D4ED8" font-size="12.5" font-weight="800">708</text>
      <text x="410" y="242" text-anchor="middle" fill="#1D4ED8" font-size="10" font-weight="700">2030 累計目標</text>
      <text x="410" y="256" text-anchor="middle" fill="#1D4ED8" font-size="9">(最新上修)</text>

      <!-- Top Right: 02 Segment Momentum -->
      <rect x="494" y="8" width="450" height="278" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="510" y="32" fill="#0B1F3A" font-size="12.5" font-weight="700">02 近期細分市場動能：電網級主導與 C&I 爆發</text>
      <rect x="782" y="18" width="148" height="20" rx="10" fill="#DBEAFE"/>
      <text x="856" y="32" text-anchor="middle" fill="#1D4ED8" font-size="10" font-weight="700">Q3 合計新增 14.3 GWh</text>

      ${[
        { tag: 'Q3', name: '電網級 (FTM，45 案場)', sub: '含 3 座 GW 級專案併網', val: 12.2, label: '12.2 GWh', color: '#1D4ED8' },
        { tag: 'Q2', name: '工商業 (C&I，資料中心驅動)', sub: 'Q2 強勁放量 (當季總裝機 21.5 GWh)', val: 1.8, label: '1.8 GWh', color: '#0891B2' },
        { tag: 'Q3', name: '工商業 (C&I)', sub: '連兩季突破 1.3 GWh，動能延續', val: 1.3, label: '1.3 GWh', color: '#06B6D4' },
        { tag: 'Q3', name: '住宅 (Residential)', sub: '746 MWh，TPO 租賃與 VPP 支撐', val: 0.746, label: '0.746 GWh', color: '#F59E0B' }
      ].map((s, i) => {
        const y = 58 + i * 54;
        const bw = (s.val / 13.5) * 235;
        return `
          <rect x="510" y="${y}" width="26" height="17" rx="4" fill="#F1F5F9"/>
          <text x="523" y="${y + 12}" text-anchor="middle" fill="#334155" font-size="9.5" font-weight="700">${s.tag}</text>
          <text x="542" y="${y + 12}" fill="#0B1F3A" font-size="11" font-weight="700">${s.name}</text>
          <text x="510" y="${y + 27}" fill="#64748B" font-size="9.5">${s.sub}</text>
          <rect x="510" y="${y + 33}" width="416" height="14" rx="4" fill="#F1F5F9"/>
          <rect x="510" y="${y + 33}" width="${Math.max(bw, 16)}" height="14" rx="4" fill="${s.color}"/>
          <text x="${516 + Math.max(bw, 16)}" y="${y + 44}" fill="#0B1F3A" font-size="10.5" font-weight="700">${s.label}</text>
        `;
      }).join('')}

      <!-- Bottom Full Width: 03 Market Structure Stacked Bars -->
      <rect x="16" y="298" width="928" height="150" rx="10" fill="#FFFFFF" stroke="#E2E8F0"/>
      <text x="32" y="322" fill="#0B1F3A" font-size="12.5" font-weight="700">03 市場結構組成：獨立儲能（88%）與磷酸鐵鋰 LFP（89.2%）高度集中</text>

      <!-- Stacked Bar 1: FTM Config -->
      <text x="32" y="346" fill="#334155" font-size="11" font-weight="700">Q3 2026 電網級案場配置 (FTM)</text>
      <text x="928" y="346" text-anchor="end" fill="#64748B" font-size="10">獨立大儲已成電網併網主流</text>
      <rect x="32" y="354" width="788" height="24" rx="4" fill="#1D4ED8"/>
      <text x="426" y="370" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="700">獨立儲能 (Standalone) 88%</text>
      <rect x="822" y="354" width="96" height="24" rx="2" fill="#06B6D4"/>
      <text x="870" y="370" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="700">光儲 11%</text>
      <rect x="920" y="354" width="10" height="24" rx="2" fill="#94A3B8"/>

      <!-- Stacked Bar 2: Chemistry -->
      <text x="32" y="404" fill="#334155" font-size="11" font-weight="700">2026 全美儲能電池化學結構</text>
      <text x="928" y="404" text-anchor="end" fill="#64748B" font-size="10">鋰電佔 97%（其中 LFP 佔鋰電 92%）</text>
      <rect x="32" y="412" width="800" height="24" rx="4" fill="#0F4C81"/>
      <text x="432" y="428" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="700">鋰電—LFP 89.2%</text>
      <rect x="834" y="412" width="68" height="24" rx="2" fill="#0891B2"/>
      <text x="868" y="428" text-anchor="middle" fill="#FFFFFF" font-size="10" font-weight="700">7.8%</text>
      <rect x="904" y="412" width="26" height="24" rx="3" fill="#F59E0B"/>
      <text x="917" y="428" text-anchor="middle" fill="#FFFFFF" font-size="9" font-weight="700">3%</text>

      <text x="16" y="464" fill="#64748B" font-size="9.5">重繪自原報告圖 2｜資料來源：SEIA / Benchmark Mineral Intelligence (Energy Storage Market Outlook Q4 2026)</text>
    </svg>`;
  },

  // SVG 05: 原創政策防線 — 去中化三重監管海嘯
  regulatoryTsunami() {
    return `
    <svg viewBox="0 0 960 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Timeline Base -->
      <line x1="40" y1="215" x2="920" y2="215" stroke="#0B1F3A" stroke-width="3"/>
      <polygon points="920,209 934,215 920,221" fill="#0B1F3A"/>

      ${[
        { x: 30,  w: 280, badge: '防線 1｜稅收抵免與成本門檻', title: 'OBBBA / FEOC & MACR', date: '2026/12/31 財政部安全港細表', color: '#1E3A8A', bg: '#EFF6FF',
          pts: ['適用 2025/12/31 後開工光儲案場', '儲能面臨長達 10 年合規追溯義務', '單靠原產地證明無法取得稅收股權融資'] },
        { x: 340, w: 280, badge: '防線 2｜進口設備直接封鎖', title: 'FCC 外國逆變器與機器人禁令', date: '2026/07/28 已生效', color: '#B45309', bg: '#FFFBEB',
          pts: ['外國製連網逆變器納入 Covered List', '禁止核發新進口授權（美製豁免）', '業界示警實質阻斷風險高於 FEOC'] },
        { x: 650, w: 280, badge: '防線 3｜國安緊急狀態與關稅', title: 'EO 14421 ＋ Sec 232 (15%)', date: '2026/12/24 DOE 細則截止', color: '#991B1B', bg: '#FEF2F2',
          pts: ['授權 DOE 封鎖敵對國 BESS/逆變器', '12/04 生效 Sec 232 最低進口價與 15% 稅', '直接決定跨年案場能否合法併網'] }
      ].map((f, i) => `
        <rect x="${f.x}" y="12" width="${f.w}" height="178" rx="10" fill="${f.bg}" stroke="${f.color}" stroke-width="1.5"/>
        <rect x="${f.x}" y="12" width="${f.w}" height="30" rx="10" fill="${f.color}"/>
        <rect x="${f.x}" y="32" width="${f.w}" height="10" fill="${f.color}"/>
        <text x="${f.x + 14}" y="32" fill="#FFFFFF" font-size="11" font-weight="700">${f.badge}</text>
        <text x="${f.x + 14}" y="66" fill="${f.color}" font-size="14" font-weight="800">${f.title}</text>
        <rect x="${f.x + 14}" y="76" width="${f.w - 28}" height="22" rx="4" fill="#FFFFFF"/>
        <text x="${f.x + 22}" y="91" fill="#334155" font-size="10.5" font-weight="700">關鍵時點：${f.date}</text>
        ${f.pts.map((pt, j) => `
          <circle cx="${f.x + 20}" cy="${118 + j * 22}" r="2.8" fill="${f.color}"/>
          <text x="${f.x + 30}" y="${122 + j * 22}" fill="#1E293B" font-size="10.8" font-weight="500">${pt}</text>
        `).join('')}
        <line x1="${f.x + f.w/2}" y1="190" x2="${f.x + f.w/2}" y2="215" stroke="${f.color}" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="${f.x + f.w/2}" cy="215" r="6" fill="${f.color}"/>
      `).join('')}
      <text x="480" y="242" text-anchor="middle" fill="#475569" font-size="11" font-weight="700">
        產業直接結果：ES Foundry 破 1 GW 美製矽電池出貨 ｜ Nextpower 鋼邊框搶賺 +6% ITC ｜ 美製合規產能享高溢價
      </text>
    </svg>`;
  },

  // SVG 06: 重繪原圖 3 — RE+ 26 十大決選新創 4x3 全景圖譜 (互動可點擊)
  startupMatrixRedrawn() {
    const rows = [
      {
        label: '電網診斷、電力電子與資安', count: '3 家入圍', y: 66, h: 128,
        s1: [
          { rank: 8, name: 'Matrix Power', tag: '輕資產設計＋付費試點', desc: '3 MW / 98.5% 目標｜2027 Q1 試點', accent: '#D97706' },
          { rank: 10, name: 'LexaVolt', tag: '美製邊緣資安硬體閘道', desc: 'LV-01 硬體信任根｜<5 W 功耗', accent: '#D97706' }
        ],
        s2: [
          { rank: 1, name: 'Magnefy', champ: true, tag: '低價硬體＋SaaS (HaaS)', desc: '>98% 準確率｜成本僅傳統 1/10', accent: '#1D4ED8' }
        ],
        s3: []
      },
      {
        label: '表後負載與屋頂整合', count: '2 家入圍', y: 202, h: 92,
        s1: [],
        s2: [
          { rank: 4, name: 'Noble Carbon', tag: '模組化硬體＋電網數據', desc: '<5 分鐘安裝｜Eversource 200 戶試點', accent: '#D97706' }
        ],
        s3: [
          { rank: 6, name: 'SWIF Rack', tag: '屋頂大廠分銷 (無外資)', desc: '雙面發電 +20%｜Duro-Last & NRP 通路', accent: '#D97706' }
        ]
      },
      {
        label: '實體 AI 施工與維運機器人', count: '3 家入圍', y: 302, h: 128,
        s1: [
          { rank: 5, name: 'Axentum', tag: '預製光儲模組化交鑰匙', desc: '0 度光儲地毯｜宣稱快 10x / 成本 1/3', accent: '#0891B2' }
        ],
        s2: [],
        s3: [
          { rank: 2, name: 'Cosmic Robotics', tag: 'RaaS 機器人即服務＋軟體', desc: '400–500+ 片/日｜加州/德州實案', accent: '#0891B2' },
          { rank: 9, name: 'O&M Robotics', tag: 'B2B 機器人車隊銷售', desc: '15,000 片/日｜零重壓專利・已獲首單', accent: '#0891B2' }
        ]
      },
      {
        label: 'AI 能源調度與法規軟體', count: '2 家入圍', y: 438, h: 128,
        s1: [],
        s2: [],
        s3: [
          { rank: 3, name: 'evPower.ai', tag: '純軟 SaaS＋選配 Edge Box', desc: '需量電費 -40% / 售電 +20%｜ON 商轉', accent: '#1D4ED8' },
          { rank: 7, name: 'Fordje', tag: 'B2B SaaS＋API 數據授權', desc: '28,000+ 轄區｜30 秒出法規報告', accent: '#1D4ED8' }
        ]
      }
    ];

    const renderCard = (c, x, y, w, h) => `
      <g class="cursor-pointer startup-svg-card" onclick="window.openStartupModal(${c.rank})">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${c.champ ? '#EFF6FF' : '#FFFFFF'}" stroke="${c.champ ? '#1D4ED8' : '#CBD5E1'}" stroke-width="${c.champ ? '2' : '1'}"/>
        <rect x="${x}" y="${y}" width="4" height="${h}" rx="2" fill="${c.accent}"/>
        <text x="${x + 12}" y="${y + 18}" fill="#0B1F3A" font-size="12" font-weight="800">${c.name}</text>
        ${c.champ ? `<rect x="${x + w - 82}" y="${y + 6}" width="74" height="17" rx="8" fill="#1D4ED8"/><text x="${x + w - 45}" y="${y + 18}" text-anchor="middle" fill="#FFFFFF" font-size="9" font-weight="700">★ 年度總冠軍</text>` : ''}
        <text x="${x + 12}" y="${y + 34}" fill="${c.accent}" font-size="9.8" font-weight="700">${c.tag}</text>
        <text x="${x + 12}" y="${y + 49}" fill="#475569" font-size="9.5">${c.desc}</text>
      </g>
    `;

    return `
    <svg viewBox="0 0 960 584" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Column Headers -->
      <rect x="16" y="8" width="184" height="48" rx="6" fill="#0B1F3A"/>
      <text x="108" y="29" text-anchor="middle" fill="#93C5FD" font-size="10" font-weight="700">核心價值鏈 ↓</text>
      <text x="108" y="45" text-anchor="middle" fill="#FFFFFF" font-size="10.5" font-weight="700">商業化進度 →</text>

      ${[
        { x: 208, title: 'STAGE 1（3 家）', sub: '早期試點招募 / 預商用' },
        { x: 460, title: 'STAGE 2（2 家）', sub: '實測驗證 / 公用事業付費試點' },
        { x: 712, title: 'STAGE 3（5 家）', sub: '商業部署 / 通路規模化' }
      ].map(col => `
        <rect x="${col.x}" y="8" width="234" height="48" rx="6" fill="#F1F5F9" stroke="#CBD5E1"/>
        <text x="${col.x + 12}" y="27" fill="#1D4ED8" font-size="10.5" font-weight="800">${col.title}</text>
        <text x="${col.x + 12}" y="44" fill="#0B1F3A" font-size="11.5" font-weight="700">${col.sub}</text>
      `).join('')}

      <!-- Rows -->
      ${rows.map(r => `
        <rect x="16" y="${r.y}" width="184" height="${r.h}" rx="6" fill="#F8FAFC" stroke="#E2E8F0"/>
        <text x="28" y="${r.y + r.h/2 - 4}" fill="#0B1F3A" font-size="11.5" font-weight="700">${r.label}</text>
        <text x="28" y="${r.y + r.h/2 + 14}" fill="#64748B" font-size="10">${r.count}</text>

        <rect x="208" y="${r.y}" width="234" height="${r.h}" rx="6" fill="#FAFAFA" stroke="#E2E8F0"/>
        <rect x="460" y="${r.y}" width="234" height="${r.h}" rx="6" fill="#FAFAFA" stroke="#E2E8F0"/>
        <rect x="712" y="${r.y}" width="234" height="${r.h}" rx="6" fill="#FAFAFA" stroke="#E2E8F0"/>

        ${r.s1.length === 0 ? `<text x="325" y="${r.y + r.h/2 + 4}" text-anchor="middle" fill="#CBD5E1" font-size="14">—</text>` :
          r.s1.map((c, i) => renderCard(c, 216, r.y + 8 + i * 58, 218, r.s1.length === 1 ? Math.min(r.h - 16, 74) : 54)).join('')}

        ${r.s2.length === 0 ? `<text x="577" y="${r.y + r.h/2 + 4}" text-anchor="middle" fill="#CBD5E1" font-size="14">—</text>` :
          r.s2.map((c, i) => renderCard(c, 468, r.y + (r.h - 68)/2, 218, 68)).join('')}

        ${r.s3.length === 0 ? `<text x="829" y="${r.y + r.h/2 + 4}" text-anchor="middle" fill="#CBD5E1" font-size="14">—</text>` :
          r.s3.map((c, i) => renderCard(c, 720, r.y + 8 + i * 58, 218, r.s3.length === 1 ? Math.min(r.h - 16, 74) : 54)).join('')}
      `).join('')}

      <text x="16" y="579" fill="#64748B" font-size="9.5">重繪自原報告圖 3｜點擊任一新創卡片可立即查看完整商業模式與進能服台灣落地評析（左線色：藍=軟體訂閱 / 青=機器人 / 橘=電力結構硬體）</text>
    </svg>`;
  },

  // SVG 07: 原創總監戰略 — 進能服事業總監台灣市場 3x3 戰略矩陣與 12 個月路線圖
  directorStrategyMatrix() {
    return `
    <svg viewBox="0 0 960 360" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Left: 2x2 / 3-Wave Strategic Positioning -->
      <rect x="16" y="10" width="460" height="338" rx="10" fill="#FFFFFF" stroke="#CBD5E1"/>
      <text x="32" y="34" fill="#0B1F3A" font-size="13" font-weight="800">進能服台灣市場技術適配矩陣（導入急迫性 × 台灣變現力）</text>

      <!-- Axes -->
      <line x1="66" y1="306" x2="452" y2="306" stroke="#334155" stroke-width="1.5"/>
      <line x1="66" y1="54" x2="66" y2="306" stroke="#334155" stroke-width="1.5"/>
      <text x="260" y="330" text-anchor="middle" fill="#475569" font-size="10.5" font-weight="700">台灣市場即時變現力與客戶剛需 →</text>
      <text x="28" y="180" text-anchor="middle" fill="#475569" font-size="10.5" font-weight="700" transform="rotate(-90 28 180)">導入急迫性 →</text>

      <!-- Quadrant Highlights -->
      <rect x="260" y="56" width="190" height="122" rx="6" fill="#FEF3C7" opacity="0.65"/>
      <text x="442" y="72" text-anchor="end" fill="#B45309" font-size="10" font-weight="800">★ P0 快贏戰區 (0–3M)</text>
      <rect x="70" y="56" width="186" height="122" rx="6" fill="#EFF6FF" opacity="0.65"/>
      <text x="78" y="72" fill="#1D4ED8" font-size="10" font-weight="700">P1 策略結盟卡位 (3–9M)</text>
      <rect x="260" y="182" width="190" height="120" rx="6" fill="#F0FDF4" opacity="0.65"/>
      <text x="442" y="198" text-anchor="end" fill="#15803D" font-size="10" font-weight="700">P1 效率深化區 (3–9M)</text>
      <rect x="70" y="182" width="186" height="120" rx="6" fill="#F8FAFC"/>
      <text x="78" y="198" fill="#64748B" font-size="10" font-weight="700">P2 觀察儲備區 (9–18M)</text>

      <!-- Bubbles -->
      ${[
        { cx: 382, cy: 96,  r: 18, label: 'Magnefy 變壓器監測', color: '#D97706' },
        { cx: 332, cy: 130, r: 17, label: 'EL-AI / 巡檢 AI', color: '#D97706' },
        { cx: 396, cy: 152, r: 19, label: '電費單模擬+表後儲能', color: '#B45309' },
        { cx: 184, cy: 102, r: 18, label: '台達 800VDC AIDC', color: '#1D4ED8' },
        { cx: 148, cy: 146, r: 15, label: '台灣 22縣市法規 AI', color: '#2563EB' },
        { cx: 360, cy: 228, r: 16, label: 'SWIF 免破保固屋頂', color: '#15803D' },
        { cx: 318, cy: 274, r: 15, label: 'O&M 零重壓清洗機', color: '#0F766E' },
        { cx: 156, cy: 248, r: 14, label: 'LexaVolt 資安閘道', color: '#64748B' },
        { cx: 112, cy: 282, r: 11, label: 'Axentum/Cosmic', color: '#94A3B8' }
      ].map(b => `
        <circle cx="${b.cx}" cy="${b.cy}" r="${b.r}" fill="${b.color}" opacity="0.9"/>
        <text x="${b.cx}" y="${b.cy + b.r + 12}" text-anchor="middle" fill="#0F172A" font-size="9.5" font-weight="700">${b.label}</text>
      `).join('')}

      <!-- Right: 12-Month 3-Wave Roadmap -->
      <rect x="492" y="10" width="452" height="338" rx="10" fill="#0B1F3A"/>
      <text x="512" y="36" fill="#FCD34D" font-size="11" font-weight="700" letter-spacing="1">DIRECTOR EXECUTION ROADMAP</text>
      <text x="512" y="56" fill="#FFFFFF" font-size="14" font-weight="800">進能服 12 個月三波段落地推進藍圖</text>

      ${[
        { y: 74,  badge: 'WAVE 1｜2026 Q4 – 2027 Q1 (0–3M)', title: '快贏變現：零阻力導入與毛利升級', color: '#D97706',
          items: ['ACT-01：2 座主力 22.8kV 升壓站啟動非侵入變壓器監測 PoC', 'ACT-02：升級 CF-086 平台導入 EL-AI 與巡檢照片 AI 審核', 'ACT-03：電費單資料庫加掛免費儲能 ROI 模擬器，搶攻 3 家用電大戶'] },
        { y: 166, badge: 'WAVE 2｜2027 Q2 – Q3 (3–9M)', title: '生態卡位：AIDC 800VDC 與 EPC 差異化', color: '#2563EB',
          items: ['ACT-05：結盟台達電子，切入台灣 AI 資料中心 800 VDC 直流微電網', 'ACT-04：結盟台灣防水膜廠推「不破保固高架屋頂」搶攻科學園區', 'ACT-06/07：大型漁電評估零重壓清洗機；上線台灣 22 縣市法規 AI'] },
        { y: 258, badge: 'WAVE 3｜2027 Q4+ (9–18M)', title: '長期護城河：非紅溯源與電網資安標準', color: '#0F766E',
          items: ['ACT-08：建立非紅供應鏈資料庫與 EMS 硬體資安隔離閘道', '全面對應台電併網資安規範與美系外商 RE100 稽核門檻'] }
      ].map(w => `
        <rect x="512" y="${w.y}" width="412" height="80" rx="8" fill="#132E57" stroke="${w.color}" stroke-width="1.2"/>
        <rect x="512" y="${w.y}" width="6" height="80" rx="3" fill="${w.color}"/>
        <text x="528" y="${w.y + 18}" fill="#93C5FD" font-size="9.5" font-weight="700">${w.badge}</text>
        <text x="528" y="${w.y + 34}" fill="#FFFFFF" font-size="12" font-weight="800">${w.title}</text>
        ${w.items.map((it, idx) => `
          <text x="528" y="${w.y + 50 + idx * 14}" fill="#CBD5E1" font-size="9.8">• ${it}</text>
        `).join('')}
      `).join('')}
    </svg>`;
  }
};
