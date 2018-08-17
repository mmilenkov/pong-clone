/* Test for connection */
console.log("Connected");

/* Variables global */
var canvas;
var canvasContent;
var ballX = 10;
var ballY = 10;
var ballSpeedX = 5;
var ballSpeedY = 5;
var paddleP1 = 250;
var paddleP2 = 250;
var scoreAi = 0;
var scorePlayer =0;
var winScreen = false;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const VICTORY_SCORE = 3;


/* Stats script once the page has loaded */
window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    canvasContent = canvas.getContext("2d");
    let FPS = 30;
    canvas.addEventListener("mousedown", gameEnd);


        setInterval(function () {
            drawBoard();
            Movement()
        }, 1000 / FPS);
        /* 30 FPS */
        canvas.addEventListener("mousemove", function (evt) {
            var mousePos = mousePosition(evt);
            paddleP1 = mousePos.y - (PADDLE_HEIGHT / 2);
        })

};

function drawDivider ()
{
    for (let i=0; i<canvas.height; i+=40)
    {
        colorRect(canvas.width/2-1,i,2,20,"white")
    }
}
function drawBoard ()
{
    /* Win Board */
    if (winScreen === true) {
        canvasContent.font="20px Georgia";
        canvasContent.fillStyle = "white";
        if (scoreAi === VICTORY_SCORE)
        {
            canvasContent.fillText("Right side won!", canvas.width / 2.5, canvas.height*0.3);
        }
        else if(scorePlayer === VICTORY_SCORE)
        {
            canvasContent.fillText("Left side won!", canvas.width / 2.5, canvas.height*0.3);
        }

        canvasContent.fillText("Click to continue", canvas.width / 2.5, canvas.height*0.7);

        return;

    }

        /* Background */
        colorRect(0, 0, canvas.width, canvas.height, "black");

        /* Paddles */
        colorRect(0, paddleP1, PADDLE_THICKNESS, PADDLE_HEIGHT, "white"); //Left
        colorRect(canvas.width - 10, paddleP2, PADDLE_THICKNESS, PADDLE_HEIGHT, "white"); //Right - AI

        /* Net */
        drawDivider();
        /* Ball MUST BE LAST! order of drawing first at the top last at the bottom.
        Determines which is on top of which */
        drawBall(ballX, ballY, 10, "white");

        /* Score */
        canvasContent.font="20px Georgia";
        canvasContent.fillText(scorePlayer, 100, 50);
        canvasContent.fillText(scoreAi, canvas.width - 100, 50);

}

function Movement ()
{
    if (!winScreen) {
        /* AI */
        paddleAi();
        /* Ball Movement */
        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY;

        if (ballX > canvas.width) //Right
        {
            if (ballY > paddleP2 && ballY < paddleP2 + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                let deltaY = ballY - (paddleP2 + PADDLE_HEIGHT / 2);
                ballSpeedY = deltaY * 0.35;
            }
            else {
                scorePlayer += 1;
                ballReset();
            }
        }

        if (ballX < 0) //Left
        {
            if (ballY > paddleP1 && ballY < paddleP1 + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                let deltaY = ballY - (paddleP1 + PADDLE_HEIGHT / 2);
                ballSpeedY = deltaY / 3;
            }
            else {
                scoreAi += 1;
                ballReset();
            }

        }
        if (ballY >= canvas.height || ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }
    }
}

function colorRect(leftX,TopY,width,height,drawColor)
{
    canvasContent.fillStyle = drawColor;
    canvasContent.fillRect(leftX,TopY,width,height);
}

function drawBall(CenterX,CenterY,radius,DrawColor)
{
    canvasContent.fillStyle = "DrawColor";
    canvasContent.beginPath();
    canvasContent.arc(CenterX,CenterY,radius,0,Math.PI*2,true);
    canvasContent.fill();
}

function mousePosition(evt)
{
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return {x:mouseX,y:mouseY };
}

function ballReset()
{
    if (scoreAi >= VICTORY_SCORE || scorePlayer >= VICTORY_SCORE)
    {
        winScreen = true;
    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function gameEnd (evt)
{
    if(winScreen === true)
    {
        scoreAi = 0;
        scorePlayer = 0;
        winScreen = false;
    }
}
function paddleAi()
{
    let paddleP2Center = paddleP2+(PADDLE_HEIGHT/2);
    if(paddleP2Center < ballY-(PADDLE_HEIGHT/2.5))
        {
            paddleP2= paddleP2+6;
        }
    if (paddleP2Center > ballY-(PADDLE_HEIGHT/2.5))
        {
            paddleP2= paddleP2-6;
        }
}