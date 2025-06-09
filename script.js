document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const resultsContainer = document.getElementById('results');
    const scoreDisplay = document.getElementById('score');
    const answersReview = document.getElementById('answers-review');

    const correctAnswers = {
        q1: ['I', 'II', 'III', 'IV', 'V'],
        q2: ['I', 'II', 'III', 'IV', 'V'],
        q3: ['I', 'II', 'III'],
        q4: ['II', 'III', 'IV', 'V'],
        q5: ['II', 'III', 'V'],
        q6: ['I', 'II', 'III', 'V'],
        q7: ['I', 'II', 'III', 'IV'],
        q8: ['I', 'II', 'III', 'IV', 'V'],
        q9: ['I', 'II', 'III', 'V'],
        q10: ['I', 'II', 'III', 'IV'],
        q11: ['I', 'II', 'III', 'IV'],
        q12: ['I', 'II', 'III', 'IV', 'V'],
        q13: ['I', 'II', 'III', 'V'],
        q14: ['I', 'II', 'III', 'IV', 'V'],
        q15: ['I', 'II', 'III', 'IV', 'V'],
        q16: ['I', 'II', 'III', 'IV'],
        q17: ['I', 'II', 'III', 'IV'],
        q18: ['I', 'II', 'III', 'IV', 'V'],
        q19: ['I', 'II', 'III', 'IV'],
        q20: ['I', 'II', 'III', 'IV']
    };

    const answerExplanations = {
        q1: 'Todas as afirmativas estão corretas.',
        q2: 'Todas as afirmativas estão corretas.',
        q3: 'IV está incorreta: a digestão de lipídios ocorre predominantemente no intestino delgado. V está incorreta: vitaminas e minerais são absorvidos sem digestão.',
        q4: 'I está incorreta: a camada submucosa contém vasos sanguíneos, linfáticos e o plexo submucoso (de Meissner). V está incorreta: o plexo mioentérico (de Auerbach) está localizado entre as camadas musculares longitudinal e circular externa.',
        q5: 'I está incorreta: o SNE pode atuar de forma independente, mas é modulado pelo SNC. V está incorreta: reflexos locais (curtos) envolvem apenas o SNE, enquanto reflexos longos envolvem o SNC.',
        q6: 'III está incorreta: a deglutição tem fases voluntárias e involuntárias.',
        q7: 'V está incorreta: a digestão de carboidratos é mínima e a de lipídios é muito limitada no estômago.',
        q8: 'Todas as afirmativas estão corretas.',
        q9: 'IV está incorreta: as enzimas pancreáticas são secretadas como zimogênios e necessitam de ativação. V está incorreta: a tripsina é ativada pelo tripsinogênio pela enteroquinase, e não por ela mesma.',
        q10: 'V está incorreta: a maior parte da absorção de água ocorre no intestino delgado.',
        q11: 'V está incorreta: a digestão química é mínima no intestino grosso, sendo feita principalmente por bactérias.',
        q12: 'Todas as afirmativas estão corretas.',
        q13: 'IV está incorreta: a bile não contém enzimas digestivas. V está incorreta: a ausência da vesícula biliar pode dificultar, mas não impede completamente, a digestão de gorduras, pois o fígado continua produzindo bile.',
        q14: 'Todas as afirmativas estão corretas.',
        q15: 'Todas as afirmativas estão corretas.',
        q16: 'V está incorreta: polissacarídeos devem ser digeridos em monossacarídeos antes da absorção.',
        q17: 'V está incorreta: proteínas intactas são absorvidas em quantidades muito pequenas em adultos, mas é mais comum em neonatos.',
        q18: 'Todas as afirmativas estão corretas.',
        q19: 'V está incorreta: a motilidade do intestino grosso é influenciada por reflexos mais amplos (como os mencionados) e também por fatores hormonais e neurais intrínsecos.',
        q20: 'V está incorreta: a defecação possui componentes voluntários (controle do esfíncter anal externo e uso de músculos abdominais) além dos reflexos involuntários.'
    };

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let score = 0;
        answersReview.innerHTML = ''; // Clear previous results

        for (let i = 1; i <= 20; i++) {
            const questionName = `q${i}`;
            const selectedOptions = Array.from(document.querySelectorAll(`input[name="${questionName}"]:checked`)).map(input => input.value);
            const correctOptions = correctAnswers[questionName];

            const questionBlock = document.querySelector(`.question-block:nth-of-type(${i})`);
            const questionText = questionBlock.querySelector('p').textContent;

            const isCorrect = arraysEqual(selectedOptions.sort(), correctOptions.sort());

            const resultDiv = document.createElement('div');
            resultDiv.classList.add('question-result');
            if (isCorrect) {
                score++;
                resultDiv.classList.add('correct');
                resultDiv.innerHTML = `<p>${questionText} - <span class="correct-answer">Correta!</span></p>`;
            } else {
                resultDiv.classList.add('incorrect');
                const yourAnswerText = selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Nenhuma resposta selecionada';
                resultDiv.innerHTML = `
                    <p>${questionText} - <span class="your-answer">Incorreta.</span></p>
                    <p>Sua resposta: <span class="your-answer">${yourAnswerText}</span></p>
                    <p>Resposta correta: <span class="correct-answer">${correctOptions.join(', ')}</span></p>
                    <p>Explicação: ${answerExplanations[questionName]}</p>
                `;
            }
            answersReview.appendChild(resultDiv);
        }

        scoreDisplay.textContent = `Você acertou: ${score}/20 questões.`;
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    });

    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
});