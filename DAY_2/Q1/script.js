const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;

        tabs.forEach(item => {
            item.classList.toggle('active', item === tab);
            item.setAttribute('aria-selected', item === tab);
        });

        panels.forEach(panel => {
            const isTarget = panel.id === targetId;
            panel.hidden = !isTarget;
            panel.classList.toggle('active', isTarget);
        });
    });
});
