song1="";
song2="";
left_wrist_x=0;
left_wrist_y=0;
right_wrist_x=0;
right_wrist_y=0;
song1_status="";
song2_status="";
scoreLeftWrist=0;
scoreRightWrist=0;

function preload()
{
    song1=loadSound("Butter.mp3");
    song2=loadSound("Dynamite.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    camera=createCapture(VIDEO);
    camera.hide();

    poseNet = ml5.poseNet(camera, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw()
{
    image(camera, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        fill("#800080");
        stroke("#FFC0CB");

        circle(left_wrist_x, right_wrist_y, 20);

        song1.stop();

        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Dynamite By BTS"
        }
    }

    if(scoreRightWrist > 0.2)
    {
        fill("#800080");
        stroke("#FFC0CB");

        circle(right_wrist_x, right_wrist_y, 20);

        song2.stop();

        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Butter By BTS"
        }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log("poseNet is initialized successfully");
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ right_wrist_y);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ left_wrist_y);
  }
} 