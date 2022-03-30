window.addEventListener("load", function () {
    console.log("Página carregada.");

    // Eventos de "play";

    const play = document.getElementById("play-btn");

    play.addEventListener("click", function () {
        const screenProtector = document.getElementById("screen-protector");
        screenProtector.style.display = "none";
        play.style.display = "none";
    });

    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    //  Dimensões da tela;

    const screen = 20; // 20x20;
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 400, 400);

    // Criar xadrez;

    // Criar cobra;

    let snakeX = 4;
    let snakeY = 10; // Localização inicial da cobra;

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(snakeX*screen, snakeY*screen, 20, 20);
    const defaultTail = 2;
    let tail = defaultTail;

    // Rastro inicial;
    for (let i = 0; i <= tail; i++) {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fillRect((snakeX-i)*screen, (snakeY)*screen, 20, 20);
    }

    let tailCoords = [];

    // Controles;

    let nextX;
    let nextY;

    document.addEventListener("keydown", function (e) {
        switch(e.key) {
            case "ArrowLeft":
                nextX = -1;
                nextY = 0;
                break;
            case "ArrowUp":
                nextX = 0;
                nextY = -1;
                break;
            case "ArrowRight":
                nextX = 1;
                nextY = 0;
                break;
            case "ArrowDown":
                nextX = 0;
                nextY = 1;
                break;
        }
    });

    // Criar maçã;

    const beginArc = 0;
    const endArc = Math.PI * 2;

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(15*screen, 15*screen, 8, beginArc, endArc);
    ctx.fill();

    // Se comer a maçã;

    // Se a cobra bater na própria cauda;

    // Se a cobra sair da tela;


    const x = 1;
    setInterval(game, 1000/x); // Para repintar tela;

    function game () {
        // Direção da cobra;

        let right;

        if (nextX == -1 && nextY == 0) {
            snakeX--;
        }

        if (nextX == 0 && nextY == -1) {
            snakeY--;
        }

        if (nextX == 1 && nextY == 0) {
            snakeX++;
            right = true; // Para indicar que o jogo iniciou;
        }

        if (nextX == 0 && nextY == 1) {
            snakeY++;
        }
        
        // Valores iniciais de tailCoords;

        tailCoords[0] = {x: (snakeX-1), y: snakeY};
        tailCoords[1] = {x: (snakeX-2), y: snakeY};

        // Rastro contínuo;

        if (right == true) {
            tailCoords.push(
                {
                    x: snakeX,
                    y: snakeY
                }
            );
        

            for (let i = 0; i <= tail; i++) {
                ctx.beginPath();
                ctx.fillStyle = "blue";
                ctx.fillRect(tailCoords[i].x * screen, tailCoords[i].y * screen, 20, 20);
                console.log(tailCoords)

                // Se for maior que o tamanho da cauda, remove o primeiro elemento do array;
                if (tailCoords.length > tail + 1) {
                    tailCoords.shift();
                }
            }
        }

        // Área de testes
        // console.log(tailCoords);

    }
});