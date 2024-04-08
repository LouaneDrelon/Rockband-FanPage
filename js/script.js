const iframes = document.querySelectorAll('.contenu iframe');
const precedent = document.querySelector('.precedent');
const suivant = document.querySelector('.suivant');

let indexActif = 0;
let lecteurs = []; // Tableau pour stocker les lecteurs Youtube

// Fonction pour charger le lecteur Youtube avec l'URL fournie
function chargerLecteur(url, index) {
  let lecteur;
  const onYouTubeIframeAPIReady = () => {
    lecteur = new YT.Player(iframes[index], {
      videoId: url.split("=")[1],
      playerVars: { 'autoplay': 1, 'loop': 1 },
      events: {
        'onReady': () => lecteur.mute() // Mettre en sourdine au démarrage
      }
    });
    lecteurs.push(lecteur);
  };

  if (window.YT && window.YT.loaded) {
    onYouTubeIframeAPIReady();
  } else {
    // Chargement asynchrone de l'API Youtube si pas encore chargée
    const script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
    script.onload = onYouTubeIframeAPIReady;
  }
}

// Initialisation des lecteurs Youtube avec les URLs de vos vidéos
chargerLecteur("https://www.youtube.com/watch?v=VIDEO_ID_1", 0);
chargerLecteur("https://www.youtube.com/watch?v=VIDEO_ID_2", 1);
chargerLecteur("https://www.youtube.com/watch?v=VIDEO_ID_3", 2);
chargerLecteur("https://www.youtube.com/watch?v=VIDEO_ID_4", 3);
chargerLecteur("https://www.youtube.com/watch?v=VIDEO_ID_5", 4);

precedent.addEventListener('click', () => {
  if (indexActif === 0) {
    indexActif = iframes.length - 1;
  } else {
    indexActif--;
  }

  lecteurs[indexActif].play(); // Lecture de la vidéo active
  for (let i = 0; i < lecteurs.length; i++) {
    if (i !== indexActif) {
      lecteurs[i].pause();}}})