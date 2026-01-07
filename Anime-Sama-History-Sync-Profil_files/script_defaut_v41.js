/* Menu Mobile */
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.asn-burger');
    const menu = document.querySelector('.asn-mobile-menu');
    const backdrop = document.querySelector('.asn-menu-backdrop');
    const navLinks = document.querySelectorAll('.asn-menu-nav a');

    // Logo responsif
    function updateLogo() {
        const logoDesktop = document.querySelector('.asn-logo-desktop');
        const logoMobile = document.querySelector('.asn-logo-mobile');
    }

    // Menu mobile - Toggle
    if (burger && menu) {
        burger.addEventListener('click', function() {
            menu.classList.toggle('asn-active');
        });
    }

    // Fermer le menu au clic sur le backdrop
    if (backdrop && menu) {
        backdrop.addEventListener('click', function() {
            menu.classList.remove('asn-active');
        });
    }

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('asn-active');
        });
    });

    updateLogo();
    window.addEventListener('resize', updateLogo);
});

$(document).ready(function(){
    /* BARRE DE RECHERCHE */
    function load_data(query){
        $.ajax({
            url: "/template-php/defaut/fetch.php",
            method: "POST",
            data: { query: query },
            success: function(data){
                $('#asn-result-desktop').html(data);
                $('#asn-result-mobile').html(data);
            }
        });
    }

    $('input[name="search_text"]').on('keyup input search', function(){
        var search = $(this).val();
        if (search !== ''){
            load_data(search);
        } else {
            $('#asn-result-desktop').empty();
            $('#asn-result-mobile').empty();
        }
    });

    $('input[name="search_text"]').on('focus', function(){
        var search = $(this).val();
        if (search !== ''){
            load_data(search);
        }
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('input[name="search_text"], #asn-result-desktop, #asn-result-mobile').length) {
            $('#asn-result-desktop').empty();
            $('#asn-result-mobile').empty();
        }
    });

    /* GRAB SCROLL */
    let isDragging = false;
    let startX, scrollLeft;
    let activeDiv = null;

    $('.grabScroll').on('mousedown', function(e) {
        isDragging = true;
        activeDiv = $(this);
        activeDiv.addClass('dragging');
        startX = e.pageX - activeDiv.offset().left;
        scrollLeft = activeDiv.scrollLeft();
    });

    $(document).on('mousemove', function(e) {
        if (!isDragging || !activeDiv) return;
        e.preventDefault();
        const x = e.pageX - activeDiv.offset().left;
        const walk = (x - startX) * 2;
        activeDiv.scrollLeft(scrollLeft - walk);
    });

    $(document).on('mouseup', function() {
        isDragging = false;
        if (activeDiv) {
            activeDiv.removeClass('dragging');
            activeDiv = null;
        }
    });
});

/* Images - Désactiver clic droit */
$('body').on('contextmenu', 'img', function(e){return false;});

/* Scroll Left et Right containers */
function decalRight(idContainer){ document.getElementById(idContainer).scrollLeft += 1000; }
function decalLeft(idContainer){ document.getElementById(idContainer).scrollLeft -= 1000; }

/* Scroll vers le haut */
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);

function updateScrollProgress() {
    const svg = document.getElementById('scrollProgressSvg');
    if (!svg) return;
    const circle = svg.querySelector('circle');
    if (!circle) return;

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollRatio = scrollHeight === 0 ? 0 : scrollTop / scrollHeight;

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - scrollRatio);

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${offset}`;
}

/* ============================================
   SYNCHRONISATION GLOBALE DES DONNÉES
   ============================================ */

// Vérifier si connecté (avec cache pour éviter les appels multiples)
let _isLoggedInCache = null;
let _isLoggedInCacheTime = 0;
const CACHE_DURATION = 5000; // 5 secondes

async function isUserLoggedIn() {
    const now = Date.now();
    if (_isLoggedInCache !== null && (now - _isLoggedInCacheTime) < CACHE_DURATION) {
        return _isLoggedInCache;
    }
    
    try {
        const response = await fetch('/api/get-data.php');
        const data = await response.json();
        _isLoggedInCache = data.logged_in === true;
        _isLoggedInCacheTime = now;
        return _isLoggedInCache;
    } catch (e) {
        return false;
    }
}

// Invalider le cache (appelé après login/logout)
function invalidateLoginCache() {
    _isLoggedInCache = null;
    _isLoggedInCacheTime = 0;
}

// ✅ Détecter si on est sur la page profil
function isOnProfilePage() {
    return window.location.pathname.includes('/profil');
}

// ✅ LOGIQUE CORRIGÉE : 
// - need_merge=true (première connexion) → merger local vers serveur (LOCAL ÉCRASE SERVEUR)
// - need_merge=false (déjà synchronisé) → charger serveur directement (source de vérité)
async function loadAllDataFromServer() {
    try {
        const serverData = await response.json();

        if (!serverData.logged_in) {
            return false;
        }

        // ✅ MERGE UNIQUEMENT À LA PREMIÈRE CONNEXION
        if (serverData.need_merge === true) {
            console.log('🔄 Première connexion détectée, merge des données locales vers serveur...');
            
            const localData = {
                progress: getLocalProgress(),
                favorites: {
                    nom: JSON.parse(localStorage.getItem('favoriNom')) || [],
                    url: JSON.parse(localStorage.getItem('favoriUrl')) || [],
                    img: JSON.parse(localStorage.getItem('favoriImg')) || []
                },
                watchlist: {
                    nom: JSON.parse(localStorage.getItem('watchlistNom')) || [],
                    url: JSON.parse(localStorage.getItem('watchlistUrl')) || [],
                    img: JSON.parse(localStorage.getItem('watchlistImg')) || []
                },
                viewed: {
                    nom: JSON.parse(localStorage.getItem('vuNom')) || [],
                    url: JSON.parse(localStorage.getItem('vuUrl')) || [],
                    img: JSON.parse(localStorage.getItem('vuImg')) || []
                },
                history: {
                    nom: JSON.parse(localStorage.getItem('histoNom')) || [],
                    url: JSON.parse(localStorage.getItem('histoUrl')) || [],
                    img: JSON.parse(localStorage.getItem('histoImg')) || [],
                    type: JSON.parse(localStorage.getItem('histoType')) || [],
                    lang: JSON.parse(localStorage.getItem('histoLang')) || [],
                    ep: JSON.parse(localStorage.getItem('histoEp')) || []
                }
            };

            // Envoyer au serveur pour merge (LOCAL ÉCRASE SERVEUR)
            try {
                const mergeResponse = await fetch('/api/merge-data.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(localData)
                });
                
                const mergeResult = await mergeResponse.json();
                console.log('✅ Merge effectué, need_merge désactivé', mergeResult);
                
                // ✅ APRÈS LE MERGE : Mettre à jour le localStorage avec les données fusionnées
                if (mergeResult.merged) {
                    updateLocalStorageFromServer({ 
                        progress: mergeResult.merged.progress,
                        favorites: mergeResult.merged.favorites,
                        watchlist: mergeResult.merged.watchlist,
                        viewed: mergeResult.merged.viewed,
                        history: mergeResult.merged.history
                    });
                }
                
                // ✅ SI ON EST SUR LA PAGE PROFIL → RECHARGER POUR ACTUALISER L'AFFICHAGE
                if (isOnProfilePage()) {
                    console.log('🔄 Page profil détectée, rechargement pour actualiser les cartes...');
                    window.location.reload();
                    return true; // Arrêter ici car la page va se recharger
                }
                
            } catch (e) {
                console.log('⚠️ Merge échoué:', e);
            }

        } else {
            // ✅ PAS DE MERGE : Charger directement depuis le serveur (source de vérité)
            console.log('✅ Chargement des données depuis le serveur...');
            updateLocalStorageFromServer(serverData);
        }

        // Rafraîchir l'UI
        if (typeof updateUI === 'function') {
            updateUI();
        }

        if (typeof updateUIAfterLoad === 'function') {
            updateUIAfterLoad();
        }

        return true;

    } catch (e) {
        console.log('Erreur loadAllDataFromServer:', e);
        return false;
    }
}

// ✅ CORRIGÉ : Extraire la progression du localStorage (ANIME + SCANS)
function getLocalProgress() {
    const progress = {};
    const allKeys = Object.keys(localStorage);
   
    for (const key of allKeys) {
        // ✅ Gérer les clés ANIME (savedEpName)
        if (key.startsWith('savedEpName')) {
            const urlKey = key.replace('savedEpName', '');
            const epName = JSON.parse(localStorage.getItem('savedEpName' + urlKey)) || '';
            const epNb = localStorage.getItem('savedEpNb' + urlKey) || 0;
           
            if (epName || epNb) {
                progress[urlKey] = {
                    name: epName,
                    num: parseInt(epNb)
                };
            }
        }
        
        // ✅ Gérer les clés SCANS (savedChapName)
        if (key.startsWith('savedChapName')) {
            const urlKey = key.replace('savedChapName', '');
            const chapName = JSON.parse(localStorage.getItem('savedChapName' + urlKey)) || '';
            const chapNb = localStorage.getItem('savedChapNb' + urlKey) || 0;
           
            if (chapName || chapNb) {
                // Ne pas écraser si déjà présent (priorité aux animes si même URL)
                if (!progress[urlKey]) {
                    progress[urlKey] = {
                        name: chapName,
                        num: parseInt(chapNb)
                    };
                }
            }
        }
    }
   
    return progress;
}

// ✅ CORRIGÉ : Mettre à jour le localStorage avec les données du serveur (ANIME + SCANS)
function updateLocalStorageFromServer(serverData) {
    // PROGRESS - Écrire dans les deux types de clés selon le contexte
    for (const [url, progData] of Object.entries(serverData.progress || {})) {
        const name = progData.name || '';
        const num = progData.num || 0;
        
        // ✅ Détecter si c'est un scan ou un anime via l'URL
        const isScan = url.includes('/scans/') || url.includes('/scan/') || url.includes('/s2/');
        
        if (isScan) {
            // Écrire pour les SCANS
            localStorage.setItem('savedChapName' + url, JSON.stringify(name));
            localStorage.setItem('savedChapNb' + url, num);
        } else {
            // Écrire pour les ANIMES
            localStorage.setItem('savedEpName' + url, JSON.stringify(name));
            localStorage.setItem('savedEpNb' + url, num);
        }
    }

    // FAVORIS
    if (serverData.favorites && serverData.favorites.nom) {
        localStorage.setItem('favoriNom', JSON.stringify(serverData.favorites.nom || []));
        localStorage.setItem('favoriUrl', JSON.stringify(serverData.favorites.url || []));
        localStorage.setItem('favoriImg', JSON.stringify(serverData.favorites.img || []));
    }

    // WATCHLIST
    if (serverData.watchlist && serverData.watchlist.nom) {
        localStorage.setItem('watchlistNom', JSON.stringify(serverData.watchlist.nom || []));
        localStorage.setItem('watchlistUrl', JSON.stringify(serverData.watchlist.url || []));
        localStorage.setItem('watchlistImg', JSON.stringify(serverData.watchlist.img || []));
    }

    // VUS
    if (serverData.viewed && serverData.viewed.nom) {
        localStorage.setItem('vuNom', JSON.stringify(serverData.viewed.nom || []));
        localStorage.setItem('vuUrl', JSON.stringify(serverData.viewed.url || []));
        localStorage.setItem('vuImg', JSON.stringify(serverData.viewed.img || []));
    }

    // HISTORIQUE
    if (serverData.history && serverData.history.nom) {
        localStorage.setItem('histoNom', JSON.stringify(serverData.history.nom || []));
        localStorage.setItem('histoUrl', JSON.stringify(serverData.history.url || []));
        localStorage.setItem('histoImg', JSON.stringify(serverData.history.img || []));
        localStorage.setItem('histoType', JSON.stringify(serverData.history.type || []));
        localStorage.setItem('histoLang', JSON.stringify(serverData.history.lang || []));
        localStorage.setItem('histoEp', JSON.stringify(serverData.history.ep || []));
    }
}

// Synchroniser le merge vers le serveur
async function syncMergedDataToServer() {
    const loggedIn = await isUserLoggedIn();
    if (!loggedIn) return;

    const favoriNom = JSON.parse(localStorage.getItem('favoriNom')) || [];
    const favoriUrl = JSON.parse(localStorage.getItem('favoriUrl')) || [];
    const favoriImg = JSON.parse(localStorage.getItem('favoriImg')) || [];

    const watchlistNom = JSON.parse(localStorage.getItem('watchlistNom')) || [];
    const watchlistUrl = JSON.parse(localStorage.getItem('watchlistUrl')) || [];
    const watchlistImg = JSON.parse(localStorage.getItem('watchlistImg')) || [];

    const vuNom = JSON.parse(localStorage.getItem('vuNom')) || [];
    const vuUrl = JSON.parse(localStorage.getItem('vuUrl')) || [];
    const vuImg = JSON.parse(localStorage.getItem('vuImg')) || [];

    const histoNom = JSON.parse(localStorage.getItem('histoNom')) || [];
    const histoUrl = JSON.parse(localStorage.getItem('histoUrl')) || [];
    const histoImg = JSON.parse(localStorage.getItem('histoImg')) || [];
    const histoType = JSON.parse(localStorage.getItem('histoType')) || [];
    const histoLang = JSON.parse(localStorage.getItem('histoLang')) || [];
    const histoEp = JSON.parse(localStorage.getItem('histoEp')) || [];

    const favorites = {
        nom: favoriNom,
        url: favoriUrl,
        img: favoriImg
    };

    const watchlist = {
        nom: watchlistNom,
        url: watchlistUrl,
        img: watchlistImg
    };

    const viewed = {
        nom: vuNom,
        url: vuUrl,
        img: vuImg
    };

    const history = {
        nom: histoNom,
        url: histoUrl,
        img: histoImg,
        type: histoType,
        lang: histoLang,
        ep: histoEp
    };

    // Synchro favoris
    fetch('/api/sync-favorites.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({favorites: favorites})
    }).catch(err => {});

    // Synchro watchlist
    fetch('/api/sync-watchlist.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({watchlist: watchlist})
    }).catch(err => {});

    // Synchro viewed
    fetch('/api/sync-viewed.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({viewed: viewed})
    }).catch(err => {});

    // Synchro history
    fetch('/api/sync-history.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({history: history})
    }).catch(err => {});
}

// ✅ CORRIGÉ : Synchro local -> serveur (ANIME + SCANS)
async function syncLocalProgressToServer() {
    const loggedIn = await isUserLoggedIn();
    if (!loggedIn) return;

    const progress = getLocalProgress(); // Utilise la fonction corrigée

    if (Object.keys(progress).length > 0) {
        fetch('/api/sync-progress.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({progress: progress})
        }).catch(err => {});
    }
}

// Initialiser les données utilisateur
async function initializeUserData() {
    await new Promise(resolve => setTimeout(resolve, 500));

    const dataLoaded = await loadAllDataFromServer();

    if (dataLoaded) {
        if (typeof updateUIAfterLoad === 'function') {
            updateUIAfterLoad();
        }
    }
}

// Charger les données au démarrage
document.addEventListener('DOMContentLoaded', async function() {
    await loadAllDataFromServer();
});