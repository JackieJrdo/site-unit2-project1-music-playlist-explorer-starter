// script.js

document.addEventListener("DOMContentLoaded", () => {
    const playlistCards = document.querySelector(".playlistCards");
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector(".close");
    const shuffleButton = document.querySelector(".shuffle-button");
    const modalTitle = document.querySelector(".modal-title");
    const modalCreator = document.querySelector(".creator");
    const modalCover = document.querySelector(".playlist-cover img");
    const dynamicModalContainer = document.querySelector('.dynamicModalContainer');
    

    // load playlists via fetch(). then chaining
    fetch("data/data.json")
        .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok:" + response.status);
        }
            return response.json();
        })
        .then((data) => {
            data[0].playlist.forEach(createPlaylistCard);
            console.log(data.playlist);
        })
        .catch((err) => {
            console.error("There was a problem with the fetch operation:", err);
        });

    function createPlaylistCard(pl) {
        const card = document.createElement("div");
        card.className = "card card-hghlght";

        card.innerHTML = `
            <img src="${pl.playlist_art}" alt="${pl.playlist_name}">
            <div class="cardText">
                <h3>${pl.playlist_name}</h3>
                <p>${pl.playlist_author}</p>
            
                <div>
                    <span class="heart">&#x2665;</span>
                    <span class="like-count">${pl.likes}</span>
                </div>
            </div>
        `;

        const heart = card.querySelector(".heart");
        const likeCount = card.querySelector(".like-count");
        let liked = false;

        heart.addEventListener("click", (e) => {
            e.stopPropagation(); // cant open model if you click
            liked = !liked; // toggle
                if (liked) {
                    pl.likes++;
                    heart.style.color = "";
                } else {
                    pl.likes--;
                    heart.style.color = "";
                }
            likeCount.textContent = pl.likes;

        });

        card.addEventListener("click", (e) => {
            if (!e.target.classList.contains("heart")) {
                openModal(pl);
            }
        });

        playlistCards.appendChild(card);

    }


    let currentPlaylist = null; // Add this at the top inside DOMContentLoaded

    function openModal(pl) {
        modalTitle.textContent = pl.playlist_name;
        modalCreator.textContent = pl.playlist_author;
        modalCover.src = pl.playlist_art;
        currentPlaylist = pl; // Store the current playlist

        dynamicModalContainer.innerHTML = ""; // clears previous content
        pl.songs.forEach((song) => {
            const songDiv = document.createElement("div");
            songDiv.className = "song-item";
            songDiv.innerHTML = `
                <div class="song-thumbnail">
                <div class="thumbnail-stack">
                    <img class="card-img-bg" src="${song.song_art || "assets/img/song.png"}" alt="${song.song_name}">
                <div class="gif-overlay">
                    <iframe src="https://gifer.com/embed/5RT9" width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
                </div>
            </div>
            <p><a href="https://gifer.com">via GIFER</a></p>
        </div>
        <div class="song-details">
            <p class="song-title">${song.song_name}</p>
            <p class="artist-name">${song.song_artist}</p>
        </div>
        <div class="song-duration">${song.song_duration}</div>
                `;
            dynamicModalContainer.appendChild(songDiv);
        });
        modal.classList.add("show");
    }

        // close handlers
    closeButton.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    }

    shuffleButton.addEventListener("click", () => {
    if (currentPlaylist) {
        shuffleArray(currentPlaylist.songs);
        openModal(currentPlaylist); // Re-render modal with shuffled songs
    }
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });
});


