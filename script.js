// Mapeamento de parâmetros para imagens
const parameterImages = {
  // Parâmetros Femoroacetabulares
  'Ângulo Centro-Borda': ['ACB-01.jpg'],
  'Índice de Extrusão': ['IEX-02.jpg'],
  'Índice Acetabular': ['IAC-03.jpg'],
  'Ângulo de Versão Acetabular': ['AVS-04.jpg'],
  'Ângulo Equatorial': ['AEB-05.jpg'],
  'Ângulo do Teto': ['ATB-06.jpg'],
  'Eixo Femoral': ['EFE-07.jpg'],
  'Ângulo Colo-Diafisário': ['ACE-08.jpg'],
  'Torção Femoral': ['TFE-09.jpg'],
  'Torção Epifisária': ['ATE-10.jpg'],
  'Offset Femoral': ['OFE-11.jpg'],
  'Razão Offset': ['ROE-12.jpg'],
  'Ângulo Ântero-Lateral': ['AAL-13.jpg'],
  'Distância Femoral Anterior': ['DFA-14.jpg'],
  
  // Parâmetros Femoropatelares
  'Alinhamento Femorotibial': ['PT-AF.jpg'],
  'Ângulo do Sulco': ['PT-ST.jpg'],
  'Inclinação Lateral': ['PT-IL.jpg'],
  'Profundidade Troclear': ['PT-PR.jpg'],
  'Distância TA-GT': ['PT-DT.jpg', 'PT-DT-2.jpg'], // Exemplo com múltiplas imagens
  'Distância TA-LCP': ['PT-DL.jpg'],
  'Altura Patelar': ['PT-AP.jpg'],
  'Deslocamento Patelar': ['PT-DP.jpg'],
  'Ângulo de Congruência': ['PT-AC.jpg'],
  'Báscula Patelar': ['PT-AB.jpg'],
  
  // Reconstrução do LCA
  'Posição do Túnel Femoral': ['LCA-PF.jpg'],
  'Posição do Túnel Tibial': ['LCA-PT.jpg'],
  'Ângulo de Curvatura': ['LCA-AC.jpg'],
  'Alargamento do Túnel': ['LCA-AT.jpg'],
  'Densidade Óssea': ['LCA-DO.jpg']
};

// Mapeamento de imagens para títulos (para compatibilidade)
const parameterNames = Object.entries(parameterImages).reduce((acc, [title, images]) => {
  images.forEach(img => acc[img] = title);
  return acc;
}, {});

// Variáveis para controle da galeria
let currentImageIndex = 0;
let currentImageGroup = [];

// Função para abrir modal com navegação entre imagens
function abrirModal(imagem) {
  const modal = document.getElementById('modal-tabelas');
  const img = document.getElementById('imagem-modal');
  const title = document.getElementById('modal-title');
  const closeBtn = document.querySelector('.close-modal');
  const prevBtn = document.querySelector('.prev-button');
  const nextBtn = document.querySelector('.next-button');

  // Identificar grupo de imagens pelo título do parâmetro
  const paramTitle = parameterNames[imagem];
  currentImageGroup = parameterImages[paramTitle] || [imagem];
  currentImageIndex = currentImageGroup.indexOf(imagem);

  // Atualizar imagem e título
  updateModalImage(img, title, imagem);

  // Mostrar modal
  modal.style.display = 'block';

  // Configurar navegação
  prevBtn.onclick = function(e) {
    e.stopPropagation();
    navigateImage(-1, img, title);
  };

  nextBtn.onclick = function(e) {
    e.stopPropagation();
    navigateImage(1, img, title);
  };

  // Fechar modal
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };

  modal.onclick = function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };

  document.onkeydown = function(e) {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
    } else if (e.key === 'ArrowLeft') {
      navigateImage(-1, img, title);
    } else if (e.key === 'ArrowRight') {
      navigateImage(1, img, title);
    }
  };

  img.onerror = function() {
    console.error('Erro ao carregar imagem:', imagem);
    modal.style.display = 'none';
    alert('Imagem não encontrada: ' + imagem);
  };
}

// Função para navegar entre imagens
function navigateImage(direction, imgElement, titleElement) {
  currentImageIndex += direction;
  updateModalImage(imgElement, titleElement, currentImageGroup[currentImageIndex]);
  updateButtonVisibility();
}

// Atualizar visibilidade dos botões
function updateButtonVisibility() {
  const prevBtn = document.querySelector('.prev-button');
  const nextBtn = document.querySelector('.next-button');
  
  // Esconder ambos se só tem 1 imagem
  if (currentImageGroup.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    return;
  }
  
  // Mostrar/ocultar conforme posição
  prevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
  nextBtn.style.display = currentImageIndex < currentImageGroup.length - 1 ? 'block' : 'none';
}

// Atualizar imagem no modal
function updateModalImage(imgElement, titleElement, imageName) {
  imgElement.src = imageName;
  titleElement.textContent = parameterNames[imageName] || 'Parâmetro';
  updateButtonVisibility();
}

// Funções das calculadoras
function calculateSteatosis() {
  const inPhase = parseFloat(document.getElementById('in-phase').value);
  const outPhase = parseFloat(document.getElementById('out-phase').value);
  const result = ((inPhase - outPhase) / inPhase) * 100;
  const resultField = document.getElementById('result');
  const classification = document.getElementById('classification');
  
  resultField.value = result.toFixed(2) + '%';
  
  if (result <= 5) {
    classification.textContent = 'Normal';
    resultField.style.color = '#4CAF50';
    classification.style.color = '#4CAF50';
  } else if (result > 5 && result <= 10) {
    classification.textContent = 'Esteatose Leve';
    resultField.style.color = '#8BC34A';
    classification.style.color = '#8BC34A';
  } else if (result > 10 && result <= 30) {
    classification.textContent = 'Esteatose Moderada';
    resultField.style.color = '#FFC107';
    classification.style.color = '#FFC107';
  } else if (result > 30) {
    classification.textContent = 'Esteatose Grave';
    resultField.style.color = '#F44336';
    classification.style.color = '#F44336';
  } else {
    classification.textContent = '';
  }
}

function calculateVolume() {
  const dim1 = parseFloat(document.getElementById('dimension1').value);
  const dim2 = parseFloat(document.getElementById('dimension2').value);
  const dim3 = parseFloat(document.getElementById('dimension3').value);
  const volume = (dim1 * dim2 * dim3) * 0.52;
  const resultField = document.getElementById('volume-result');
  
  resultField.value = volume.toFixed(2) + ' cm³';
  resultField.style.color = '#2196F3'; // Blue color
}

function calculateMDRD() {
  const age = parseInt(document.getElementById('idade').value);
  const creatinine = parseFloat(document.getElementById('creatinina').value);
  const isMale = document.querySelector('input[name="gender"]:checked').value === 'masculino';
  const resultField = document.getElementById('mdrd-result');
  const classification = document.getElementById('mdrd-classification');
  
  if (!age || !creatinine) {
    alert('Por favor preencha todos os campos');
    return;
  }

  let gfr;
  if (isMale) {
    gfr = 175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203);
  } else {
    gfr = 175 * Math.pow(creatinine, -1.154) * Math.pow(age, -0.203) * 0.742;
  }
  
  resultField.value = gfr.toFixed(2) + ' mL/min/1.73m²';
  
  if (gfr >= 90) {
    classification.textContent = 'Função Renal Normal';
    resultField.style.color = '#4CAF50';
    classification.style.color = '#4CAF50';
  } else if (gfr >= 60) {
    classification.textContent = 'Leve Redução';
    resultField.style.color = '#8BC34A';
    classification.style.color = '#8BC34A';
  } else if (gfr >= 30) {
    classification.textContent = 'Moderada Redução';
    resultField.style.color = '#FFC107';
    classification.style.color = '#FFC107';
  } else if (gfr >= 15) {
    classification.textContent = 'Grave Redução';
    resultField.style.color = '#FF9800';
    classification.style.color = '#FF9800';
  } else {
    classification.textContent = 'Falência Renal';
    resultField.style.color = '#F44336';
    classification.style.color = '#F44336';
  }
}

function calculateCockroftGault() {
  const weight = parseFloat(document.getElementById('peso').value);
  const creatinine = parseFloat(document.getElementById('creatinina-cg').value);
  const age = parseInt(document.getElementById('idade-cg').value);
  const isMale = document.querySelector('input[name="genero-cg"]:checked').value === 'masculino';
  const resultField = document.getElementById('cg-result');
  const classification = document.getElementById('cg-classification');
  
  if (!weight || !creatinine || !age) {
    alert('Por favor preencha todos os campos');
    return;
  }

  let cg;
  if (isMale) {
    cg = ((140 - age) * weight) / (72 * creatinine);
  } else {
    cg = ((140 - age) * weight) / (72 * creatinine) * 0.85;
  }
  
  resultField.value = cg.toFixed(2) + ' mL/min';
  
  if (cg >= 90) {
    classification.textContent = 'Função Renal Normal';
    resultField.style.color = '#4CAF50';
    classification.style.color = '#4CAF50';
  } else if (cg >= 60) {
    classification.textContent = 'Leve Redução';
    resultField.style.color = '#8BC34A';
    classification.style.color = '#8BC34A';
  } else if (cg >= 30) {
    classification.textContent = 'Moderada Redução';
    resultField.style.color = '#FFC107';
    classification.style.color = '#FFC107';
  } else if (cg >= 15) {
    classification.textContent = 'Grave Redução';
    resultField.style.color = '#FF9800';
    classification.style.color = '#FF9800';
  } else {
    classification.textContent = 'Falência Renal';
    resultField.style.color = '#F44336';
    classification.style.color = '#F44336';
  }
}

// Funções de reset
function resetCampos1() {
  document.getElementById('in-phase').value = '';
  document.getElementById('out-phase').value = '';
  document.getElementById('result').value = '';
  document.getElementById('classification').textContent = '';
}

function resetCampos2() {
  document.getElementById('dimension1').value = '';
  document.getElementById('dimension2').value = '';
  document.getElementById('dimension3').value = '';
  document.getElementById('volume-result').value = '';
}

function resetCampos5() {
  document.getElementById('idade').value = '';
  document.getElementById('creatinina').value = '';
  document.getElementById('mdrd-result').value = '';
  document.getElementById('mdrd-classification').textContent = '';
}

function resetCampos6() {
  document.getElementById('peso').value = '';
  document.getElementById('creatinina-cg').value = '';
  document.getElementById('idade-cg').value = '';
  document.getElementById('cg-result').value = '';
  document.getElementById('cg-classification').textContent = '';
  document.getElementById('cg-result').style.color = '';
  document.getElementById('cg-classification').style.color = '';
}

// Função de busca
function filterCards(searchTerm) {
  const cards = document.querySelectorAll('.card');
  let hasResults = false;
  
  searchTerm = searchTerm.toLowerCase();
  cards.forEach(card => {
    const keywords = card.dataset.searchKeywords || '';
    const title = card.querySelector('h2').textContent.toLowerCase();
    
    if (title.includes(searchTerm) || keywords.includes(searchTerm)) {
      card.style.display = 'block';
      hasResults = true;
    } else {
      card.style.display = 'none';
    }
  });

  const noResults = document.getElementById('noResults');
  if (!hasResults && searchTerm) {
    noResults.style.display = 'block';
    document.getElementById('searchTerm').textContent = searchTerm;
  } else {
    noResults.style.display = 'none';
  }
}

// Pediatric CBR Calculator (Schwartz formula)
function calculatePediatricCBR() {
  const age = parseInt(document.getElementById('childAge').value);
  const height = parseFloat(document.getElementById('childHeight').value);
  const creatinine = parseFloat(document.getElementById('childCreatinine').value);
  const isMale = document.querySelector('input[name="childGender"]:checked').value === 'masculino';
  const resultField = document.getElementById('pedcbr-result');
  const classification = document.getElementById('pedcbr-classification');
  
  // Clear results if invalid inputs
  if (isNaN(age) || isNaN(height) || isNaN(creatinine) || creatinine <= 0) {
    resultField.value = '';
    classification.textContent = '';
    return;
  }

  // Calculate with gender coefficient
  const k = isMale ? 0.70 : 0.55; // Updated coefficients for Schwartz formula
  const cbr = (k * height) / creatinine;
  
  // Format and display result
  resultField.value = cbr.toFixed(2) + ' mL/min/1.73m²';
  
  // Set classification and colors
  if (cbr >= 90) {
    classification.textContent = 'Função Renal Normal';
    resultField.style.color = '#4CAF50';
    classification.style.color = '#4CAF50';
  } else if (cbr >= 60) {
    classification.textContent = 'Leve Redução';
    resultField.style.color = '#8BC34A';
    classification.style.color = '#8BC34A';
  } else if (cbr >= 30) {
    classification.textContent = 'Moderada Redução';
    resultField.style.color = '#FFC107';
    classification.style.color = '#FFC107';
  } else if (cbr >= 15) {
    classification.textContent = 'Grave Redução';
    resultField.style.color = '#FF9800';
    classification.style.color = '#FF9800';
  } else {
    classification.textContent = 'Falência Renal';
    resultField.style.color = '#F44336';
    classification.style.color = '#F44336';
  }
}

function resetPediatricCBR() {
  document.getElementById('childAge').value = '';
  document.getElementById('childHeight').value = '';
  document.getElementById('childCreatinine').value = '';
  document.getElementById('pedcbr-result').value = '';
  document.getElementById('pedcbr-classification').textContent = '';
  document.getElementById('pedcbr-result').style.color = '';
  document.getElementById('pedcbr-classification').style.color = '';
}
