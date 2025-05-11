const playlistUrl = "https://v1.nocodeapi.com/ioiaudrey/spotify/bFfHCYXvrMUQEIYy/playlists?id=37i9dQZEVXbMDoHDwVN2tF";

async function fetchPlaylist() {
    try {
        const response = await fetch(playlistUrl);
        const data = await response.json();
        displayTracks(data.tracks.items);
    } catch (error) {
        console.error("Error fetching playlist:", error);
    }
}

function displayTracks(tracks) {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    tracks.slice(0, 20).forEach((item, index) => {
        const track = item.track;
        const name = track.name;
        const artist = track.artists.map(a => a.name).join(", ");
        const albumImage = track.album.images[0].url;

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
            <td style="font-family: fantasy; font-size: 35px;">–</td>
            <td style="font-family: fantasy; font-size: 35px;">–</td>
        `;
        tbody.appendChild(row);
    });
}

fetchPlaylist();