const playlistUrl = "https://v1.nocodeapi.com/audiwtvr/spotify/YuebOBqnEKVGhfYO/playlists?id=37i9dQZEVXbMDoHDwVN2tF";
const tracksUrlBase = "https://v1.nocodeapi.com/audiwtvr/spotify/YuebOBqnEKVGhfYO/tracks?ids=";

async function fetchPlaylist() {
    try {
        const response = await fetch(playlistUrl);
        const data = await response.json();
        const tracks = data.tracks.items.slice(0, 20);

        const trackIds = tracks.map(item => item.track.id).join(",");
        const trackDetails = await fetch(`${tracksUrlBase}${trackIds}`);
        const detailsData = await trackDetails.json();

        displayTracks(tracks, detailsData.tracks);
    } catch (error) {
        console.error("Error fetching playlist or track details:", error);
    }
}

function displayTracks(playlistTracks, detailedTracks) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    playlistTracks.forEach((item, index) => {
        const track = item.track;
        const detail = detailedTracks.find(t => t.id === track.id);

        const name = track.name;
        const artist = track.artists.map(a => a.name).join(", ");
        const albumImage = track.album.images[0].url;

        const popularity = detail ? detail.popularity : "–";

        // Release date to DD.MM.YYYY
        let releaseDate = "–";
        if (detail && detail.album.release_date) {
            const parts = detail.album.release_date.split("-");
            if (parts.length === 3) {
                releaseDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
            } else if (parts.length === 2) {
                releaseDate = `01.${parts[1]}.${parts[0]}`;
            } else if (parts.length === 1) {
                releaseDate = `01.01.${parts[0]}`;
            }
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="font-family: fantasy; font-size: 35px;">${index + 1}</td>
            <td class="album-cover">
              <img src="${albumImage}" alt="Album Cover" style="width: 150px; height: 150px;">
            </td>
            <td class="song" style="font-family: 'Montserrat', sans-serif;">
              <h3 style="font-size: 35px;">${name}</h3> 
              <span>${artist}</span>
            </td>
            <td class="popularity" style="font-family: 'Montserrat', sans-serif; font-size: 35px; font-weight: bold;">${popularity}</td>
            <td class="release-date" style="font-family: 'Montserrat', sans-serif; font-size: 35px; font-weight: bold;">${releaseDate}</td>
        `;
        tbody.appendChild(row);
    });
}

fetchPlaylist();