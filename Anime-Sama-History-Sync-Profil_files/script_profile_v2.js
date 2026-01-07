/* +CARTES TEMPLATES */

function carteHistorique(nom, url, image, type, langue, episode) {
    // Map langue vers drapeau
    const langueToFlag = {
        'VF': 'flag_fr',
        'VO': 'flag_jp',
        'VOSTFR': 'flag_jp',
        'VA': 'flag_en',
        'VASTFR': 'flag_en',
        'VJ': 'flag_jp',
        'VJSTFR': 'flag_jp',
        'VKR': 'flag_kr',
        'VCN': 'flag_cn',
        'VAR': 'flag_ar',
        'VQC': 'flag_qc',
    };
    const flagCode = langueToFlag[langue] || 'unknown';
	let html;
	//défaut : document.write('<div class="carteHistorique relative z-0 flex shrink-0 w-32 md:w-44 outline outline-sky-800 outline-1 bg-black rounded overflow-hidden my-14 mr-3 ml-2 md:ml-5 shadow-lg shadow-black hover:shadow-zinc-900 transition-all duration-200 cursor-pointer"><a class="supprHistorique absolute right-0 rounded"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 text-white hover:text-red-900 bg-black shadow-lg shadow-black outline outline-2 outline-gray-700 rounded transition-all duration-200"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg></a><a href="'+url+'"><img class="w-full h-30 md:h-42 object-cover transition-all duration-200 cursor-pointer" src="'+image+'" alt="'+image+'"><div class="px-4 py-2"><h1 class="text-gray-200 font-semibold text-sm text-center line-clamp-2 md:line-clamp-3 uppercase hover:text-clip">'+nom+'</h1><hr class="border-t border-slate-500 my-2"></hr><div class="flex flex-wrap justify-center"><button class="rounded rounded-xs bg-indigo-900 text-white text-xs mx-0.5 mt-1 px-1 py-0.5">'+type+'</button><button class="rounded rounded-xs bg-opacity-50 bg-blue-500 text-white text-xs mx-0.5 mt-1 px-1 py-0.5">'+langue+'</button><button class="rounded rounded-xs bg-opacity-50 bg-cyan-500 text-white text-xs mx-0.5 mt-1 px-1 py-0.5">'+episode+'</button></div></div></a></div>');
	if (type === "Scans") {
	html = `
        <div class="carteHistorique shrink-0 card-base scan-card-premium">

                <div class="card-image-container">
                    <img class="card-image" src="${image}" alt="${nom}" loading="lazy">
                    <div class="image-overlay"></div>
                    <div class="image-shine"></div>
                    
                    <div class="badge scan-badge">
                        <p class="badge-text">Scans</p>
                        <div class="badge-glow"></div>
                    </div>
                    
                    <div class="badge language-badge-middle">
                        <img 
                            class="flag-icon" 
                            src="https://raw.githubusercontent.com/Anime-Sama/IMG/img/autres/${flagCode}.png" 
                            alt="${langue}" 
                            title="${langue}"
                            loading="lazy"
                        >
                        <div class="badge-glow"></div>
                    </div>
                </div>
                
                <div class="card-content">
                    <h1 class="card-title uppercase">${nom}</h1>
                    <div class="content-divider"></div>
                    <div class="card-info">
                        <div class="info-item chapter">
                            <svg class="info-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            <span>${episode}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
	`;
	} else {
	html = `
        <div class="carteHistorique shrink-0 card-base anime-card-premium">
            
                <div class="card-image-container">
                    <img class="card-image" src="${image}" alt="${nom}" loading="lazy">
                    <div class="image-overlay"></div>
                    <div class="image-shine"></div>
                    
                    <div class="badge anime-badge">
                        <p class="badge-text">Anime</p>
                        <div class="badge-glow"></div>
                    </div>
                    
                    <div class="badge language-badge-middle">
                        <img 
                            class="flag-icon" 
                            src="https://raw.githubusercontent.com/Anime-Sama/IMG/img/autres/${flagCode}.png" 
                            alt="${langue}" 
                            title="${langue}"
                            loading="lazy"
                        >
                        <div class="badge-glow"></div>
                    </div>
                </div>
                
                <div class="card-content">
                    <h1 class="card-title uppercase">${nom}</h1>
                    <div class="content-divider"></div>
                    <div class="card-info">
                        <div class="info-item episode text-sm">
                            <svg class="info-icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                            <span>${type} ${episode}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
	`;
	}

	// Insérer juste avant la balise <script> qui appelle cette fonction
	if (document.currentScript) {
	document.currentScript.insertAdjacentHTML("beforebegin", html);
	} else {
	// Fallback si document.currentScript n'est pas supporté
	document.write(html);
	}
}


function carteWatchlist(nom, url, image) {
    let html = `
    <div class="carteWatchlist shrink-0 catalog-card">
            <div class="card-image-container">
                <img class="card-image" src="${image}" alt="${image}">
                <div class="image-overlay"></div>
                <div class="image-shine"></div>
            </div>
            <div class="card-content">
                <h1 class="card-title">${nom}</h1>
            </div>
        </a>
    </div>
    `;

    if (document.currentScript) {
        document.currentScript.insertAdjacentHTML("beforebegin", html);
    } else {
        document.write(html);
    }
}


function carteFavoris(nom, url, image) {
    let html = `
    <div class="carteFavori shrink-0 catalog-card">
            <div class="card-image-container">
                <img class="card-image" src="${image}" alt="${image}">
                <div class="image-overlay"></div>
                <div class="image-shine"></div>
            </div>
            <div class="card-content">
                <h1 class="card-title">${nom}</h1>
            </div>
        </a>
    </div>
    `;

    if (document.currentScript) {
        document.currentScript.insertAdjacentHTML("beforebegin", html);
    } else {
        document.write(html);
    }
}


function carteVus(nom, url, image) {
    let html = `
    <div class="carteVu shrink-0 catalog-card">
            <div class="card-image-container">
                <img class="card-image" src="${image}" alt="${image}">
                <div class="image-overlay"></div>
                <div class="image-shine"></div>
            </div>
            <div class="card-content">
                <h1 class="card-title">${nom}</h1>
            </div>
        </a>
    </div>
    `;

    if (document.currentScript) {
        document.currentScript.insertAdjacentHTML("beforebegin", html);
    } else {
        document.write(html);
    }
}



// ============================================
// FONCTIONS CARTES
// ============================================




//fonctions suppression des listes
$("#supprAllHistorique").on("click", function() {
    // ✅ NETTOYER LE LOCALSTORAGE
    localStorage.removeItem('histoNom');
    localStorage.removeItem('histoUrl');
    localStorage.removeItem('histoImg');
    localStorage.removeItem('histoType');
    localStorage.removeItem('histoLang');
    localStorage.removeItem('histoEp');
    
    // ✅ METTRE À JOUR LES VARIABLES GLOBALES
    histoNom = [];
    histoUrl = [];
    histoImg = [];
    histoType = [];
    histoLang = [];
    histoEp = [];
    
    // ✅ METTRE À JOUR L'UI
    $(".carteHistorique").hide();
    $(".msgEmptyHisto").show();
    $("#nbHistorique").html("0");
    
    // ✅ SYNCHRONISER AVEC LE SERVEUR
    syncHistoryToServer();
});

$("#supprAllWatchlist").on("click", function() {
    localStorage.removeItem('watchlistNom');
    localStorage.removeItem('watchlistUrl');
    localStorage.removeItem('watchlistImg');
    
    // ✅ METTRE À JOUR LES VARIABLES GLOBALES
    watchlistNom = [];
    watchlistUrl = [];
    watchlistImg = [];
    
    $(".carteWatchlist").hide();
    $(".msgEmptyWatchlist").show();
    $("#nbWatchlist").html("0");
    
    syncWatchlistToServer();
});

$("#supprAllFavoris").on("click", function() {
    localStorage.removeItem('favoriNom');
    localStorage.removeItem('favoriUrl');
    localStorage.removeItem('favoriImg');
    
    // ✅ METTRE À JOUR LES VARIABLES GLOBALES
    favoriNom = [];
    favoriUrl = [];
    favoriImg = [];
    
    $(".carteFavori").hide();
    $(".msgEmptyFav").show();
    $("#nbFavori").html("0");
    
    syncFavsToServer();
});

$("#supprAllVus").on("click", function() {
    localStorage.removeItem('vuNom');
    localStorage.removeItem('vuUrl');
    localStorage.removeItem('vuImg');
    
    // ✅ METTRE À JOUR LES VARIABLES GLOBALES
    vuNom = [];
    vuUrl = [];
    vuImg = [];
    
    $(".carteVu").hide();
    $(".msgEmptyVu").show();
    $("#nbVu").html("0");
    
    syncViewedToServer();
});


//fonctions suppression des cartes
$(document).on("click", ".supprHistorique", function() {
    var urlcurr = $(this).next('a').attr('href');
    var index = histoUrl.indexOf(urlcurr);
    
    // ✅ VÉRIFIER QUE L'INDEX EST VALIDE
    if (index === -1) {
        console.warn('URL non trouvée dans histoUrl:', urlcurr);
        return;
    }
    
    histoNom.splice(index, 1);
    histoUrl.splice(index, 1);
    histoImg.splice(index, 1);
    histoType.splice(index, 1);
    histoLang.splice(index, 1);
    histoEp.splice(index, 1);
    
    localStorage.setItem('histoNom', JSON.stringify(histoNom));
    localStorage.setItem('histoUrl', JSON.stringify(histoUrl));
    localStorage.setItem('histoImg', JSON.stringify(histoImg));
    localStorage.setItem('histoType', JSON.stringify(histoType));
    localStorage.setItem('histoLang', JSON.stringify(histoLang));
    localStorage.setItem('histoEp', JSON.stringify(histoEp));

    $(this).closest(".carteHistorique").hide();
    $("#nbHistorique").html(histoNom.length);

    syncHistoryToServer();
});

$(".supprWatchlist").on("click", function() {
    var urlcurr = $(this).next('a').attr('href');
    var index = watchlistUrl.indexOf(urlcurr);
    
    // ✅ VÉRIFIER QUE L'INDEX EST VALIDE
    if (index === -1) {
        console.warn('URL non trouvée dans watchlistUrl:', urlcurr);
        return;
    }

    watchlistNom.splice(index, 1);
    watchlistUrl.splice(index, 1);
    watchlistImg.splice(index, 1);
    
    localStorage.setItem('watchlistNom', JSON.stringify(watchlistNom));
    localStorage.setItem('watchlistUrl', JSON.stringify(watchlistUrl));
    localStorage.setItem('watchlistImg', JSON.stringify(watchlistImg));

    $(this).closest(".carteWatchlist").hide();
    $("#nbWatchlist").html(watchlistNom.length);

    syncWatchlistToServer();
});

$(".supprFavoris").on("click", function() {
    var urlcurr = $(this).next('a').attr('href');
    var index = favoriUrl.indexOf(urlcurr);
    
    // ✅ VÉRIFIER QUE L'INDEX EST VALIDE
    if (index === -1) {
        console.warn('URL non trouvée dans favoriUrl:', urlcurr);
        return;
    }
    
    favoriNom.splice(index, 1);
    favoriUrl.splice(index, 1);
    favoriImg.splice(index, 1);
    
    localStorage.setItem("favoriNom", JSON.stringify(favoriNom));
    localStorage.setItem("favoriUrl", JSON.stringify(favoriUrl));
    localStorage.setItem("favoriImg", JSON.stringify(favoriImg));

    $(this).closest(".carteFavori").hide();
    $("#nbFavori").html(favoriNom.length);

    syncFavsToServer();
});

$(".supprVus").on("click", function() {
    var urlcurr = $(this).next('a').attr('href');
    var index = vuUrl.indexOf(urlcurr);
    
    // ✅ VÉRIFIER QUE L'INDEX EST VALIDE
    if (index === -1) {
        console.warn('URL non trouvée dans vuUrl:', urlcurr);
        return;
    }
    
    vuNom.splice(index, 1);
    vuUrl.splice(index, 1);
    vuImg.splice(index, 1);
    
    localStorage.setItem("vuNom", JSON.stringify(vuNom));
    localStorage.setItem("vuUrl", JSON.stringify(vuUrl));
    localStorage.setItem("vuImg", JSON.stringify(vuImg));

    $(this).closest(".carteVu").hide();
    $("#nbVu").html(vuNom.length);

    syncViewedToServer();
});









// ============================================
// COMPTES
// ============================================


// ============================================
// 🔄 INITIALISER LES VARIABLES GLOBALES
// ============================================

// Historique
var histoNom = JSON.parse(localStorage.getItem('histoNom')) || [];
var histoUrl = JSON.parse(localStorage.getItem('histoUrl')) || [];
var histoImg = JSON.parse(localStorage.getItem('histoImg')) || [];
var histoType = JSON.parse(localStorage.getItem('histoType')) || [];
var histoLang = JSON.parse(localStorage.getItem('histoLang')) || [];
var histoEp = JSON.parse(localStorage.getItem('histoEp')) || [];

// Watchlist
var watchlistNom = JSON.parse(localStorage.getItem('watchlistNom')) || [];
var watchlistUrl = JSON.parse(localStorage.getItem('watchlistUrl')) || [];
var watchlistImg = JSON.parse(localStorage.getItem('watchlistImg')) || [];

// Favoris
var favoriNom = JSON.parse(localStorage.getItem('favoriNom')) || [];
var favoriUrl = JSON.parse(localStorage.getItem('favoriUrl')) || [];
var favoriImg = JSON.parse(localStorage.getItem('favoriImg')) || [];

// Vus
var vuNom = JSON.parse(localStorage.getItem('vuNom')) || [];
var vuUrl = JSON.parse(localStorage.getItem('vuUrl')) || [];
var vuImg = JSON.parse(localStorage.getItem('vuImg')) || [];


// ============================================
// 🔄 SYNCHRONISER VERS LE SERVEUR
// ============================================

// Favoris
async function syncFavsToServer() {
    const loggedIn = await isUserLoggedIn();
    if (!loggedIn) return;
    
    const favorites = {
        nom: favoriNom,
        url: favoriUrl,
        img: favoriImg
    };
    
    try {
        const response = await fetch('/api/sync-favorites.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({favorites: favorites})
        });
        const data = await response.json();
        console.log('✅ Favoris synchronisés:', data);
    } catch (err) {
        console.log('⚠️ Sync favoris échouée:', err);
    }
}

// Watchlist
async function syncWatchlistToServer() {
    const loggedIn = await isUserLoggedIn();
    if (!loggedIn) return;
    
    const watchlist = {
        nom: watchlistNom,
        url: watchlistUrl,
        img: watchlistImg
    };
    
    try {
        const response = await fetch('/api/sync-watchlist.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({watchlist: watchlist})
        });
        const data = await response.json();
        console.log('✅ Watchlist synchronisée:', data);
    } catch (err) {
        console.log('⚠️ Sync watchlist échouée:', err);
    }
}

// Vus
async function syncViewedToServer() {
    const loggedIn = await isUserLoggedIn();
    if (!loggedIn) return;
    
    const viewed = {
        nom: vuNom,
        url: vuUrl,
        img: vuImg
    };
    
    try {
        const response = await fetch('/api/sync-viewed.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({viewed: viewed})
        });
        const data = await response.json();
        console.log('✅ Vus synchronisés:', data);
    } catch (err) {
        console.log('⚠️ Sync vus échouée:', err);
    }
}

// Historique
async function syncHistoryToServer() {
    const loggedIn = await isUserLoggedIn();
    if (!loggedIn) return;
    
    const history = {
        nom: histoNom,
        url: histoUrl,
        img: histoImg,
        type: histoType,
        lang: histoLang,
        ep: histoEp
    };
    
    try {
        const response = await fetch('/api/sync-history.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({history: history})
        });
        const data = await response.json();
        console.log('✅ Historique synchronisé:', data);
    } catch (err) {
        console.log('⚠️ Sync historique échouée:', err);
    }
}

// ===== DÉCONNEXION =====
async function handleLogout() {
    try {
        const response = await fetch('/api/auth/logout.php');
        const data = await response.json();
        
        if (data.success) {
            // ✅ Actualiser la page pour que PHP recharge la session
            window.location.reload();
        }
    } catch (error) {
        console.error('Erreur déconnexion:', error);
        // En cas d'erreur, actualiser quand même
        window.location.reload();
    }
}

// ===== SUPPRIMER TOUTES LES DONNÉES =====
async function handleDeleteAllData() {
    // ✅ Confirmation avec double vérification
    const confirm1 = confirm('⚠️ ATTENTION !\n\nVous êtes sur le point de supprimer TOUTES vos données :\n- Progression (épisodes/chapitres)\n- Historique\n- Favoris\n- Watchlist\n- Vus\n\nCette action est IRRÉVERSIBLE.\n\nVoulez-vous continuer ?');
    
    if (!confirm1) return;
    
    const confirm2 = confirm('🚨 DERNIÈRE CHANCE !\n\nToutes vos données seront définitivement perdues.\n\nÊtes-vous VRAIMENT sûr ?');
    
    if (!confirm2) return;
    
    try {
        // ✅ 1. Supprimer côté SERVEUR
        const response = await fetch('/api/delete-all-data.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Erreur serveur');
        }
        
        console.log('✅ Données serveur supprimées:', data);
        
        // ✅ 2. Supprimer côté LOCAL (localStorage)
        clearAllLocalData();
        
        // ✅ 3. Afficher message de succès et recharger
        alert('✅ Toutes vos données ont été supprimées avec succès.');
        window.location.reload();
        
    } catch (error) {
        console.error('❌ Erreur suppression:', error);
        alert('❌ Erreur lors de la suppression : ' + error.message);
    }
}

// ✅ FONCTION HELPER : Vider tout le localStorage lié au site
function clearAllLocalData() {
    // Supprimer les favoris
    localStorage.removeItem('favoriNom');
    localStorage.removeItem('favoriUrl');
    localStorage.removeItem('favoriImg');
    
    // Supprimer la watchlist
    localStorage.removeItem('watchlistNom');
    localStorage.removeItem('watchlistUrl');
    localStorage.removeItem('watchlistImg');
    
    // Supprimer les vus
    localStorage.removeItem('vuNom');
    localStorage.removeItem('vuUrl');
    localStorage.removeItem('vuImg');
    
    // Supprimer l'historique
    localStorage.removeItem('histoNom');
    localStorage.removeItem('histoUrl');
    localStorage.removeItem('histoImg');
    localStorage.removeItem('histoType');
    localStorage.removeItem('histoLang');
    localStorage.removeItem('histoEp');
    
    // Supprimer toutes les progressions (savedEpName*, savedEpNb*, savedChapName*, savedChapNb*)
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
            key.startsWith('savedEpName') || 
            key.startsWith('savedEpNb') || 
            key.startsWith('savedChapName') || 
            key.startsWith('savedChapNb')
        )) {
            keysToRemove.push(key);
        }
    }
    
    // Supprimer les clés (on ne peut pas le faire dans la boucle car ça décale les index)
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    console.log('✅ LocalStorage vidé:', keysToRemove.length, 'clés de progression supprimées');
}