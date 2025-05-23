const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

const passwordInput = document.getElementById('passwordInput');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const lengthSlider = document.getElementById('lengthSlider');
const lengthDisplay = document.getElementById('lengthDisplay');
const strengthMeter = document.getElementById('strengthMeter');
const strengthScore = document.getElementById('strengthScore');
const strengthFill = document.getElementById('strengthFill');
const notification = document.getElementById('notification');

const checkboxes = {
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    numbers: document.getElementById('numbers'),
    symbols: document.getElementById('symbols')
};

lengthSlider.addEventListener('input', () => {
    lengthDisplay.textContent = lengthSlider.value;
});

function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let availableChars = '';
    let password = '';

    Object.keys(checkboxes).forEach(key => {
        if (checkboxes[key].checked) {
            availableChars += charSets[key];
        }
    });

    if (availableChars === '') {
        showNotification('Please select at least one character type!', '#ef4444');
        return;
    }

    Object.keys(checkboxes).forEach(key => {
        if (checkboxes[key].checked) {
            const chars = charSets[key];
            password += chars[Math.floor(Math.random() * chars.length)];
        }
    });

    while (password.length < length) {
        password += availableChars[Math.floor(Math.random() * availableChars.length)];
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');

    passwordInput.value = password;
    updateStrengthMeter(password);
    strengthMeter.style.display = 'block';
}

function calculateStrength(password) {
    let score = 0;
    let feedback = [];

    if (password.length >= 12) score += 25;
    else if (password.length >= 8) score += 15;
    else score += 5;

    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;

    if (password.length >= 16) score += 10;

    return Math.min(score, 100);
}

function updateStrengthMeter(password) {
    const strength = calculateStrength(password);
    const percentage = strength;

    let label, className;
    if (strength < 40) {
        label = 'Weak';
        className = 'strength-weak';
    } else if (strength < 60) {
        label = 'Fair';
        className = 'strength-fair';
    } else if (strength < 80) {
        label = 'Good';
        className = 'strength-good';
    } else {
        label = 'Strong';
        className = 'strength-strong';
    }

    strengthScore.textContent = label;
    strengthScore.className = `strength-score ${className}`;
    strengthFill.className = `strength-fill ${className}`;
    strengthFill.style.width = `${percentage}%`;
}

async function copyToClipboard() {
    if (!passwordInput.value) {
        showNotification('Generate a password first!', '#ef4444');
        return;
    }

    try {
        await navigator.clipboard.writeText(passwordInput.value);
        showNotification('Password copied to clipboard! 🎉');
    } catch (err) {

        passwordInput.select();
        document.execCommand('copy');
        showNotification('Password copied to clipboard! 🎉');
    }
}

// Show notification
function showNotification(message, color = '#10b981') {
    notification.textContent = message;
    notification.style.background = color;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

generatePassword();

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'Enter') {
            e.preventDefault();
            generatePassword();
        } else if (e.key === 'c' && passwordInput.value) {

        }
    } else if (e.key === 'Enter' && e.target !== passwordInput) {
        generatePassword();
    }
});

Object.values(checkboxes).forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (passwordInput.value) {
            generatePassword();
        }
    });
});

lengthSlider.addEventListener('input', () => {
    if (passwordInput.value) {
        generatePassword();
    }
});
