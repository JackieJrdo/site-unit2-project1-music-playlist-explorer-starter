document.addEventListener("DOMContentLoaded", () => {
    const featuredLeft = document.querySelector(".featureLeft");
    const featuredRight = document.querySelector(".featureRight");
    const featuredShuffle = document.querySelector('.featuredShuffle');

    let playlists = [];

    // Fetch playlists once and store them
    fetch("data/data.json")
        .then((response) => response.json())
        .then((data) => {
            playlists = data[0].playlist;
            renderRandomFeatured();
        });

    // Function to render a random featured playlist
    function renderRandomFeatured() {
        if (!playlists.length) return;
        const randomIndex = Math.floor(Math.random() * playlists.length);
        const featured = playlists[randomIndex];

        // LEFT PANE
        featuredLeft.innerHTML = `
            <div class = "featureImgContainer"> 
                <img src="${featured.playlist_art}" alt="${featured.playlist_name}" class="featuredImg">
            </div>
            <h2>${featured.playlist_name}</h2>
            <p>by ${featured.playlist_author}</p>
        `;

        // RIGHT PANE 
        featuredRight.innerHTML = featured.songs.map(song => `
            <div class="song-item">
                <img src="${song.song_art || 'assets/img/song.png'}" alt="${song.song_name}" class="song-thumbnail">
                <div>
                    <p class="song-title">${song.song_name}</p>
                    <p class="artist-name">${song.song_artist}</p>
                    <span class="song-duration">${song.song_duration}</span>
                </div>
            </div>
        `).join('');
    }

    // Shuffle button handler
    featuredShuffle.addEventListener('click', renderRandomFeatured);
});