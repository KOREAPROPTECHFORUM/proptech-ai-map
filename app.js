let companies = [];

const stages = [
  {
    id: "development",
    number: 1,
    name: "개발·건설",
    categories: [
      { id: "planning", name: "기획·사업성" },
      { id: "finance", name: "금융·투자" },
      { id: "design-permit", name: "설계·인허가" },
      { id: "procurement", name: "조달·정산" },
      { id: "construction", name: "시공·현장관리" }
    ]
  },
  {
    id: "transaction",
    number: 2,
    name: "거래·마케팅",
    categories: [
      { id: "marketing", name: "마케팅·분양" },
      { id: "brokerage", name: "중개·거래" }
    ]
  },
  {
    id: "operation",
    number: 3,
    name: "운영 관리",
    categories: [
      { id: "rental", name: "임대 운영" },
      { id: "space-operation", name: "공간 운영" },
      { id: "facility", name: "건물·시설 관리" },
      { id: "interior", name: "인테리어·리노베이션" }
    ]
  },
  {
    id: "asset",
    number: 4,
    name: "자산 관리",
    categories: [
      { id: "asset-sale", name: "자산관리·매각" },
      { id: "asset-liquidity", name: "자산 유동화" }
    ]
  },
  {
    id: "infra",
    number: 5,
    name: "인프라",
    categories: [
      { id: "data-platform", name: "데이터 API·플랫폼" },
      { id: "design-tool", name: "설계·디자인" },
      { id: "contract", name: "인증·계약" }
    ]
  }
];


const state = {
  view: "map",
  stage: "all",
  category: "all",
  query: ""
};

const stageById = Object.fromEntries(stages.map(stage => [stage.id, stage]));
const categoryById = Object.fromEntries(
  stages.flatMap(stage => stage.categories.map(category => [category.id, { ...category, stageId: stage.id }]))
);

function matchesCompany(company) {
  const stage = stageById[company.stage];
  const category = categoryById[company.category];
  const searchable = `${company.name} ${stage.name} ${category.name}`.toLowerCase();
  const matchesStage = state.stage === "all" || company.stage === state.stage;
  const matchesCategory = state.category === "all" || company.category === state.category;
  const matchesQuery = !state.query || searchable.includes(state.query.toLowerCase());
  return matchesStage && matchesCategory && matchesQuery;
}

function uniqueCompanies(items) {
  const seen = new Set();
  return items.filter(company => {
    const key = `${company.name}-${company.stage}-${company.category}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function showCompanyModal(company) {
  const stage = stageById[company.stage];
  const category = categoryById[company.category];
  const logoHtml = company.logo
    ? `<img src="assets/logos/${company.logo}" alt="${company.name}" />`
    : `<span style="font-size:13px;font-weight:900;color:#242a35;text-align:center;padding:4px 10px;display:flex;align-items:center;justify-content:center;height:100%">${company.name}</span>`;
  const servicesHtml = (company.services || []).map(s => `
    <div class="service-item">
      <strong class="service-name">${s.name}</strong>
      ${s.desc ? `<span class="service-desc">${s.desc}</span>` : ''}
      ${s.tech ? `<span class="service-tech">${s.tech}</span>` : ''}
    </div>`).join('');
  const href = company.url || `https://www.google.com/search?q=${encodeURIComponent(company.name + " 홈페이지")}`;

  document.getElementById('modal-body').innerHTML = `
    <div class="modal-card-header">
      <div class="modal-logo">${logoHtml}</div>
      <div class="modal-meta">
        <span class="stage-badge">${stage.name}</span>
        <h2 class="modal-name">${company.name}</h2>
        <p class="modal-category">${category.name} 영역의 프롭테크 AI 기업입니다.</p>
      </div>
    </div>
    ${servicesHtml ? `<div class="service-list" style="margin-top:16px">${servicesHtml}</div>` : ''}
    <a class="link-button modal-link" href="${href}" target="_blank" rel="noreferrer">홈페이지 열기</a>
  `;
  document.getElementById('company-modal').classList.remove('hidden');
}

function createCompanyChip(company) {
  const template = document.querySelector("#company-template");
  const chip = template.content.firstElementChild.cloneNode(true);
  chip.href = company.url || `https://www.google.com/search?q=${encodeURIComponent(company.name + " 홈페이지")}`;
  chip.title = `${company.name} 상세 보기`;
  chip.addEventListener('click', e => { e.preventDefault(); showCompanyModal(company); });
  if (company.featured) chip.classList.add("is-featured");
  const logoEl = chip.querySelector(".logo-text");
  if (company.logo) {
    logoEl.innerHTML = `<img src="assets/logos/${company.logo}" alt="${company.name}" />`;
  } else {
    logoEl.style.cssText = "line-height:1;font-size:9px;font-weight:900;text-align:center;word-break:break-all";
    logoEl.textContent = company.name;
  }
  chip.querySelector("small").textContent = categoryById[company.category].name;
  return chip;
}

function setFloatingPosition(chip, index, total, categoryId, xRange, yRange) {
  const [xMin, xMax] = xRange || [16, 84];
  const [yMin, yMax] = yRange || [22, 78];
  const columns = total >= 10 ? 4 : total >= 6 ? 3 : total >= 3 ? 2 : 1;
  const rows = Math.ceil(total / columns);
  const col = index % columns;
  const row = Math.floor(index / columns);
  const seed = Array.from(`${categoryId}-${index}`).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const jitterX = ((seed % 13) - 6) * 0.8;
  const jitterY = (((seed * 7) % 11) - 5) * 0.9;
  const x = Math.min(xMax, Math.max(xMin, ((col + 0.5) / columns) * 100 + jitterX));
  const y = Math.min(yMax, Math.max(yMin, ((row + 0.5) / rows) * 100 + jitterY));
  chip.style.setProperty("--x", `${x}%`);
  chip.style.setProperty("--y", `${y}%`);
  chip.style.setProperty("--float-x", `${((seed % 5) - 2) * 3}px`);
  chip.style.setProperty("--float-y", `${(((seed * 3) % 5) - 2) * 3}px`);
  chip.style.setProperty("--float-z", `${(((seed * 11) % 7) - 3) * 12}px`);
  chip.style.setProperty("--float-duration", `${5.5 + (seed % 7) * 0.45}s`);
  chip.style.setProperty("--float-delay", `${-(seed % 9) * 0.4}s`);
}

function renderStageFilters() {
  const container = document.querySelector("#stage-filters");
  const filters = [{ id: "all", name: "전체" }, ...stages.map(({ id, name }) => ({ id, name }))];
  container.replaceChildren(...filters.map(filter => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${state.stage === filter.id ? " is-active" : ""}`;
    button.textContent = filter.name;
    button.addEventListener("click", () => {
      state.stage = filter.id;
      state.category = "all";
      render();
    });
    return button;
  }));
}

function renderCategoryFilters() {
  const container = document.querySelector("#category-filters");
  const categories = [
    { id: "all", name: "전체 카테고리" },
    ...stages
      .filter(stage => state.stage === "all" || stage.id === state.stage)
      .flatMap(stage => stage.categories)
  ];

  container.replaceChildren(...categories.map(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-filter${state.category === category.id ? " is-active" : ""}`;
    button.textContent = category.name;
    button.addEventListener("click", () => {
      state.category = category.id;
      render();
    });
    return button;
  }));
}

function renderMap() {
  const container = document.querySelector("#map-view");
  const visibleCompanies = uniqueCompanies(companies.filter(matchesCompany));
  const board = document.createElement("div");
  board.className = "map-board";

  const title = document.createElement("div");
  title.className = "map-title";
  title.innerHTML = `<strong>Proptech AI Map</strong><span>로고를 클릭하시면 자세한 AI 서비스 정보를 확인하실 수 있습니다.</span>`;

  const content = document.createElement("div");
  content.className = "map-content";

  const rail = document.createElement("div");
  rail.className = "stage-rail";
  rail.replaceChildren(...stages.map(stage => {
    const node = document.createElement("div");
    node.className = "rail-stage";
    node.dataset.stage = stage.id;
    if (state.stage === stage.id) node.classList.add("is-active");
    node.innerHTML = `<strong>${stage.name}</strong>`;
    return node;
  }));

  const stageList = document.createElement("div");
  stageList.className = "stage-list";

  stageList.replaceChildren(...stages.map(stage => {
    const categories = stage.categories.filter(category => state.category === "all" || state.category === category.id);
    const card = document.createElement("article");
    const isFiltered = state.stage !== "all";
    const isActive  = state.stage === stage.id;
    card.className = `stage-card stage-${stage.id}${isFiltered ? (isActive ? " is-active" : " is-dimmed") : ""}`;
    card.style.setProperty("--category-count", String(Math.max(categories.length, 1)));

    const matchesWithoutStage = company =>
      (state.category === "all" || company.category === state.category) &&
      (!state.query || `${company.name} ${stageById[company.stage]?.name} ${categoryById[company.category]?.name}`.toLowerCase().includes(state.query.toLowerCase()));

    const categoryCounts = categories.map(category => companies.filter(company =>
      company.stage === stage.id && company.category === category.id && matchesWithoutStage(company)
    ).length);
    const categoryWeights = categoryCounts.map(count => Math.max(1, Math.ceil(Math.sqrt(Math.max(count, 1)))));
    card.style.setProperty("--category-template", categoryWeights.map(weight => `${weight}fr`).join(" "));

    const columns = categories.map((category, categoryIndex) => {
      const column = document.createElement("div");
      column.className = "category-column";
      const categoryCompanies = companies.filter(company =>
        company.stage === stage.id && company.category === category.id && matchesWithoutStage(company)
      );
      const list = document.createElement("div");
      list.className = "company-list floating-list";
      const chips = categoryCompanies.map((company, index) => {
        const chip = createCompanyChip(company);
        setFloatingPosition(chip, index, categoryCompanies.length, category.id);
        return chip;
      });
      list.replaceChildren(...chips);
      column.style.setProperty("--density", String(categoryCounts[categoryIndex]));
      column.innerHTML = `<h2>${category.name}</h2>`;
      column.append(list);
      return column;
    });

    card.replaceChildren(...columns);
    return card;
  }));

  content.append(rail, stageList);
  board.append(title, content);
  container.replaceChildren(board);

  requestAnimationFrame(() => {
    const cards = container.querySelectorAll('.stage-card');
    const railItems = container.querySelectorAll('.rail-stage');
    cards.forEach((card, i) => {
      if (railItems[i]) railItems[i].style.height = `${card.offsetHeight}px`;
    });
  });
}

function renderDirectory() {
  const container = document.querySelector("#directory-grid");
  const visibleCompanies = uniqueCompanies(companies.filter(matchesCompany));
  document.querySelector("#result-count").textContent = `${visibleCompanies.length}개 기업`;

  if (!visibleCompanies.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "검색 조건에 맞는 기업이 없습니다.";
    container.replaceChildren(empty);
    return;
  }

  container.replaceChildren(...visibleCompanies.map(company => {
    const stage = stageById[company.stage];
    const category = categoryById[company.category];
    const card = document.createElement("article");
    card.className = `directory-card${company.featured ? " is-featured" : ""}`;
    const logoHtml = company.logo
      ? `<img src="assets/logos/${company.logo}" alt="${company.name}" />`
      : `<span style="font-size:11px;font-weight:900;word-break:break-all;text-align:center;color:#242a35">${company.name}</span>`;
    const servicesHtml = (company.services || []).map(s => `
      <div class="service-item">
        <strong class="service-name">${s.name}</strong>
        ${s.desc ? `<span class="service-desc">${s.desc}</span>` : ''}
        ${s.tech ? `<span class="service-tech">${s.tech}</span>` : ''}
      </div>`).join('');
    card.innerHTML = `
      <div class="directory-card-header">
        <div class="directory-logo">${logoHtml}</div>
        <span class="stage-badge">${stage.name}</span>
      </div>
      <h3>${company.name}</h3>
      <p>${category.name} 영역의 프롭테크 AI 기업입니다.</p>
      ${servicesHtml ? `<div class="service-list">${servicesHtml}</div>` : ''}
      <a class="link-button" href="${company.url || `https://www.google.com/search?q=${encodeURIComponent(company.name + ' 홈페이지')}`}" target="_blank" rel="noreferrer">홈페이지 열기</a>
    `;
    return card;
  }));
}

function renderStats() {
  const uniqueCount = new Set(companies.map(c => c.name)).size;
  document.querySelector("#unique-company-count").textContent = String(uniqueCount);
  document.querySelector("#company-count").textContent = String(companies.length);
  document.querySelector("#category-count").textContent = String(Object.keys(categoryById).length);
}

function renderBusiness() {
  const seen = new Set();
  const allCompanies = companies.filter(matchesCompany).filter(c => {
    if (seen.has(c.name)) return false;
    seen.add(c.name);
    return true;
  });
  const b2bOnly = allCompanies.filter(c => c.b2b && !c.b2c);
  const b2cOnly = allCompanies.filter(c => c.b2c && !c.b2b);
  const both    = allCompanies.filter(c => c.b2b && c.b2c);

  const fillZone = (zoneId, list) => {
    const zone = document.getElementById(zoneId);
    if (!zone) return;
    zone.replaceChildren();
    if (!list.length) {
      const empty = document.createElement('span');
      empty.className = 'venn-empty';
      empty.textContent = '해당 기업 없음';
      zone.appendChild(empty);
      return;
    }
    list.forEach(company => {
      zone.appendChild(createCompanyChip(company));
    });
  };

  fillZone('zone-b2b', b2bOnly);
  fillZone('zone-both', both);
  fillZone('zone-b2c', b2cOnly);
}

const PAGE_TITLES = {
  map: "Proptech AI Map",
  directory: "Proptech AI Directory",
  business: "Proptech AI Business Segments"
};

function renderViews() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("is-active", tab.dataset.view === state.view);
  });
  document.querySelector("#map-view").classList.toggle("is-active", state.view === "map");
  document.querySelector("#directory-view").classList.toggle("is-active", state.view === "directory");
  document.querySelector("#business-view").classList.toggle("is-active", state.view === "business");

  document.querySelector("#page-title").textContent = PAGE_TITLES[state.view] || PAGE_TITLES.map;
  document.querySelector("#stat-logo-placements").style.display = state.view === "map" ? "" : "none";
  document.querySelector("#lead-main").textContent = state.view === "business"
    ? "AI 기반 서비스를 제공하는 프롭테크 기업을 부동산 라이프사이클과 비즈니스 영역에 따라 분류했습니다."
    : "AI 기반 서비스를 제공하는 프롭테크 기업을 부동산 라이프사이클에 따라 분류했습니다.";
}

function render() {
  renderViews();
  renderStageFilters();
  renderCategoryFilters();
  renderMap();
  renderDirectory();
  renderBusiness();
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    state.view = tab.dataset.view;
    render();
  });
});

document.querySelector("#search-input").addEventListener("input", event => {
  state.query = event.target.value.trim();
  render();
});

function initModal() {
  const modal = document.getElementById('company-modal');
  document.getElementById('modal-close').addEventListener('click', () => modal.classList.add('hidden'));
  document.getElementById('modal-backdrop').addEventListener('click', () => modal.classList.add('hidden'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.add('hidden'); });
}

async function init() {
  try {
    const res = await fetch("./companies.json");
    const data = await res.json();
    companies = data.companies || [];
  } catch (e) {
    console.error("companies.json 로드 실패:", e);
  }
  renderStats();
  render();
  initModal();
}

init();
