// Abrir modal - para links com classe img-modal
document.querySelectorAll('.img-modal').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.getElementById('imgModal');
    modal.style.display = 'block';
    
    // Get image name and title from data attributes
    const imgName = link.dataset.img;
    const imgTitle = link.dataset.title;
    
    // Show loading spinner
    const loading = document.createElement('div');
    loading.className = 'modal-loading';
    modal.appendChild(loading);
    loading.style.display = 'block';
    
    // Set modal content (images in same directory)
    const modalImg = document.getElementById('modalImg');
    modalImg.onload = function() {
      loading.style.display = 'none';
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    };
    modalImg.src = imgName;
    document.querySelector('.caption').textContent = imgTitle;
  });
});

// Fechar modal
function closeModal() {
  const modal = document.getElementById('imgModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Remove loading spinner if it exists
    const loading = modal.querySelector('.modal-loading');
    if (loading) {
      loading.remove();
    }
  }, 300); // Match CSS transition duration
}

// Event listeners para fechar modal
document.querySelector('.close').onclick = closeModal;

window.onclick = (e) => {
  if(e.target == document.getElementById('imgModal')) {
    closeModal();
  }
};

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && document.getElementById('imgModal').style.display === 'block') {
    closeModal();
  }
});

// Existing functions from original script.js
function calculateSteatosis() {
    // Existing calculation logic
}

function resetCampos1() {
    // Existing reset logic
}

function calculateVolume() {
    // Existing calculation logic
}

function resetCampos2() {
    // Existing reset logic
}

function calculateMDRD() {
    // Existing calculation logic
}

function resetCampos5() {
    // Existing reset logic
}

function calculateCockroftGault() {
    // Existing calculation logic
}

function resetCampos6() {
    // Existing reset logic
}

function filterCards(searchTerm) {
    // Existing filter logic
}
