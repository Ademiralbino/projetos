document.addEventListener("DOMContentLoaded", () => {

    // 1. ANIMAÇÃO DE ABERTURA - TERMINAL DE SISTEMA (TEMPO EXPANDIDO ~4.5s)
    const introScreen = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");

    // Cria a estrutura do terminal dinamicamente
    introScreen.innerHTML = `
        <div class="terminal-loader">
            <div class="terminal-header">
                <span class="t-dot red"></span>
                <span class="t-dot yellow"></span>
                <span class="t-dot green"></span>
                <span class="t-title">system_init.sh</span>
            </div>
            <div class="terminal-body" id="terminal-body">
                <p><span class="prompt">$</span> <span class="cmd" id="typed-text"></span><span class="cursor">|</span></p>
            </div>
        </div>
    `;

    const commands = [
        "init --profile ademir_albino",
        "loading modules: HTML, CSS, JS...",
        "authenticating secure connection..."
    ];

    const typedTextEl = document.getElementById("typed-text");
    const terminalBody = document.getElementById("terminal-body");

    let cmdIndex = 0;
    let charIndex = 0;

    function typeCommand() {
        if (cmdIndex < commands.length) {
            let currentCmd = commands[cmdIndex];

            if (charIndex < currentCmd.length) {
                typedTextEl.textContent += currentCmd.charAt(charIndex);
                charIndex++;
                setTimeout(typeCommand, 45); // Cadência de digitação mais calma e legível
            } else {
                // Linha concluída - pausa maior antes de ir para a próxima
                setTimeout(() => {
                    const p = document.createElement("p");
                    p.innerHTML = `<span class="prompt">$</span> ${currentCmd}`;
                    terminalBody.insertBefore(p, typedTextEl.parentElement);

                    typedTextEl.textContent = "";
                    charIndex = 0;
                    cmdIndex++;

                    if (cmdIndex === commands.length) {
                        // Exibe a mensagem final de acesso concedido com destaque
                        setTimeout(() => {
                            const lastP = document.createElement("p");
                            lastP.className = "success-msg";
                            lastP.innerHTML = `<span class="prompt">&gt;</span> STATUS: ACCESS GRANTED`;
                            terminalBody.appendChild(lastP);
                            typedTextEl.parentElement.style.display = "none";

                            // Pausa para o visitante ler a confirmação antes de entrar no site
                            setTimeout(finishIntro, 1200);
                        }, 400);
                    } else {
                        typeCommand();
                    }
                }, 400); // Pausa entre cada comando digitado
            }
        }
    }

    function finishIntro() {
        document.body.classList.add("site-loaded");
        mainContent.classList.remove("hidden");
        introScreen.style.opacity = "0";

        setTimeout(() => {
            introScreen.style.display = "none";
        }, 800);
    }

    // Início da animação após 500ms
    setTimeout(typeCommand, 500);

    // 2. INTERAÇÃO DA NAVBAR (SCROLL E MENU MOBILE)
    window.addEventListener("scroll", () => {
        const header = document.getElementById("header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    }
});