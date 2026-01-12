// Spotify Clone JavaScript

class SpotifyClone {
    constructor() {
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 225; // 3:45 in seconds
        this.volume = 0.7;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateProgressBar();
        this.updateVolumeBar();
    }

    setupEventListeners() {
        // Play/Pause button
        const playPauseBtn = document.querySelector('.play-pause-btn');
        playPauseBtn.addEventListener('click', () => this.togglePlayPause());

        // Music card play buttons
        const playBtns = document.querySelectorAll('.music-card .play-btn');
        playBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playTrack(btn);
            });
        });

        // Progress bar
        const progressBar = document.querySelector('.progress');
        progressBar.addEventListener('click', (e) => this.seekTrack(e));

        // Volume bar
        const volumeBar = document.querySelector('.volume-bar');
        volumeBar.addEventListener('click', (e) => this.setVolume(e));

        // Like button
        const likeBtn = document.querySelector('.like-btn');
        likeBtn.addEventListener('click', () => this.toggleLike());

        // Navigation buttons
        const prevBtn = document.querySelector('.fa-step-backward').parentElement;
        const nextBtn = document.querySelector('.fa-step-forward').parentElement;
        prevBtn.addEventListener('click', () => this.previousTrack());
        nextBtn.addEventListener('click', () => this.nextTrack());

        // Quick pick items
        const quickPicks = document.querySelectorAll('.quick-pick-item');
        quickPicks.forEach(item => {
            item.addEventListener('click', () => this.playPlaylist(item));
        });

        // Music cards
        const musicCards = document.querySelectorAll('.music-card');
        musicCards.forEach(card => {
            card.addEventListener('click', () => this.selectTrack(card));
        });

        // Sidebar navigation
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToSection(link);
            });
        });

        // Playlist links
        const playlistLinks = document.querySelectorAll('.playlist-list a');
        playlistLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.openPlaylist(link);
            });
        });
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        const playPauseBtn = document.querySelector('.play-pause-btn i');
        
        if (this.isPlaying) {
            playPauseBtn.className = 'fas fa-pause';
            this.startProgress();
        } else {
            playPauseBtn.className = 'fas fa-play';
            this.stopProgress();
        }
    }

    playTrack(btn) {
        // Reset all play buttons
        document.querySelectorAll('.music-card .play-btn i').forEach(icon => {
            icon.className = 'fas fa-play';
        });

        // Set current button to pause
        btn.querySelector('i').className = 'fas fa-pause';
        
        // Update current track info
        const card = btn.closest('.music-card');
        const title = card.querySelector('h3').textContent;
        const artist = card.querySelector('p').textContent;
        const img = card.querySelector('img').src;

        this.updateCurrentTrack(title, artist, img);
        
        // Start playing
        this.isPlaying = true;
        document.querySelector('.play-pause-btn i').className = 'fas fa-pause';
        this.startProgress();
    }

    updateCurrentTrack(title, artist, img) {
        document.querySelector('.track-name').textContent = title;
        document.querySelector('.artist-name').textContent = artist;
        document.querySelector('.current-track img').src = img;
    }

    seekTrack(e) {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.currentTime = percent * this.duration;
        this.updateProgressBar();
    }

    setVolume(e) {
        const volumeBar = e.currentTarget;
        const rect = volumeBar.getBoundingClientRect();
        this.volume = (e.clientX - rect.left) / rect.width;
        this.updateVolumeBar();
    }

    updateProgressBar() {
        const percent = (this.currentTime / this.duration) * 100;
        document.querySelector('.progress-filled').style.width = `${percent}%`;
        
        const currentMinutes = Math.floor(this.currentTime / 60);
        const currentSeconds = Math.floor(this.currentTime % 60);
        document.querySelector('.time').textContent = 
            `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    }

    updateVolumeBar() {
        const percent = this.volume * 100;
        document.querySelector('.volume-filled').style.width = `${percent}%`;
    }

    startProgress() {
        this.progressInterval = setInterval(() => {
            if (this.currentTime < this.duration) {
                this.currentTime += 1;
                this.updateProgressBar();
            } else {
                this.nextTrack();
            }
        }, 1000);
    }

    stopProgress() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }

    toggleLike() {
        const likeBtn = document.querySelector('.like-btn i');
        if (likeBtn.classList.contains('far')) {
            likeBtn.className = 'fas fa-heart';
            likeBtn.style.color = '#1db954';
        } else {
            likeBtn.className = 'far fa-heart';
            likeBtn.style.color = '#b3b3b3';
        }
    }

    previousTrack() {
        this.currentTime = 0;
        this.updateProgressBar();
        // In a real app, this would load the previous track
        console.log('Previous track');
    }

    nextTrack() {
        this.currentTime = 0;
        this.updateProgressBar();
        // In a real app, this would load the next track
        console.log('Next track');
    }

    playPlaylist(item) {
        const playlistName = item.querySelector('span').textContent;
        console.log(`Playing playlist: ${playlistName}`);
        
        // Add visual feedback
        item.style.background = 'rgba(29, 185, 84, 0.3)';
        setTimeout(() => {
            item.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 200);
    }

    selectTrack(card) {
        // Remove active class from all cards
        document.querySelectorAll('.music-card').forEach(c => {
            c.classList.remove('active');
        });
        
        // Add active class to selected card
        card.classList.add('active');
        
        const title = card.querySelector('h3').textContent;
        console.log(`Selected track: ${title}`);
    }

    navigateToSection(link) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-menu a').forEach(l => {
            l.classList.remove('active');
        });
        
        // Add active class to clicked link
        link.classList.add('active');
        
        const section = link.textContent.trim();
        console.log(`Navigating to: ${section}`);
    }

    openPlaylist(link) {
        const playlistName = link.textContent;
        console.log(`Opening playlist: ${playlistName}`);
        
        // Add visual feedback
        link.style.color = '#1db954';
        setTimeout(() => {
            link.style.color = '#b3b3b3';
        }, 300);
    }
}

// Initialize the Spotify Clone when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpotifyClone();
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for content area
    const content = document.querySelector('.content');
    if (content) {
        content.style.scrollBehavior = 'smooth';
    }

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            document.querySelector('.play-pause-btn').click();
        }
    });
});