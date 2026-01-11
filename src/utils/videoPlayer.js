let player;
let videoData = [];
let currentVideoIndex = 0;

export function initVideoPlayer(videos) {
  
  if (!videos || videos.length === 0) {
    const videoSection = document.getElementById('video-gallery');
    if (videoSection) videoSection.style.display = 'none';
    return;
  }

  // Simpan data video dan proses videoId terlebih dahulu
  videoData = videos.map(video => ({
    ...video,
    videoId: extractYouTubeID(video.videoUrl)
  }));


  // Filter video yang memiliki ID valid
  videoData = videoData.filter(video => video.videoId);

  if (videoData.length === 0) {
    const videoSection = document.getElementById('video-gallery');
    if (videoSection) videoSection.style.display = 'none';
    return;
  }


  // Render playlist terlebih dahulu
  renderPlaylist();

  // Cek apakah YouTube API sudah siap
  if (window.YT && window.YT.Player) {
    initializePlayer();
  } else {
    // Jika belum, tunggu sampai ready
    window.onYouTubeIframeAPIReady = function() {
      initializePlayer();
    };
  }
}

function initializePlayer() {
  
  player = new YT.Player('main-video-player', {
    height: '100%',
    width: '100%',
    videoId: videoData[0].videoId, // Sekarang videoId sudah pasti ada
    playerVars: {
      autoplay: 1, 
      mute: 1, 
      controls: 1, // Ubah ke 1 agar ada kontrol
      loop: 0,
      modestbranding: 1, 
      rel: 0, 
      playsinline: 1
    },
    events: {
      'onStateChange': onPlayerStateChange,
      'onReady': onPlayerReady,
      'onError': onPlayerError
    }
  });
}

function onPlayerReady(event) {
  // Player siap, update UI
  updatePlaylistUI();
}

function onPlayerError(event) {
  console.error('YouTube player error:', event.data);
}

function renderPlaylist() {
  const playlistContainer = document.getElementById('video-playlist-container');
  const playlistTemplate = document.getElementById('video-playlist-item-template');
  
  if (!playlistContainer || !playlistTemplate) {
    console.error('Playlist container or template not found');
    return;
  }
  
  playlistContainer.innerHTML = '';

  videoData.forEach((video, index) => {
    
    const cardClone = playlistTemplate.content.cloneNode(true);
    const itemElement = cardClone.querySelector('.video-playlist-item');
    const thumbnail = itemElement.querySelector('.playlist-thumbnail');
    const title = itemElement.querySelector('.playlist-title');

    // Video ID sudah ada dari proses sebelumnya
    itemElement.dataset.videoId = video.videoId;
    itemElement.dataset.index = index;

    thumbnail.src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
    thumbnail.alt = video.title;
    title.textContent = video.title;

    itemElement.addEventListener('click', () => {
      playVideoEnhanced(index);
    });

    playlistContainer.appendChild(cardClone);
  });

  // Update UI setelah render
  updatePlaylistUI();
  
  // Initialize scroll effects untuk playlist
  initScrollEffects();
  
  // Check scrollability dan add indicator
  setTimeout(() => {
    checkScrollability();
  }, 200);
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    playNextVideo();
  }
}

function playNextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videoData.length;
  playVideo(currentVideoIndex);
  
  // Auto-scroll ke video berikutnya setelah UI terupdate
  setTimeout(() => {
    scrollToCurrentVideo();
  }, 150);
}

function playVideo(index) {
  if (!player || !player.loadVideoById) {
    return;
  }

  currentVideoIndex = index;
  const videoId = videoData[currentVideoIndex].videoId;

  try {
    player.loadVideoById(videoId);
    updatePlaylistUI();
  } catch (error) {
    console.error('Error loading video:', error);
  }
}

function updatePlaylistUI() {
  const items = document.querySelectorAll('.video-playlist-item');
  items.forEach((item, index) => {
    const nowPlayingIndicator = item.querySelector('.now-playing-indicator');
    if (index === currentVideoIndex) {
      item.classList.add('active');
      nowPlayingIndicator.classList.remove('hidden');
    } else {
      item.classList.remove('active');
      nowPlayingIndicator.classList.add('hidden');
    }
  });
  
}

// Fungsi untuk mengelola scroll indicator dan fade effects
function initScrollEffects() {
  const scrollContainer = document.querySelector('.playlist-scroll-container');
  const fadeIndicator = document.querySelector('.playlist-fade-indicator');
  
  if (!scrollContainer || !fadeIndicator) return;
  
  // Function untuk update fade indicator berdasarkan scroll position
  function updateFadeIndicator() {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 5; // 5px tolerance
    
    if (isScrolledToBottom) {
      scrollContainer.classList.add('scrolled-to-bottom');
      fadeIndicator.style.opacity = '0';
    } else {
      scrollContainer.classList.remove('scrolled-to-bottom');
      fadeIndicator.style.opacity = '0.6';
    }
    
    // Jika ada cukup banyak item untuk di-scroll, tampilkan fade indicator
    if (scrollHeight > clientHeight) {
      fadeIndicator.style.display = 'block';
    } else {
      fadeIndicator.style.display = 'none';
    }
  }
  
  // Listen scroll events
  scrollContainer.addEventListener('scroll', updateFadeIndicator);
  
  // Initial check
  setTimeout(updateFadeIndicator, 100); // Delay untuk memastikan DOM sudah ter-render
  
  // Re-check when window resizes
  window.addEventListener('resize', () => {
    setTimeout(() => {
      updateFadeIndicator();
      checkScrollability();
    }, 100);
  });
}

// Fungsi untuk auto-scroll ke item yang sedang aktif
function scrollToCurrentVideo() {
  const activeItem = document.querySelector('.video-playlist-item.active');
  const scrollContainer = document.querySelector('.playlist-scroll-container');
  
  if (!activeItem || !scrollContainer) return;
  
  const containerRect = scrollContainer.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();
  
  // Hitung posisi relatif item terhadap container
  const itemTop = activeItem.offsetTop;
  const containerScrollTop = scrollContainer.scrollTop;
  const containerHeight = scrollContainer.clientHeight;
  const itemHeight = activeItem.clientHeight;
  
  // Tentukan apakah item berada di luar area visible
  const itemRelativeTop = itemTop - containerScrollTop;
  const itemRelativeBottom = itemRelativeTop + itemHeight;
  
  let needsScroll = false;
  let targetScrollTop = containerScrollTop;
  
  // Jika item di atas area visible
  if (itemRelativeTop < 0) {
    needsScroll = true;
    targetScrollTop = itemTop - 10; // Padding 10px dari atas
  }
  // Jika item di bawah area visible
  else if (itemRelativeBottom > containerHeight) {
    needsScroll = true;
    targetScrollTop = itemTop - containerHeight + itemHeight + 10; // Padding 10px dari bawah
  }
  
  if (needsScroll) {
    scrollContainer.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    });
  }
}

// Update fungsi playVideo untuk include auto-scroll
function playVideoEnhanced(index) {
  playVideo(index);
  setTimeout(() => {
    scrollToCurrentVideo();
  }, 100); // Delay untuk memastikan UI sudah ter-update
}

// Fungsi untuk check apakah container bisa di-scroll dan add class indicator
function checkScrollability() {
  const scrollContainer = document.querySelector('.playlist-scroll-container');
  if (!scrollContainer) return;
  
  const hasScroll = scrollContainer.scrollHeight > scrollContainer.clientHeight;
  
  if (hasScroll) {
    scrollContainer.classList.add('has-scroll');
  } else {
    scrollContainer.classList.remove('has-scroll');
  }
}

// Fungsi helper untuk mengekstrak ID dari berbagai format URL YouTube
function extractYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}