const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        const button = header.querySelector('button');
        if (button) {
            button.addEventListener('click', () => {
                const slider = header.nextElementSibling;
                if (slider && slider.classList.contains('book-slider')) {
                    slider.scrollBy({
                        left: 200,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    const sliders = document.querySelectorAll('.book-slider');
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        let touchStartX = 0;
        let touchScrollLeft = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX - slider.offsetLeft;
            touchScrollLeft = slider.scrollLeft;
        }, { passive: true });

        slider.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - touchStartX) * 2;
            slider.scrollLeft = touchScrollLeft - walk;
        }, { passive: true });
    });
});

const bookSearchInput = document.getElementById('bookSearchInput');
if (bookSearchInput) {
    bookSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const bookItems = document.querySelectorAll('.book-item');
        
        bookItems.forEach(item => {
            const bookTitle = item.querySelector('button').textContent.toLowerCase();
            if (bookTitle.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function showBookModal(bookTitle) {

    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    const isLoremIpsum = bookTitle === 'Buku Lorem Ipsum';
    const status = isLoremIpsum ? 'Tidak Tersedia' : 'Tersedia';
    const statusClass = isLoremIpsum ? 'status-tidak-tersedia' : 'status-tersedia';

    const modalHTML = `
        <div class="modal-overlay" id="bookModal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeBookModal()">&times;</button>
                <h2>Keterangan Buku</h2>
                <div class="book-info">
                    <label>Nama Buku :</label>
                    <span>${bookTitle}</span>
                </div>
                <div class="book-info">
                    <label>Status :</label>
                    <span class="${statusClass}">${status}</span>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    setTimeout(() => {
        document.getElementById('bookModal').classList.add('active');
    }, 10);

    document.getElementById('bookModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeBookModal();
        }
    });
}

function closeBookModal() {
    const modal = document.getElementById('bookModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const bookButtons = document.querySelectorAll('.book-cover button');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const bookTitle = button.textContent.trim();
            showBookModal(bookTitle);
        });
    });
});
