window.addEventListener('load', () => {
    const scrollTo = sel => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });

    document.querySelectorAll('.category-menu a, .nav a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => { e.preventDefault(); scrollTo(a.getAttribute('href')); });
    });

    if (window.location.hash) scrollTo(window.location.hash);
});

const careerNames = [
    "Analyst",
    "Designer",
    "Teacher / Counselor",
    "Engineer",
    "Manager / Entrepreneur"
];

// Quiz page logic
if (document.getElementById('quizForm')) {
    const form = document.getElementById('quizForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const scores = [0, 0, 0, 0, 0]; // 5 careers

        // Validate all questions are answered
        for (let i = 1; i <= 10; i++) {
            const selected = form['q' + i].value;
            if (!selected) {
                alert(`Please answer all questions`);
                return;
            }
            scores[selected]++;
        }

        const maxScore = Math.max(...scores);
        const careerIndex = scores.indexOf(maxScore);

        // Store result in localStorage
        localStorage.setItem('careerIndex', careerIndex);

        // Redirect to result page
        window.location.href = 'result.html';
    });
}

// Result page logic
if (document.getElementById('careerName')) {
    const careerIndex = localStorage.getItem('careerIndex');

    if (careerIndex !== null) {
        document.getElementById('careerName').textContent = careerNames[careerIndex];
    } else {
        document.getElementById('careerName').textContent = "No result found. Please take the quiz.";
    }
}
