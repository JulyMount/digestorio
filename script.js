document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const resultsContainer = document.getElementById('results');
    const scoreDisplay = document.getElementById('score');
    const answersReview = document.getElementById('answers-review');
    const rankingDisplay = document.getElementById('ranking');
    const submitButton = quizForm.querySelector('button[type="submit"]');

    // --- NOVO GABARITO (baseado no arquivo "Gabarito Teste Fisiologia 1.pdf") ---
    const correctAnswers = {
        q1: 'd', // Todas as afirmativas estão corretas
        q2: 'd', // Todas as afirmativas estão corretas
        q3: 'b', // Apenas as afirmativas I e II estão corretas
        q4: 'c', // Apenas as afirmativas II, III, IV e V estão corretas
        q5: 'b', // Apenas as afirmativas II, III e V estão corretas
        q6: 'd', // Apenas as afirmativas I, II, III e V estão corretas
        q7: 'd', // Apenas as afirmativas I, II, III e IV estão corretas
        q8: 'd', // Todas as afirmativas estão corretas
        q9: 'c', // Apenas as afirmativas I, II, III e V estão corretas
        q10: 'c',// Apenas as afirmativas I, II, III e IV estão corretas
        q11: 'c', // Apenas as afirmativas I, II, III e IV estão corretas
        q12: 'd', // Todas as afirmativas estão corretas
        q13: 'c', // Apenas as afirmativas I, II, III e IV estão corretas
        q14: 'd', // Todas as afirmativas estão corretas
        q15: 'c', // Apenas as afirmativas I, III, IV e V estão corretas
        q16: 'c', // Apenas as afirmativas I, II, III e IV estão corretas
        q17: 'c', // Apenas as afirmativas I, II e III estão corretas
        q18: 'd', // Todas as afirmativas estão corretas
        q19: 'c', // Apenas as afirmativas I, II, III e IV estão corretas
        q20: 'c'  // Apenas as afirmativas I, II, III e IV estão corretas
    };

    // --- NOVAS EXPLICAÇÕES/COMENTÁRIOS (baseadas no "Gabarito Teste Fisiologia 1.pdf") ---
    const answerExplanations = {
        q1: 'Todas as afirmativas estão corretas.',
        q2: 'Todas as afirmativas estão corretas.',
        q3: 'A afirmativa IV está incorreta: a digestão de lipídios inicia-se com a lipase lingual na boca e lipase gástrica no estômago, mas a maior parte ocorre no intestino delgado. A afirmativa V está incorreta: a digestão de carboidratos inicia-se na boca com a amilase salivar. As afirmativas I, II e III estão corretas. A opção "b" é a correta.',
        q4: 'A afirmativa I está incorreta: a camada mais interna é a mucosa. A opção "c" é a correta, pois as afirmativas II, III, IV e V estão corretas.',
        q5: 'A afirmativa I está incorreta: O sistema nervoso entérico (SNE) é uma divisão do sistema nervoso autônomo. A afirmativa IV está incorreta: o sistema nervoso parassimpático geralmente estimula (e não inibe) a atividade digestória. A opção "b" é a correta, pois as afirmativas II, III e V estão corretas.',
        q6: 'Todas as afirmativas estão corretas.',
        q7: 'A afirmativa V está incorreta: O esfíncter esofágico INFERIOR impede o refluxo de conteúdo gástrico para o esôfago. A opção "d" é a correta, pois as afirmativas I, II, III e IV estão corretas.',
        q8: 'A afirmativa V está incorreta: A pepsina inicia a digestão de PROTEÍNAS no estômago, não de carboidratos.',
        q9: 'A afirmativa IV está incorreta: a procarboxipeptidase é ativada em carboxipeptidase pela tripsina. A opção "c" é a correta, pois as afirmativas I, II, III e V estão corretas.',
        q10: 'A afirmativa V está incorreta: O fígado é um órgão central no metabolismo de carboidratos, participando da gliconeogênese, glicogenólise e glicogênese. A opção "c" é a correta, pois as afirmativas I, II, III e IV estão corretas.',
        q11: 'A afirmativa V está incorreta: A absorção de nutrientes pode ocorrer por transporte ativo, difusão facilitada e difusão simples, dependendo do nutriente. A opção "c" é a correta, pois as afirmativas I, II, III e IV estão corretas.',
        q12: 'Todas as afirmativas estão corretas.',
        q13: 'A afirmativa V está incorreta: Embora a maior parte da digestão química já tenha ocorrido, a microbiota do intestino grosso realiza fermentação de fibras, que pode ser considerada uma forma de digestão química. A opção "c" é a correta, pois as afirmativas I, II, III e IV estão corretas.',
        q14: 'Todas as afirmativas estão corretas.',
        q15: 'A afirmativa II está incorreta: A secretina estimula a secreção de bicarbonato e água pelo pâncreas. A opção "c" é a correta, pois as afirmativas I, III, IV e V estão corretas. (Nota: O gabarito original parece ter um erro aqui, se a II está incorreta, a resposta "c" que inclui I, III, IV e V seria mais plausível. Assumi que a intenção era a II correta para a "d", mas com base no gabarito, estou ajustando a explicação para a "c" que está no gabarito, presumindo que o erro esteja na minha interpretação original ou no PDF.) **Correção: A afirmativa II ESTÁ correta, a secretina estimula bicarbonato. O gabarito indica "c) Apenas as afirmativas I, III, IV e V estão corretas". Isso implica que a afirmativa II está incorreta, o que é contraditório à fisiologia. Manterei o gabarito fornecido, mas com a ressalva. Parece haver um erro no gabarito para esta questão. A afirmativa II "A secretina estimula a secreção de bicarbonato pelo pâncreas" é de fato CORRETA. Se a resposta é "c) Apenas as afirmativas I, III, IV e V estão corretas", isso significa que a II estaria incorreta. Vou manter a resposta do gabarito (c) e o comentário que reflete as afirmativas listadas na resposta "c", mas notando a potencial inconsistência.**',
        q16: 'A afirmativa V está incorreta: Peptídeos pequenos (di e tripeptídeos) podem, sim, ser absorvidos e, posteriormente, hidrolisados em aminoácidos dentro das células. A opção "c" é a correta, pois as afirmativas I, II, III e IV estão corretas.',
        q17: 'A afirmativa IV está incorreta: Os quilomícrons são liberados na linfa (vasos linfáticos), não diretamente na corrente sanguínea. A opção "c" é a correta, pois as afirmativas I, II e III estão corretas. (Nota: O gabarito aponta para a "c" enquanto o PDF de questões tem "a,b,c,d,e" nas alternativas, e o gabarito PDF tem 17. c) Apenas as afirmativas I, II e III estão corretas. Isso está em conformidade).',
        q18: 'A afirmativa V está incorreta: A ativação inicial do tripsinogênio em tripsina é pela enteroquinase. A tripsina então ativa as outras pró-enzimas. Portanto, nem todas dependem *diretamente* da enteroquinase, mas indiretamente sim, através da tripsina. No entanto, o gabarito indica "d) Todas as afirmativas estão corretas". Vamos seguir o gabarito. Se todas são corretas, V também seria. Revisando V: "A ativação de todas as pró-enzimas pancreáticas depende diretamente da enteroquinase." Isso é fisiologicamente impreciso, pois a tripsina (ativada pela enteroquinase) ativa as outras. A afirmação "diretamente" torna V falsa. **Vou seguir o gabarito fornecido (d), mas com a ressalva sobre a afirmativa V, que parece ter uma imprecisão.**',
        q19: 'A afirmativa V está incorreta, pois a motilidade do intestino grosso é influenciada por reflexos mais amplos (como os mencionados) e também por fatores hormonais e neurais intrínsecos. A opção "c" é a correta, pois as afirmativas I, II, III e IV estão corretas.',
        q20: 'A afirmativa V está incorreta, pois a defecação possui componentes voluntários (controle do esfíncter anal externo e uso de músculos abdominais) além dos reflexos involuntários. A opção "c" é a correta, pois as afirmativas I, II, III e IV estão corretas.'
    };

    // A função disableQuiz agora é usada apenas para desabilitar após a submissão.
    function disableQuiz() {
        quizForm.querySelectorAll('input[type="radio"], button[type="submit"]').forEach(el => el.disabled = true);
    }

    // O formulário estará habilitado por padrão, já que não há timer para iniciar.
    function enableQuiz() {
        quizForm.querySelectorAll('input[type="radio"], button[type="submit"]').forEach(el => el.disabled = false);
    }

    // --- Event Listener para submissão do formulário ---
    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        submitQuiz(); // Chama a função para submeter e exibir resultados
    });

    // --- Função de Submissão do Quiz ---
    function submitQuiz() {
        let score = 0;
        answersReview.innerHTML = '';

        for (let i = 1; i <= 20; i++) {
            const questionName = `q${i}`;
            const selectedOptionElement = document.querySelector(`input[name="${questionName}"]:checked`);
            const userAnswer = selectedOptionElement ? selectedOptionElement.value : 'Nenhuma resposta';
            const correctAnswer = correctAnswers[questionName];

            const questionBlock = document.querySelector(`.question-block:nth-of-type(${i})`);
            const questionText = questionBlock.querySelector('p strong').textContent;

            const isCorrect = (userAnswer === correctAnswer);

            const resultDiv = document.createElement('div');
            resultDiv.classList.add('question-result');

            if (isCorrect) {
                score++;
                resultDiv.classList.add('correct');
                resultDiv.innerHTML = `<p>${questionText} - <span class="correct-answer">Correta!</span></p>`;
            } else {
                resultDiv.classList.add('incorrect');
                let explanationText = answerExplanations[questionName] || 'Nenhuma explicação disponível para esta questão.';

                const correctLabel = document.querySelector(`label input[name="${questionName}"][value="${correctAnswer}"]`);
                const fullCorrectAnswerText = correctLabel ? correctLabel.textContent.trim() : `Alternativa ${correctAnswer}`;

                resultDiv.innerHTML = `
                    <p>${questionText} - <span class="your-answer">Incorreta.</span></p>
                    <p>Sua resposta: <span class="your-answer">${userAnswer.toUpperCase()}</span></p>
                    <p>Resposta correta: <span class="correct-answer">${fullCorrectAnswerText}</span></p>
                    <p>Comentário: ${explanationText}</p>
                `;
            }
            answersReview.appendChild(resultDiv);
        }

        scoreDisplay.textContent = `Você acertou: ${score}/20 questões.`;
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });

        disableQuiz(); // Desabilita o formulário após a submissão

        updateAndDisplayRanking(score);
    }

    // --- Funções para o Ranking Local ---
    const MAX_RANKING_ENTRIES = 5;

    function getRanking() {
        // Usar uma chave diferente para o quiz de Digestório
        const ranking = localStorage.getItem('quizRankingDigestorio');
        return ranking ? JSON.parse(ranking) : [];
    }

    function saveRanking(ranking) {
        // Usar uma chave diferente para o quiz de Digestório
        localStorage.setItem('quizRankingDigestorio', JSON.stringify(ranking));
    }

    function updateAndDisplayRanking(currentScore) {
        let ranking = getRanking();
        ranking.push({ score: currentScore, date: new Date().toLocaleString() });
        ranking.sort((a, b) => b.score - a.score);
        ranking = ranking.slice(0, MAX_RANKING_ENTRIES);
        saveRanking(ranking);
        renderRanking(ranking);
    }

    function renderRanking(ranking) {
        rankingDisplay.innerHTML = '<h3>Melhores Pontuações (Este Navegador)</h3>';
        if (ranking.length === 0) {
            rankingDisplay.innerHTML += '<p>Nenhuma pontuação registrada ainda.</p>';
            return;
        }

        const ul = document.createElement('ul');
        ranking.forEach((entry, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}º - ${entry.score}/20 (${entry.date})`;
            ul.appendChild(li);
        });
        rankingDisplay.appendChild(ul);
    }

    // --- Inicialização ---
    enableQuiz(); // Habilita o formulário por padrão
    renderRanking(getRanking());
});
