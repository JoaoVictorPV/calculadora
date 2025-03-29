// Funções de cálculo
function calculateSteatosis() {
    try {
        const inPhase = parseFloat(document.getElementById('in-phase').value.replace(',', '.'));
        const outPhase = parseFloat(document.getElementById('out-phase').value.replace(',', '.'));

        if (isNaN(inPhase) || isNaN(outPhase)) {
            showToast('Preencha todos os campos corretamente');
            return;
        }

        const result = ((inPhase - outPhase) / inPhase) * 100;
        document.getElementById('result').value = result.toFixed(2) + '%';

        // Classificação
        const classification = document.getElementById('classification');
        if (result > 16.5) {
            classification.textContent = 'Esteatose Grave';
            classification.style.color = '#ea4335';
        } else if (result > 5) {
            classification.textContent = 'Esteatose Moderada';
            classification.style.color = '#fa7b17';
        } else {
            classification.textContent = 'Normal';
            classification.style.color = '#34a853';
        }
    } catch (error) {
        console.error('Erro no cálculo de esteatose:', error);
        showToast('Erro ao calcular esteatose');
    }
}

function calculateVolume() {
    try {
        const dim1 = parseFloat(document.getElementById('dimension1').value.replace(',', '.'));
        const dim2 = parseFloat(document.getElementById('dimension2').value.replace(',', '.'));
        const dim3 = parseFloat(document.getElementById('dimension3').value.replace(',', '.'));

        if (isNaN(dim1) || isNaN(dim2) || isNaN(dim3)) {
            showToast('Preencha todos os campos corretamente');
            return;
        }

        const volume = (dim1 * dim2 * dim3) * 0.52; // Fórmula do elipsoide
        document.getElementById('volume-result').value = volume.toFixed(2) + ' cm³';
    } catch (error) {
        console.error('Erro no cálculo de volume:', error);
        showToast('Erro ao calcular volume');
    }
}

function calculateMDRD() {
    try {
        const creatinina = parseFloat(document.getElementById('creatinina').value.replace(',', '.'));
        const idade = parseFloat(document.getElementById('idade').value);
        const genero = document.querySelector('input[name="genero"]:checked').value;

        if (isNaN(creatinina) || isNaN(idade)) {
            showToast('Preencha todos os campos corretamente');
            return;
        }

        let resultado = 175 * Math.pow(creatinina, -1.154) * Math.pow(idade, -0.203);
        if (genero === 'feminino') resultado *= 0.742;

        const resultValue = resultado.toFixed(2);
        document.getElementById('mdrd-result').value = resultValue + ' mL/min/1.73m²';

        // Classificação
        const classification = document.getElementById('mdrd-classification');
        if (resultado >= 90) {
            classification.textContent = 'Normal';
            classification.style.color = '#34a853';
        } else if (resultado >= 60) {
            classification.textContent = 'Redução Leve';
            classification.style.color = '#fbbc05';
        } else if (resultado >= 30) {
            classification.textContent = 'Redução Moderada';
            classification.style.color = '#fa7b17';
        } else if (resultado >= 15) {
            classification.textContent = 'Redução Grave';
            classification.style.color = '#ea4335';
        } else {
            classification.textContent = 'Falência Renal';
            classification.style.color = '#d32f2f';
        }
    } catch (error) {
        console.error('Erro no cálculo MDRD:', error);
        showToast('Erro ao calcular MDRD');
    }
}

function calculateCockroftGault() {
    try {
        const peso = parseFloat(document.getElementById('peso').value.replace(',', '.'));
        const creatinina = parseFloat(document.getElementById('creatinina-cg').value.replace(',', '.'));
        const idade = parseFloat(document.getElementById('idade-cg').value);
        const genero = document.querySelector('input[name="genero-cg"]:checked').value;

        if (isNaN(peso) || isNaN(creatinina) || isNaN(idade)) {
            showToast('Preencha todos os campos corretamente');
            return;
        }

        let resultado = ((140 - idade) * peso) / (72 * creatinina);
        if (genero === 'feminino') resultado *= 0.85;

        const resultValue = resultado.toFixed(2);
        document.getElementById('cg-result').value = resultValue + ' mL/min';

        // Classificação
        const classification = document.getElementById('cg-classification');
        if (resultado >= 90) {
            classification.textContent = 'Normal';
            classification.style.color = '#34a853';
        } else if (resultado >= 60) {
            classification.textContent = 'Redução Leve';
            classification.style.color = '#fbbc05';
        } else if (resultado >= 30) {
            classification.textContent = 'Redução Moderada';
            classification.style.color = '#fa7b17';
        } else if (resultado >= 15) {
            classification.textContent = 'Redução Grave';
            classification.style.color = '#ea4335';
        } else {
            classification.textContent = 'Falência Renal';
            classification.style.color = '#d32f2f';
        }
    } catch (error) {
        console.error('Erro no cálculo Cockroft-Gault:', error);
        showToast('Erro ao calcular Cockroft-Gault');
    }
}

// Funções específicas para cada card
function resetCampos1() {
    try {
        // Card 1 - Esteatose Hepática
        document.getElementById('in-phase').value = '';
        document.getElementById('out-phase').value = '';
        document.getElementById('result').value = '';
        const classification = document.getElementById('classification');
        classification.textContent = '';
        classification.style.color = '';
        
        // Feedback visual
        animateReset('card1');
        showToast('Campos do Card 1 resetados');
    } catch (error) {
        console.error('Erro ao resetar Card 1:', error);
        showToast('Erro ao resetar Card 1');
    }
}

function resetCampos2() {
    try {
        // Card 2 - Volume
        document.getElementById('dimension1').value = '';
        document.getElementById('dimension2').value = '';
        document.getElementById('dimension3').value = '';
        document.getElementById('volume-result').value = '';
        
        // Feedback visual
        animateReset('card2');
        showToast('Campos do Card 2 resetados');
    } catch (error) {
        console.error('Erro ao resetar Card 2:', error);
        showToast('Erro ao resetar Card 2');
    }
}

function resetCampos5() {
    try {
        // Card 5 - MDRD
        document.getElementById('creatinina').value = '';
        document.getElementById('idade').value = '';
        document.querySelector('input[name="genero"][value="masculino"]').checked = true;
        document.getElementById('mdrd-result').value = '';
        const classification = document.getElementById('mdrd-classification');
        classification.textContent = '';
        classification.style.color = '';
        
        // Feedback visual
        animateReset('card5');
        showToast('Campos do Card 5 resetados');
    } catch (error) {
        console.error('Erro ao resetar Card 5:', error);
        showToast('Erro ao resetar Card 5');
    }
}

function resetCampos6() {
    try {
        // Card 6 - Cockroft-Gault
        document.getElementById('peso').value = '';
        document.getElementById('creatinina-cg').value = '';
        document.getElementById('idade-cg').value = '';
        document.querySelector('input[name="genero-cg"][value="masculino"]').checked = true;
        document.getElementById('cg-result').value = '';
        const classification = document.getElementById('cg-classification');
        classification.textContent = '';
        classification.style.color = '';
        
        // Feedback visual
        animateReset('card6');
        showToast('Campos do Card 6 resetados');
    } catch (error) {
        console.error('Erro ao resetar Card 6:', error);
        showToast('Erro ao resetar Card 6');
    }
}

function animateReset(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
        card.style.transition = 'all 0.3s';
        card.style.boxShadow = '0 0 10px rgba(0,255,0,0.5)';
        setTimeout(() => {
            card.style.boxShadow = '';
        }, 300);
    }
}

function filterCards(searchTerm) {
    const cards = document.querySelectorAll('.card');
    const noResults = document.getElementById('noResults');
    const searchTermSpan = document.getElementById('searchTerm');
    let hasResults = false;

    // Normaliza o termo de busca (remove acentos e converte para minúsculas)
    const normalizedSearchTerm = searchTerm
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    // Só busca se tiver pelo menos 2 caracteres
    if (normalizedSearchTerm.length < 2) {
        cards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
        });
        noResults.style.display = 'none';
        return;
    }

    cards.forEach(card => {
        const title = card.querySelector('h2').textContent;
        const keywords = card.dataset.searchKeywords || '';
        
        // Normaliza o texto para busca
        const searchText = (title + ' ' + keywords)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        const match = searchText.includes(normalizedSearchTerm);

        if (match) {
            card.style.display = 'block';
            card.style.opacity = '1';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (hasResults) {
        noResults.style.display = 'none';
    } else {
        searchTermSpan.textContent = searchTerm;
        noResults.style.display = 'block';
    }
}

// Função auxiliar para mostrar mensagens
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
