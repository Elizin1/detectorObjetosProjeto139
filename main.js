img = "";
objects = [];
modelStatus = "";

function preload(){
    img = loadImage('objetos.jpg');
}

function setup(){
    canvas = createCanvas(840, 630);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "status: detectando Objetos";
}

function modelLoaded(){
    console.log("modelo foi carregado");
    modelStatus = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(img, 0, 0, 840, 630);
    if(modelStatus != ""){
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: objetos detectados";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}