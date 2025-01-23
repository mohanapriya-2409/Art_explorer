// Existing functions
function navigateToWelcome() {
    document.getElementById('welcome-page').style.display = 'flex';
    document.getElementById('gallery-container').style.display = 'none';
}

function navigateToGallery() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('gallery-container').style.display = 'block';
}

function filterImages(category) {
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => button.classList.remove('active'));
    document.querySelector(`[onclick="filterImages('${category}')"]`).classList.add('active');

    const images = document.querySelectorAll('.gallery img');
    images.forEach(img => {
        if (category === 'all' || img.classList.contains(category)) {
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
    });
}
function uploadImages() {
    const fileInput = document.getElementById('imageUpload');
    const categorySelect = document.getElementById('categorySelect');
    const gallery = document.getElementById('gallery');
    const category = categorySelect.value;

    Array.from(fileInput.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add(category);
            img.alt = file.name;
            img.addEventListener('click', () => {
                openModal(img.src);
            });

            gallery.appendChild(img);
        }
        reader.readAsDataURL(file);
    });
    fileInput.value = '';
}

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.getElementById('close');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const downloadBtn = document.getElementById('downloadBtn');

let currentZoom = 1;

function openModal(src) {
    modal.style.display = 'flex';
    modalImg.src = src;
    modalImg.style.transform = 'scale(1)';
    currentZoom = 1;
    document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => openModal(img.src));
});

zoomInBtn.addEventListener('click', () => {
    currentZoom += 0.2;
    modalImg.style.transform = `scale(${currentZoom})`;
});

zoomOutBtn.addEventListener('click', () => {
    currentZoom = Math.max(0.2, currentZoom - 0.2);
    modalImg.style.transform = `scale(${currentZoom})`;
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});