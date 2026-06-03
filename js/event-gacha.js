// event-gacha.js - UMADIGI STORE Gacha Event

const FREE_PM_ACCESS_LINK = '#';
const ULTRA_RARE_TARGET = 5;
const EVENT_STORAGE_KEY = 'umadigi_gacha_event';
const JKT48_MEMBER_FRAME = 'https://jkt48.com/images/member/bg-member-item-frame-transparent.png';
const AUTO_IMAGE_PATTERN = /^(.+?)[-_ ]?(\d+)\.(png|jpe?g|webp|gif)$/i;
const AUTO_CARD_PREFIXES = [
  'erine',
  'oline',
  'oniel',
  'freya',
  'christy',
  'marsha',
  'fiony',
  'anindya',
  'aurellia',
  'alya',
  'catherina'
];
const AUTO_CARD_EXTENSIONS = ['png'];
const MAX_AUTO_CARD_NUMBER = 10;

const rarityConfig = {
  common: { rank: 'Common', level: 'C', weight: 48, order: 1 },
  uncommon: { rank: 'Uncommon', level: 'UC', weight: 28, order: 2 },
  rare: { rank: 'Rare', level: 'R', weight: 16, order: 3 },
  ultraRare: { rank: 'Ultra Rare', level: 'UR', weight: 5, order: 4 }
};

function memberCard(name, slug, rarity, imageUrl) {
  const localImage = `../assets/img/member/${slug}.png`;
  return {
    name,
    image: imageUrl || localImage,
    fallbackImage: localImage,
    rarity
  };
}

const defaultGachaMembers = [
  memberCard('Christabella Bonita', 'christabella-bonita', 'ultraRare'),
  memberCard('Freya Jayawardana', 'freya-jayawardana', 'ultraRare'),
  memberCard('Fiony Alveria', 'fiony-alveria', 'ultraRare'),
  memberCard('Angelina Christy', 'angelina-christy', 'ultraRare'),
  memberCard('Marsha Lenathea', 'marsha-lenathea', 'ultraRare'),
  memberCard('Catherina Vallencia', 'catherina-vallencia', 'ultraRare'),
  memberCard('Anindya Ramadhani', 'anindya-ramadhani', 'rare'),
  memberCard('Gita Sekar Andarini', 'gita-sekar-andarini', 'rare'),
  memberCard('Kathrina Irene', 'kathrina-irene', 'rare'),
  memberCard('Raisha Syifa', 'raisha-syifa', 'rare'),
  memberCard('Aurellia', 'aurellia', 'rare'),
  memberCard('Alya Amanda', 'alya-amanda', 'rare'),
  memberCard('Oline Manuel', 'oline-manuel', 'rare'),
  memberCard('Nayla Suji', 'nayla-suji', 'rare'),
  memberCard('Greesella Adhalia', 'greesella-adhalia', 'uncommon'),
  memberCard('Gabriela Abigail', 'gabriela-abigail', 'uncommon'),
  memberCard('Febriola Sinambela', 'febriola-sinambela', 'uncommon'),
  memberCard('Indah Cahya', 'indah-cahya', 'uncommon'),
  memberCard('Afera Thalia', 'afera-thalia', 'uncommon'),
  memberCard('Adeline Wijaya', 'adeline-wijaya', 'uncommon'),
  memberCard('Aurhel Alana', 'aurhel-alana', 'uncommon'),
  memberCard('Cathleen Nixie', 'cathleen-nixie', 'uncommon'),
  memberCard('Celline Thefani', 'celline-thefani', 'uncommon'),
  memberCard('Cornelia Vanisa', 'cornelia-vanisa', 'uncommon'),
  memberCard('Cynthia Yaputera', 'cynthia-yaputera', 'uncommon'),
  memberCard('Dena Natalia', 'dena-natalia', 'uncommon'),
  memberCard('Desy Natalia', 'desy-natalia', 'uncommon'),
  memberCard('Feni Fitriyanti', 'feni-fitriyanti', 'uncommon'),
  memberCard('Fritzy Rosmerian', 'fritzy-rosmerian', 'uncommon'),
  memberCard('Grace Octaviani', 'grace-octaviani', 'uncommon'),
  memberCard('Hillary Abigail', 'hillary-abigail', 'uncommon'),
  memberCard('Jazzlyn Trisha', 'jazzlyn-trisha', 'uncommon'),
  memberCard('Jessica Chandra', 'jessica-chandra', 'uncommon'),
  memberCard('Jesslyn Elly', 'jesslyn-elly', 'uncommon'),
  memberCard('Lulu Salsabila', 'lulu-salsabila', 'uncommon'),
  memberCard('Michelle Alexandra', 'michelle-alexandra', 'uncommon'),
  memberCard('Michelle Levia', 'michelle-levia', 'uncommon'),
  memberCard('Mutiara Azzahra', 'mutiara-azzahra', 'uncommon'),
  memberCard('Nina Tutachia', 'nina-tutachia', 'uncommon'),
  memberCard('Ribka Budiman', 'ribka-budiman', 'uncommon'),
  memberCard('Shabilqis Naila', 'shabilqis-naila', 'uncommon'),
  memberCard('Victoria Kimberly', 'victoria-kimberly', 'uncommon'),
  memberCard('Fahira Putri', 'fahira-putri', 'common'),
  memberCard('Carissa Dini', 'carissa-dini', 'common'),
  memberCard('Heidi Suyangga', 'heidi-suyangga', 'common'),
  memberCard('Putry Jazyta', 'putry-jazyta', 'common'),
  memberCard('Sona Kalyana', 'sona-kalyana', 'common'),
  memberCard('Abigail Rachel', 'abigail-rachel', 'common'),
  memberCard('Astrella Virgiananda', 'astrella-virgiananda', 'common'),
  memberCard('Aulia Riza', 'aulia-riza', 'common'),
  memberCard('Bong Aprilli', 'bong-aprilli', 'common'),
  memberCard('Fatimah Azzahra', 'fatimah-azzahra', 'common'),
  memberCard('Gendis Mayrannisa', 'gendis-mayrannisa', 'common'),
  memberCard('Hagia Sopia', 'hagia-sopia', 'common'),
  memberCard('Helisma Putri', 'helisma-putri', 'common'),
  memberCard('Humaira Ramadhani', 'humaira-ramadhani', 'common'),
  memberCard('Jacqueline Immanuela', 'jacqueline-immanuela', 'common'),
  memberCard('Jemima Evodie', 'jemima-evodie', 'common'),
  memberCard('Maxine Faye', 'maxine-faye', 'common'),
  memberCard('Mikaela Kusjanto', 'mikaela-kusjanto', 'common'),
  memberCard('Nur Intan', 'nur-intan', 'common'),
  memberCard('Ralyne Van Irwan', 'ralyne-van-irwan', 'common')
];

let gachaMembers = [...defaultGachaMembers];

function createDefaultState() {
  return {
    ultraRare: [],
    collection: [],
    last: null,
    rewardMember: null,
    totalPulls: 0
  };
}

function normalizeState(state) {
  const fallback = createDefaultState();
  return {
    ...fallback,
    ...state,
    ultraRare: Array.isArray(state?.ultraRare) ? state.ultraRare : [],
    collection: Array.isArray(state?.collection) ? state.collection : []
  };
}

function getCollectedNames(state) {
  return [...new Set((state.collection || []).map(item => item.name).filter(Boolean))];
}

function formatMemberNameFromFile(rawName) {
  const aliasNames = {
    erine: 'Erine',
    oniel: 'Oniel',
    oline: 'Oline',
    freya: 'Freya',
    christy: 'Christy',
    marsha: 'Marsha',
    fiony: 'Fiony'
  };
  const normalized = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (aliasNames[normalized]) return aliasNames[normalized];

  return normalized
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function rarityFromAutoCardNumber(cardNumber) {
  if (cardNumber >= 4) return 'ultraRare';
  if (cardNumber >= 3) return 'rare';
  if (cardNumber >= 2) return 'uncommon';
  return 'common';
}

function buildAutoCardFromImage(image) {
  const match = image.file.match(AUTO_IMAGE_PATTERN);
  if (!match) return null;

  const baseName = match[1];
  const cardNumber = Number(match[2]);
  return buildAutoCard(baseName, cardNumber, image.url);
}

function buildAutoCard(baseName, cardNumber, imageUrl) {
  const displayName = formatMemberNameFromFile(baseName);
  const slug = `${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${cardNumber}`;

  return {
    name: `${displayName} ${cardNumber}`,
    image: imageUrl,
    fallbackImage: imageUrl,
    rarity: rarityFromAutoCardNumber(cardNumber),
    auto: true,
    slug
  };
}

function imageExists(src) {
  return new Promise(resolve => {
    const img = new Image();
    const timeout = setTimeout(() => resolve(false), 650);
    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };
    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };
    img.src = src;
  });
}

async function scanNumberedMemberImages() {
  const candidates = [];
  for (const prefix of AUTO_CARD_PREFIXES) {
    for (let number = 1; number <= MAX_AUTO_CARD_NUMBER; number += 1) {
      AUTO_CARD_EXTENSIONS.forEach(extension => {
        candidates.push({
          prefix,
          number,
          imageUrl: `../assets/img/member/${prefix}${number}.${extension}`
        });
      });
    }
  }

  const results = await Promise.all(candidates.map(async candidate => {
    const exists = await imageExists(candidate.imageUrl);
    return exists ? buildAutoCard(candidate.prefix, candidate.number, candidate.imageUrl) : null;
  }));

  return results.filter(Boolean);
}

async function loadAutoMemberImages() {
  const autoCards = [];

  try {
    const response = await fetch('/api/member-images');
    if (response.ok) {
      const data = await response.json();
      autoCards.push(...(data.images || []).map(buildAutoCardFromImage).filter(Boolean));
    }
  } catch (error) {
    // Fallback scan below still works when the API is unavailable.
  }

  autoCards.push(...await scanNumberedMemberImages());

  const existingNames = new Set(defaultGachaMembers.map(member => member.name));
  const uniqueAutoCards = autoCards.filter(card => {
    if (existingNames.has(card.name)) return false;
    existingNames.add(card.name);
    return true;
  });

  gachaMembers = [...defaultGachaMembers, ...uniqueAutoCards];
}

function getEventState() {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(EVENT_STORAGE_KEY) || '{}'));
  } catch (error) {
    return createDefaultState();
  }
}

function saveEventState(state) {
  localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(normalizeState(state)));
}

function pickRarity() {
  const entries = Object.entries(rarityConfig);
  const totalWeight = entries.reduce((sum, [, config]) => sum + config.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const [rarity, config] of entries) {
    roll -= config.weight;
    if (roll <= 0) return rarity;
  }

  return 'common';
}

function pickGachaItem() {
  const rarity = pickRarity();
  const members = gachaMembers.filter(member => member.rarity === rarity);
  const member = members[Math.floor(Math.random() * members.length)] || gachaMembers[0];
  return {
    ...member,
    ...rarityConfig[member.rarity],
    id: `${member.name}-${Date.now()}-${Math.floor(Math.random() * 9999)}`
  };
}

function normalizeGachaItem(item) {
  const matchedMember = gachaMembers.find(member => member.name === item?.name) || gachaMembers[0];
  const rarity = item?.rarity || matchedMember.rarity || 'common';
  return {
    ...matchedMember,
    ...item,
    ...rarityConfig[rarity],
    rarity,
    image: item?.image || matchedMember.image,
    fallbackImage: item?.fallbackImage || matchedMember.fallbackImage || '../assets/img/pmjkt48.png'
  };
}

function renderPackIdle() {
  const result = document.getElementById('gacha-result');
  if (!result) return;

  result.innerHTML = `
    <div class="gacha-pack">
      <div class="pack-top"></div>
      <div class="pack-body">
        <span>UMADIGI</span>
        <strong>JKT48 PM PACK</strong>
      </div>
    </div>
  `;
}

function renderCard(item) {
  const safeItem = normalizeGachaItem(item);
  return `
    <article class="gacha-card card-${safeItem.rarity} tilt-card">
      <div class="card-shine"></div>
      <span class="rank-badge">${safeItem.rank}</span>
      <span class="card-code">${safeItem.level}-PM</span>
      <div class="member-card-photo">
        <img class="member-photo" src="${safeItem.image}" alt="${safeItem.name}" onerror="this.src='${safeItem.fallbackImage}'">
        <img class="member-frame" src="${JKT48_MEMBER_FRAME}" alt="" aria-hidden="true">
      </div>
      <div class="card-info">
        <strong>${safeItem.name}</strong>
        <span>Level ${safeItem.level}</span>
      </div>
    </article>
  `;
}

function renderResult(item) {
  const result = document.getElementById('gacha-result');
  if (!result) return;
  result.innerHTML = renderCard(item);
  bindTiltCards(result);
}

function updateEventView() {
  const state = getEventState();
  const uniqueUltraRare = [...new Set(state.ultraRare)];
  const collectedNames = getCollectedNames(state);
  const progress = document.getElementById('ur-progress');
  const collection = document.getElementById('ultra-collection');
  const collectionProgress = document.getElementById('collection-progress');
  const overallProgressText = document.getElementById('overall-progress-text');
  const overallProgressBar = document.getElementById('overall-progress-bar');
  const rewardPanel = document.getElementById('reward-panel');
  const rewardMember = document.getElementById('reward-member');
  const rewardLink = document.getElementById('reward-link');

  if (progress) {
    progress.textContent = `${Math.min(uniqueUltraRare.length, ULTRA_RARE_TARGET)} / ${ULTRA_RARE_TARGET}`;
  }

  if (collection) {
    collection.innerHTML = renderCollectionAlbum(collectedNames);
    bindTiltCards(collection);
  }

  if (collectionProgress) {
    collectionProgress.textContent = `${collectedNames.length}/${gachaMembers.length} cards`;
  }

  if (overallProgressText) {
    overallProgressText.textContent = `${collectedNames.length}/${gachaMembers.length} cards`;
  }

  if (overallProgressBar) {
    overallProgressBar.style.width = `${Math.round((collectedNames.length / gachaMembers.length) * 100)}%`;
  }

  if (rewardPanel && rewardMember && rewardLink) {
    const unlocked = uniqueUltraRare.length >= ULTRA_RARE_TARGET;
    rewardPanel.hidden = !unlocked;
    if (unlocked) {
      if (!state.rewardMember) {
        state.rewardMember = uniqueUltraRare[Math.floor(Math.random() * uniqueUltraRare.length)];
        saveEventState(state);
      }

      rewardMember.textContent = `Selamat! Kamu membuka akses PM gratis random. Member reward kamu: ${state.rewardMember}.`;
      rewardLink.href = FREE_PM_ACCESS_LINK;
    }
  }
}

function renderCollectionAlbum(collectedNames) {
  const rarityOrder = ['ultraRare', 'rare', 'uncommon', 'common'];
  return rarityOrder.map(rarity => {
    const items = gachaMembers
      .filter(member => member.rarity === rarity)
      .sort((a, b) => a.name.localeCompare(b.name));

    const ownedCount = items.filter(member => collectedNames.includes(member.name)).length;

    return `
      <div class="collection-rarity-group">
        <div class="rarity-title">
          <span class="rarity-dot rarity-${rarity}"></span>
          <strong>${rarityConfig[rarity].rank}</strong>
          <em>${ownedCount}/${items.length} collected</em>
        </div>
        <div class="collection-grid">
          ${items.map(member => renderCollectionCard(member, collectedNames.includes(member.name))).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderCollectionCard(member, isOwned) {
  const config = rarityConfig[member.rarity];
  if (!isOwned) {
    return `
      <article class="collection-card collection-card-locked">
        <div class="locked-question">?</div>
        <span>???</span>
      </article>
    `;
  }

  return `
    <article class="collection-card card-${member.rarity} tilt-card">
      <span class="mini-rank">${config.rank}</span>
      <div class="collection-photo">
        <img class="member-photo" src="${member.image}" alt="${member.name}" onerror="this.src='${member.fallbackImage}'">
        <img class="member-frame" src="${JKT48_MEMBER_FRAME}" alt="" aria-hidden="true">
      </div>
      <strong>${member.name}</strong>
      <small>${config.level} Card</small>
    </article>
  `;
}

function openPackAnimation() {
  const result = document.getElementById('gacha-result');
  if (!result) return;

  result.innerHTML = `
    <div class="gacha-pack is-opening">
      <div class="pack-tear"></div>
      <div class="pack-top"></div>
      <div class="pack-body">
        <span>OPENING</span>
        <strong>JKT48 PM PACK</strong>
      </div>
    </div>
  `;
}

function runGacha() {
  const button = document.getElementById('gacha-button');
  const result = document.getElementById('gacha-result');
  if (!result || !button) return;

  button.disabled = true;
  result.classList.add('is-rolling');
  openPackAnimation();

  setTimeout(() => {
    const item = pickGachaItem();
    const state = getEventState();
    state.last = item;
    state.totalPulls += 1;
    state.collection.unshift(item);
    state.collection = state.collection.slice(0, 60);

    if (item.rarity === 'ultraRare' && !state.ultraRare.includes(item.name)) {
      state.ultraRare.push(item.name);
      if (window.toast) window.toast.success(`Ultra Rare didapat: ${item.name}`, 2400);
    } else if (window.toast) {
      window.toast.info(`Kamu mendapatkan ${item.rank}: ${item.name}`, 1800);
    }

    saveEventState(state);
    renderResult(item);
    updateEventView();
    result.classList.remove('is-rolling');
    button.disabled = false;
  }, 900);
}

function backupEventData() {
  const field = document.getElementById('gacha-backup-data');
  const data = btoa(unescape(encodeURIComponent(JSON.stringify(getEventState()))));
  if (field) {
    field.value = data;
    field.select();
  }
  if (window.toast) window.toast.success('Data event berhasil dibuat. Simpan kode backup ini.', 2400);
}

function bindTiltCards(scope = document) {
  scope.querySelectorAll('.tilt-card').forEach(card => {
    if (card.dataset.tiltReady) return;
    card.dataset.tiltReady = 'true';

    const updateTilt = event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) - 0.5;
      const y = ((event.clientY - rect.top) / rect.height) - 0.5;
      card.style.setProperty('--tilt-x', `${(-y * 16).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 18).toFixed(2)}deg`);
      card.style.setProperty('--shine-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--shine-y', `${event.clientY - rect.top}px`);
      card.classList.add('is-tilting');
    };

    card.addEventListener('pointermove', updateTilt);
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
    card.addEventListener('pointerdown', updateTilt);
  });
}

function restoreEventData() {
  const field = document.getElementById('gacha-backup-data');
  const rawData = field?.value.trim();
  if (!rawData) {
    if (window.toast) window.toast.info('Tempel data backup dulu untuk restore.', 2200);
    return;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(rawData))));
    const state = normalizeState(parsed);
    saveEventState(state);
    if (state.last) {
      renderResult(state.last);
    } else {
      renderPackIdle();
    }
    updateEventView();
    if (window.toast) window.toast.success('Data event berhasil direstore.', 2200);
  } catch (error) {
    if (window.toast) {
      window.toast.info('Data backup tidak valid. Cek lagi kode yang ditempel.', 2600);
    } else {
      alert('Data backup tidak valid.');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const gachaButton = document.getElementById('gacha-button');
  const backupButton = document.getElementById('gacha-backup');
  const restoreButton = document.getElementById('gacha-restore');
  const rewardLink = document.getElementById('reward-link');
  const state = getEventState();

  if (state.last) {
    renderResult(state.last);
  } else {
    renderPackIdle();
  }

  updateEventView();
  bindTiltCards();
  loadAutoMemberImages().then(() => {
    updateEventView();
    bindTiltCards();
  });

  gachaButton?.addEventListener('click', runGacha);
  backupButton?.addEventListener('click', backupEventData);
  restoreButton?.addEventListener('click', restoreEventData);
  rewardLink?.addEventListener('click', event => {
    if (FREE_PM_ACCESS_LINK === '#') {
      event.preventDefault();
      if (window.toast) {
        window.toast.info('Link access belum diatur. Ganti FREE_PM_ACCESS_LINK di js/event-gacha.js', 2600);
      } else {
        alert('Link access belum diatur.');
      }
    }
  });
});
