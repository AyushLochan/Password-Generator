
const passwordBox = document.getElementById("password");
const lengthInput = document.getElementById("length");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:',.<>?/`~";

const allChars = upperCase + lowerCase + numbers + symbols;

function generatePassword() {
    const length = lengthInput.value;

    if (length < 6 || length > 30) {
        alert("Password length must be between 6 and 30 characters.");
        return;
    }

    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    while (password.length < length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    passwordBox.value = shufflePassword(password);
}

function shufflePassword(password) {
    return password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
    if (passwordBox.value === "") {
        alert("Generate a password first!");
        return;
    }

    passwordBox.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
});
