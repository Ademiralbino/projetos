document.addEventListener("DOMContentLoaded", () => {

    // 1. ANIMAÇÃO DE ABERTURA - TERMINAL DE SISTEMA (TEMPO EXPANDIDO ~4.5s)
    const introScreen = document.getElementById("intro-screen");
    const mainContent = document.getElementById("main-content");

    const commands = [
        "init --profile ademir_albino",
        "loading modules: HTML, CSS, JS, Python, Java...",
        "authenticating secure connection..."
    ];

    const typedTextEl = document.getElementById("typed-text");
    const terminalBody = document.getElementById("terminal-body");

    let cmdIndex = 0;
    let charIndex = 0;

    function typeCommand() {
        if (!typedTextEl || !terminalBody) return;

        if (cmdIndex < commands.length) {
            let currentCmd = commands[cmdIndex];

            if (charIndex < currentCmd.length) {
                typedTextEl.textContent += currentCmd.charAt(charIndex);
                charIndex++;
                setTimeout(typeCommand, 45); // Cadência de digitação fluida
            } else {
                // Linha concluída - pausa antes da próxima
                setTimeout(() => {
                    const p = document.createElement("p");
                    p.innerHTML = `<span class="prompt">$</span> ${currentCmd}`;
                    terminalBody.insertBefore(p, typedTextEl.parentElement);

                    typedTextEl.textContent = "";
                    charIndex = 0;
                    cmdIndex++;

                    if (cmdIndex === commands.length) {
                        // Exibe a mensagem final de acesso concedido
                        setTimeout(() => {
                            const lastP = document.createElement("p");
                            lastP.className = "success-msg";
                            lastP.innerHTML = `<span class="prompt">&gt;</span> STATUS: ACCESS GRANTED`;
                            terminalBody.appendChild(lastP);
                            typedTextEl.parentElement.style.display = "none";

                            // Transição para o site
                            setTimeout(finishIntro, 1200);
                        }, 400);
                    } else {
                        typeCommand();
                    }
                }, 400);
            }
        }
    }

    function finishIntro() {
        document.body.classList.add("site-loaded");
        if (mainContent) mainContent.classList.remove("hidden");
        if (introScreen) {
            introScreen.style.opacity = "0";
            setTimeout(() => {
                introScreen.style.display = "none";
            }, 800);
        }
    }

    // Inicia a digitação após 500ms
    setTimeout(typeCommand, 500);

    // 2. INTERAÇÃO DA NAVBAR (SCROLL E MENU MOBILE)
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    });

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (navLinks.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });

        // Fechar o menu mobile ao clicar num item de navegação
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }
});