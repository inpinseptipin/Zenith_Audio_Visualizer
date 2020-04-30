/* ------------------------------------Global Variables------------------------------*/

let soundFile,reverb,amp;
var volumeSlider;
var reverbSlider;
var progressSlider;
var panSlider;
var progressValue=0;
var fileName="../res/tracks/Quarantine.mp3";
var visualizerType=1;
var x=0;

/* ------------------------------------Pre Load Functions , Loads the Sound File before GUI------------------------------*/
function preload()
{
	if(fileName==null)
	{
		alert("Press Okay and Click on Upload to Choose a File");
	}
	else
	{
		soundFile=loadSound(fileName);	
	}
}

function windowResized()
{
	resizeCanvas(windowWidth,windowHeight);
}

/* ------------------------------------Setup , Setups the GUI------------------------------*/
function setup()
{
	
	var height=windowHeight/2;
	var width=windowWidth;
	var cnv=createCanvas(windowWidth,height);

/* ------------------------------------Sound Effects------------------------------*/	
	reverb=new p5.Reverb();
	amp=new p5.Amplitude(); 
	soundFile.disconnect();
	reverb.process(soundFile,3,2);

/* ------------------------------------Buttons------------------------------*/

	play=createButton("Play");
	pause=createButton("Pause");
	stop=createButton("Stop");

/* ------------------------------------Sliders------------------------------*/	
	volumeSlider=createSlider(0,1,0.5,0.01);
	reverbSlider=createSlider(0,1,0,0.1);
	progressSlider=createSlider(0,soundFile.duration(),0,10);
	panSlider=createSlider(-1,1,0,0.1);

/* ------------------------------------DropDowns------------------------------*/
	visualizer=createSelect();
	initVisualizer();

/* ------------------------------------Button Positioning------------------------------*/
	play.position(10,height);
	pause.position(60,height);
	stop.position(120,height);

/* ------------------------------------Slider Variables------------------------------*/
	volumeSlider.position(180,height);
	reverbSlider.position(350,height);
	progressSlider.position(10,height-80);
	panSlider.position(180,height+80);

/* ------------------------------------DropDown Positioning------------------------------*/	
	visualizer.position(500,height);

	
/* ------------------------------------Event Triggers------------------------------*/	
	while(!soundFile.isLoaded())
	{
		alert("Still Loading");
	}
	play.mousePressed(playSong);
	stop.mousePressed(stopSong);
	pause.mousePressed(pauseSong);	
}

/* ------------------------------------Draw , runs Infinitely------------------------------*/

function draw()
{
/* ------------------------------------Sets Background------------------------------*/

	background(0,0,0);
	fill(255,255,255);

/* ------------------------------------Text Elements------------------------------*/
	
	text('Volume Control',volumeSlider.x-10,volumeSlider.y-30);
	text('Reverb Control',reverbSlider.x-10,reverbSlider.y-30);
	text('Select Visualizer',visualizer.x-10,visualizer.y-30);
	text('Pan Control',panSlider.x-10,panSlider.y-30);
	var current=computeCurrentTime();
	text(current,progressSlider.x,progressSlider.y-30);	

/* ------------------------------------Retrieves Slider Value------------------------------*/

	soundFile.setVolume(volumeSlider.value());
	reverb.drywet(reverbSlider.value());
/* ------------------------------------Function Calls------------------------------*/	
	checkVisualizer();
	jumpSong();
	panSong();
		
/* ------------------------------------Visualizer Drawing------------------------------*/

	var vol=amp.getLevel();

	var diameter=map(vol,0,0.2,0,height);

	var meter=map(vol,0,0.2,0,360);
	

	if(visualizerType==1)
	{
		fill(random(255),0,random(255));
		ellipse(width/2+width/4,height/2,diameter,diameter);
		fill(random(255),random(255),0);
		ellipse(width/2+width/4,height/2,diameter/2,diameter/2);	
	}
	else if(visualizerType==2)
	{
		fill(255,255,255);
		angle=360/meter;
		ellipse(width/2+width/4,height/2,200,200);
	}	
}
	
function computeCurrentTime()
{
	var minute=parseInt(soundFile.currentTime()/60);
	var second=(soundFile.currentTime()-minute*60).toFixed(2);
	var x= minute + ":" + second
	return x;
}

function panSong()
{
	soundFile.pan(panSlider.value());
}	
function playSong()
{
	if(x==0)
	{
		soundFile.play();
		x=1;	
	}
}

function stopSong()
{
	if(x==1)
	{
		soundFile.stop();
		x=0;	
	}
}

function pauseSong()
{
	if(x==1)
	{
		soundFile.pause();
		x=0;	
	}
}

function jumpSong()
{
	if(progressSlider.value()!=progressValue)
	{
		progressValue=progressSlider.value();
		soundFile.jump(progressValue);	
	}
	
}

function initVisualizer()
{
	visualizer.option("Bullseye");
	visualizer.option("2");
	visualizer.option("3");
}

function checkVisualizer()
{
	if(visualizer.value()=="Bullseye")
		visualizerType=1;
	else if(visualizer.value()=="2")
		visualizerType=2;
	else if(visualizer.value()=="3")
		visualizerType=3;
}



