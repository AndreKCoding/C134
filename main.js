img = "";
stats = "";
video = "";

pessoa = false;

objects = [];

function setup()
{
    canvas = createCanvas(640, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function preload()
{
    som = loadSound('Alarme.mp3');
}

function draw()
{
    image(video, 0, 0, 640, 420);
    
    if(stats != "")
    {
        for (i = 0; i < objects.length; i++)
        {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("objectNumber").innerHTML = "Foram detectados " + objects.length + " Objetos";
            fill(r,g,b);
            porcentagem = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + porcentagem + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label == "person")
            {
                pessoa = true;
                console.log(pessoa);
            }
            else
            {
                pessoa = false;
                console.log(pessoa);
            }
        }

        if(pessoa == true)
        {
            document.getElementById("status").innerHTML = "Pessoa Identificada";
            som.stop();
            som.setVolume(1);
            som.rate(1);
        }
        else if(pessoa == false)
        {
            document.getElementById("status").innerHTML = "Pessoa Não Identificada";
                
            console.log("Não achou");
            som.play();
            som.setVolume(0.5);
            som.rate(1);

            setTimeout(function()
            {
                pessoa = true;
                som.stop();
            }, 2000);
        }
        
    }
}

function start()
{
    detectorObject = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objeto";
}

function modelLoaded()
{
    console.log("O Modelo foi Carregado!");
    stats = true;
    detectorObject.detect(video, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);

    objects = results;

    floor(objects);
    console.log(objects);
}