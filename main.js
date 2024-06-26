objectDetector = "";

img = "";
objects = [];
status = "";

function preload(){
    img = loadImage('Obj1.img');
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";

}

function modelLoaded(){
    console.loog("Model Loaded")
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error)
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(img, 0, 0, 640, 420);

    if (status != ""){
        for(var i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status : object Detected";

            fill(255, 0, 0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" +percent+"%" , objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke(255, 0 , 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}