const userCards = document.getElementById('userCards');
const loader = document.getElementById('loader');
const statusText = document.getElementById('statusText');

function createUserCard(user) {
    const card = document.createElement('article');
    card.className = 'user-card';

    card.innerHTML = `
        <h2>${user.name}</h2>
        <p>${user.email}</p>
        <div class="meta">
            <span>${user.username}</span>
            <span>${user.company.name}</span>
            <span>${user.address.city}</span>
        </div>
    `;

    return card;
}

function renderUsers(users) {
    userCards.innerHTML = '';
    users.forEach(user => userCards.appendChild(createUserCard(user)));
}

function showLoading(isLoading) {
    loader.style.display = isLoading ? 'flex' : 'none';
    statusText.textContent = isLoading ? 'Loading...' : 'Users loaded';
}

async function fetchUsers() {
    showLoading(true);

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error('Failed to fetch user data.');
        }
        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        userCards.innerHTML = `<p class="error-message">${error.message}</p>`;
    } finally {
        showLoading(false);
    }
}

fetchUsers();
