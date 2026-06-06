const itemGrid = document.getElementById('itemGrid');
const pageNumbersContainer = document.getElementById('pageNumbers');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const summaryText = document.getElementById('summaryText');

const itemsPerPage = 10;
const items = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    description: `A clean and modern item description for product ${index + 1}.`,
    price: `$${(Math.random() * 90 + 10).toFixed(2)}`
}));

let currentPage = 1;
const totalPages = Math.ceil(items.length / itemsPerPage);

function createItemCard(item) {
    const card = document.createElement('article');
    card.className = 'item-card';
    card.innerHTML = `
        <h2>${item.title}</h2>
        <p>${item.description}</p>
        <p class="price">${item.price}</p>
    `;
    return card;
}

function renderItems(page) {
    itemGrid.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const pageItems = items.slice(start, start + itemsPerPage);
    pageItems.forEach(item => itemGrid.appendChild(createItemCard(item)));
    summaryText.textContent = `Showing ${start + 1}-${start + pageItems.length} of ${items.length}`;
}

function renderPagination() {
    pageNumbersContainer.innerHTML = '';
    for (let page = 1; page <= totalPages; page += 1) {
        const pageButton = document.createElement('button');
        pageButton.type = 'button';
        pageButton.className = `page-number${page === currentPage ? ' active' : ''}`;
        pageButton.textContent = page;
        pageButton.addEventListener('click', () => setPage(page));
        pageNumbersContainer.appendChild(pageButton);
    }

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function setPage(page) {
    currentPage = page;
    renderItems(page);
    renderPagination();
}

prevButton.addEventListener('click', () => setPage(Math.max(1, currentPage - 1)));
nextButton.addEventListener('click', () => setPage(Math.min(totalPages, currentPage + 1)));

setPage(1);
