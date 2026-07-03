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

const knownHomepages = {
  "zigbang": "https://www.zigbang.com/",
  "오늘의집": "https://ohou.se/",
  "MODUSIGN": "https://www.modusign.co.kr/",
  "Archisketch": "https://www.archisketch.com/",
  "SpaceCloud": "https://www.spacecloud.kr/",
  "eduwill": "https://www.eduwill.net/",
  "TRUSTAY": "https://trustay.com/",
  "호갱노노": "https://hogangnono.com/",
  "밸류맵": "https://www.valueupmap.com/",
  "R2Square": "https://www.rsquare.co.kr/"
};

const companies = [
  ["LanDup", "development", "planning"],
  ["Richgo", "development", "planning"],
  ["LIVsolution", "development", "planning"],
  ["Sweetspot", "development", "planning"],
  ["HOMES Flexity", "development", "planning"],
  ["인리얼티", "development", "planning"],
  ["Meissa", "development", "planning"],
  ["부동산의신", "development", "planning"],
  ["LECTUS", "development", "finance"],
  ["밸류맵", "development", "finance"],
  ["공감랩", "development", "finance"],
  ["READPOST", "development", "design-permit"],
  ["CHANGSOFT I&I", "development", "design-permit"],
  ["TENELEVEN", "development", "design-permit"],
  ["HOWBUILD", "development", "design-permit"],
  ["빌더", "development", "procurement"],
  ["FOBEECON", "development", "procurement"],
  ["unitlab", "development", "procurement"],
  ["zeons", "development", "procurement"],
  ["CUPIX", "development", "construction"],
  ["자취방센터114", "transaction", "marketing"],
  ["eduwill", "transaction", "marketing"],
  ["boospatch", "transaction", "marketing"],
  ["HOMES IN KOREA", "transaction", "marketing"],
  ["ANIPEN", "transaction", "marketing"],
  ["GoodPick", "transaction", "marketing"],
  ["boopd", "transaction", "brokerage"],
  ["zigbang", "transaction", "brokerage"],
  ["CORNER", "transaction", "brokerage"],
  ["BigValue", "transaction", "brokerage"],
  ["부동산내편", "transaction", "brokerage"],
  ["호갱노노", "transaction", "brokerage"],
  ["사랑방", "transaction", "brokerage"],
  ["SpaceCloud", "transaction", "brokerage"],
  ["RPAZ", "transaction", "brokerage"],
  ["픽아이엔", "transaction", "brokerage"],
  ["BUDICL", "transaction", "brokerage"],
  ["DiverCity", "transaction", "brokerage"],
  ["ZIPUP", "operation", "rental"],
  ["HOMES", "operation", "rental"],
  ["Dooongji", "operation", "rental"],
  ["케어링", "operation", "rental"],
  ["부동산플래닛", "operation", "rental"],
  ["handus", "operation", "space-operation"],
  ["아이엠박스", "operation", "space-operation"],
  ["homeflix", "operation", "space-operation"],
  ["한국공간데이터", "operation", "space-operation"],
  ["JCTechnology", "operation", "space-operation"],
  ["REALWORLD", "operation", "space-operation"],
  ["Rovoock", "operation", "space-operation"],
  ["BENDS", "operation", "facility"],
  ["salto", "operation", "facility"],
  ["TRUSTAY", "operation", "facility"],
  ["Divii Consulting", "operation", "facility"],
  ["soldoc", "operation", "facility"],
  ["오늘의집", "operation", "interior"],
  ["LILSQUARE", "operation", "interior"],
  ["TAXAI", "asset", "asset-sale"],
  ["realbuy", "asset", "asset-sale"],
  ["얼마집", "asset", "asset-sale"],
  ["WeX", "asset", "asset-liquidity"],
  ["우리가", "infra", "data-platform"],
  ["ValueShopping", "infra", "data-platform"],
  ["부동산플래닛", "infra", "data-platform"],
  ["R2Square", "infra", "data-platform"],
  ["KAP 한국자산매입", "infra", "data-platform"],
  ["PEPPER", "infra", "data-platform"],
  ["DTW", "infra", "data-platform"],
  ["지지옥션", "infra", "data-platform"],
  ["Archisketch", "infra", "design-tool"],
  ["MODUSIGN", "infra", "contract"],
  ["픽아이엔", "infra", "contract"],
  ["READPOST", "infra", "contract"]
].map(([name, stage, category], index) => ({
  name,
  stage,
  category,
  logo: `assets/logos/logo-${String(index + 1).padStart(3, "0")}.png`,
  url: homepageUrl(name),
  featured: name === "WeX"
}));

companies.splice(9, 0, {
  name: "WeX",
  stage: "development",
  category: "finance",
  logo: "assets/logos/logo-061.png",
  url: homepageUrl("WeX"),
  featured: true
});

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

function homepageUrl(name) {
  return knownHomepages[name] || `https://www.google.com/search?q=${encodeURIComponent(`${name} 홈페이지`)}`;
}

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

function createCompanyChip(company) {
  const template = document.querySelector("#company-template");
  const chip = template.content.firstElementChild.cloneNode(true);
  chip.href = company.url;
  chip.title = `${company.name} 홈페이지 열기`;
  if (company.featured) {
    chip.classList.add("is-featured");
  }
  chip.querySelector(".logo-text").innerHTML = `<img src="${company.logo}" alt="${company.name}" />`;
  chip.querySelector("small").textContent = categoryById[company.category].name;
  return chip;
}

function setFloatingPosition(chip, index, total, categoryId) {
  const columns = total >= 10 ? 4 : total >= 6 ? 3 : total >= 3 ? 2 : 1;
  const rows = Math.ceil(total / columns);
  const col = index % columns;
  const row = Math.floor(index / columns);
  const seed = Array.from(`${categoryId}-${index}`).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const jitterX = ((seed % 13) - 6) * 0.8;
  const jitterY = (((seed * 7) % 11) - 5) * 0.9;
  const x = Math.min(84, Math.max(16, ((col + 0.5) / columns) * 100 + jitterX));
  const y = Math.min(78, Math.max(22, ((row + 0.5) / rows) * 100 + jitterY));
  chip.style.setProperty("--x", `${x}%`);
  chip.style.setProperty("--y", `${y}%`);
  chip.style.setProperty("--float-x", `${((seed % 5) - 2) * 3}px`);
  chip.style.setProperty("--float-y", `${(((seed * 3) % 5) - 2) * 3}px`);
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
  title.innerHTML = `<strong>Proptech AI Map</strong><span>${visibleCompanies.length} logo placements · floating ecosystem</span>`;

  const content = document.createElement("div");
  content.className = "map-content";

  const rail = document.createElement("div");
  rail.className = "stage-rail";
  rail.replaceChildren(...stages.map(stage => {
    const node = document.createElement("div");
    node.className = "rail-stage";
    node.innerHTML = `<strong>${stage.number}</strong><span>${stage.name}</span>`;
    return node;
  }));

  const stageList = document.createElement("div");
  stageList.className = "stage-list";

  const renderedStages = stages.filter(stage => state.stage === "all" || state.stage === stage.id);
  stageList.replaceChildren(...renderedStages.map(stage => {
    const categories = stage.categories.filter(category => state.category === "all" || state.category === category.id);
    const card = document.createElement("article");
    card.className = `stage-card stage-${stage.id}`;
    card.style.setProperty("--category-count", String(Math.max(categories.length, 1)));

    const categoryCounts = categories.map(category => companies.filter(company => (
      company.stage === stage.id &&
      company.category === category.id &&
      matchesCompany(company)
    )).length);
    const categoryWeights = categoryCounts.map(count => Math.max(1, Math.ceil(Math.sqrt(Math.max(count, 1)))));
    card.style.setProperty("--category-template", categoryWeights.map(weight => `${weight}fr`).join(" "));

    const columns = categories.map((category, categoryIndex) => {
      const column = document.createElement("div");
      column.className = "category-column";
      const categoryCompanies = companies.filter(company => (
        company.stage === stage.id &&
        company.category === category.id &&
        matchesCompany(company)
      ));
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
    card.innerHTML = `
      <div class="directory-card-header">
        <div class="directory-logo"><img src="${company.logo}" alt="${company.name}" /></div>
        <span class="stage-badge">${stage.name}</span>
      </div>
      <h3>${company.name}</h3>
      <p>${category.name} 영역의 AI·프롭테크 기업입니다.</p>
      <a class="link-button" href="${company.url}" target="_blank" rel="noreferrer">홈페이지 열기</a>
    `;
    return card;
  }));
}

function renderStats() {
  document.querySelector("#company-count").textContent = String(companies.length);
  document.querySelector("#category-count").textContent = String(Object.keys(categoryById).length);
}

function renderViews() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("is-active", tab.dataset.view === state.view);
  });
  document.querySelector("#map-view").classList.toggle("is-active", state.view === "map");
  document.querySelector("#directory-view").classList.toggle("is-active", state.view === "directory");
}

function render() {
  renderViews();
  renderStageFilters();
  renderCategoryFilters();
  renderMap();
  renderDirectory();
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

renderStats();
render();
