async function getData() {
    const url = "/api";
    const response = await fetch(url);
    const data = await response.json();

    data.forEach(element => {
        let cardDisplayElement = `
      <div class="card">
        <img src=${element.img} alt=${element.monumentName} width="255px" height="165px">
        <p>${element.monumentName}</p>
        <a href="/${element.id}">Guide</a>
        <a href="/password/${element.id}">Update</a>
        <a href="/password/${element.id}?aim=delete">Delete</a>
      </div>
    `;
        document.getElementById('cardDisplay').innerHTML += cardDisplayElement;
    });
}

getData()

// Search Bar
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const name = card.querySelector('p') ? .textContent.toLowerCase() || '';
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

// Dark Mode
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