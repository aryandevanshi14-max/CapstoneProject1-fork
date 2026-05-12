async function getData() {
    const url = "/api";
    const response = await fetch(url);
    const data = await response.json();

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    data.forEach(element => {
        const isFav = favorites.includes(String(element.id));
        let cardDisplayElement = `
      <div class="card" id="card-${element.id}">
        <img src=${element.img} alt=${element.monumentName} width="255px" height="165px">
        <p>${element.monumentName}</p>
        <button class="fav-btn ${isFav ? 'fav-active' : ''}" onclick="toggleFav('${element.id}', this)">
          ${isFav ? '❤️' : '🤍'}
        </button>
        <a href="/${element.id}">Guide</a>
        <a href="/password/${element.id}">Update</a>
        <a href="/password/${element.id}?aim=delete">Delete</a>
      </div>
    `;
        document.getElementById('cardDisplay').innerHTML += cardDisplayElement;
    });
}

function toggleFav(id, btn) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(String(id))) {
        favorites = favorites.filter(f => f !== String(id));
        btn.textContent = '🤍';
        btn.classList.remove('fav-active');
    } else {
        favorites.push(String(id));
        btn.textContent = '❤️';
        btn.classList.add('fav-active');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

getData()

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const name = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
            if (name.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

const observer = new MutationObserver(() => {
    setupSearch();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

setupSearch();

function setupDarkMode() {
    const btn = document.getElementById('darkModeBtn');
    if (!btn) return;

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
        btn.textContent = '☀️ Light Mode';
    }

    btn.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
        btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
}

setupDarkMode();

const GEMINI_API_KEY = "AIzaSyD-7ZDDinZF3KSmKUmS8syJdeMw2IFkcBo";

function showAIModal() {
    document.getElementById('aiModal').style.display = 'block';
}

function closeAIModal() {
    document.getElementById('aiModal').style.display = 'none';
    document.getElementById('aiResult').textContent = '';
}

async function getAIPlan() {
    const monument = document.getElementById('aiMonumentInput').value.trim();
    if (!monument) {
        alert('Monument ka naam likho!');
        return;
    }

    const resultDiv = document.getElementById('aiResult');
    resultDiv.textContent = 'AI plan bana raha hai...';

    const prompt = `You are a Rajasthan tourism expert. Create a detailed 1-day visit plan for ${monument} in Rajasthan, India. Include best time to visit, morning afternoon evening schedule, entry fees, tips, nearby places, and local food. Keep it friendly and practical.`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        resultDiv.textContent = text;
    } catch (error) {
        resultDiv.textContent = 'Error aa gaya, dobara try karo!';
    }
}