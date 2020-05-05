/* ------------------------------------Global Variables------------------------------*/

let soundFile,reverb,amp,filter;
let volumeSliderText,reverbSliderText,progressSliderText,panSliderText;
var volumeSlider,reverbSlider,progressSlider,panSlider,filterMenu,filterToggle,initTextToggle,progressValue,visualizerType,x,vol; 

var fileName="../res/tracks/Quarantine.mp3";

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
	initTextToggle=false;
	visualizerType=1;
	progressValue=0;
	filterToggle=1;
	x=0;
}


/**************************************************************************************************************************/

/* ------------------------------------Setups the GUI , Loads Essential Sound Effects and UI Controls------------------------------*/
function setup()
{
	
	var width=windowWidth;
	var cnv=createCanvas(800,400);
	cnv.parent('visualizer');
	
/* ------------------------------------Sound Effects------------------------------*/	
	reverb=new p5.Reverb();
	amp=new p5.Amplitude(); 
	filter=new p5.Filter();
	soundFile.disconnect();
	reverb.process(soundFile,3,2);
	filter.process(soundFile);
	
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
	filterMenu=createSelect();
	initMenu();

/* ------------------------------------ Button Positioning ------------------------------*/
	play.position(width/32,height+height/4);
	pause.position(width/16+width/256,height+height/4);
	stop.position(width/8-width/64,height+height/4);

/* ------------------------------------ Slider Variables ------------------------------*/
	progressSlider.position(width/8+width/32,height+height/4);
	volumeSlider.position(width/8+width/32,height+height/2);
	reverbSlider.position(width/4+width/64,height+height/2);
	panSlider.position(width/4+width/8,height+height/2);
	
/* ------------------------------------ DropDown Positioning ------------------------------*/	
	visualizer.position(width/4+width/64,height+height/4);
	filterMenu.position(width/4+width/8,height+height/4);

	
/* ------------------------------------ Event Triggers ------------------------------*/	
	while(!soundFile.isLoaded())
	{
		alert("Still Loading");
	}
	play.mousePressed(playSong);
	stop.mousePressed(stopSong);
	pause.mousePressed(pauseSong);	
}

/* **************************************** DRAW FUNCTION *****************************/

function draw()
{
	
	
	fill(255,255,255);
/* ------------------------------------Text Elements------------------------------*/
	
	initTextElements();
	var current=computeCurrentTime();
	text(current,progressSlider.x,progressSlider.y);	

/* ------------------------------------Retrieves Slider Value------------------------------*/

	soundFile.setVolume(volumeSlider.value());
	reverb.drywet(reverbSlider.value());
/* ------------------------------------Function Calls------------------------------*/	
	
	checkVisualizer();
	jumpSong();
	panSong()
	filterSound();
		
/* ------------------------------------Animation Function Calls------------------------------*/

	Visualizer();
	progressBar();
}

/* ************************************ANIMATIONS FUNCTION DEFINITIONS************************/

/* ------------------------------------Initialize Text Elements------------------------------*/

function initTextElements()
{
	if(initTextToggle==false)
	{
		volumeSliderText=createP("Volume Control");
		volumeSliderText.position(volumeSlider.x,volumeSlider.y+height/16);
		volumeSliderText.class("textElements");

		reverbSliderText=createP("Reverb Control");
		reverbSliderText.position(reverbSlider.x,reverbSlider.y+height/16);
		reverbSliderText.class("textElements");

		progressSliderText=createP("Progress Jump Control");
		progressSliderText.position(progressSlider.x,progressSlider.y+height/16);
		progressSliderText.class("textElements");

		panSliderText=createP("Pan Control");
		panSliderText.position(panSlider.x,panSlider.y+height/16);
		panSliderText.class("textElements");
				

		initTextToggle=true;
	}
}
/* ------------------------------------Initialize Menus------------------------------*/
function initMenu()
{
	visualizer.option("Bullseye");
	visualizer.option("2");
	visualizer.option("3");

	filterMenu.option("None");
	filterMenu.option("Low Pass Filter");
	filterMenu.option("Band Pass Filter");
	filterMenu.option("High Pass Filter");
}
/* ------------------------------------Progress Animation------------------------------*/
function progressBar()
{
	fill(0,100,0);
	var progress=map(soundFile.currentTime(),0,soundFile.duration(),0,width);
	rect(0,(0.95)*height,progress,width/32);	
}

/* ------------------------------------Visualizer------------------------------*/

function checkVisualizer()
{
	if(visualizer.value()=="Bullseye")
		visualizerType=1;
	else if(visualizer.value()=="2")
		visualizerType=2;
	else if(visualizer.value()=="3")
		visualizerType=3;
}

function Visualizer()
{
	vol=amp.getLevel();
	if(visualizerType==1)
	{
		bullseye();
	}
	else if(visualizerType==2)
	{
		background(0,0,0);
		fill(255,255,255);
		angle=360/meter;
		ellipse(width/2+width/4,height/2,200,200);
	}

}

/* ------------------------------------Visualizer 1 : Bullseye------------------------------*/


function bullseye()
{
	background(0,0,0);
	var diameter=map(vol,0,0.2,0,height);
	fill(random(255),0,random(255));
	ellipse(width/2,height/2,diameter,diameter);
	fill(random(255),random(255),0);
	ellipse(width/2,height/2,diameter/2,diameter/2);		
}

/* ------------------------------------Visualizer 2 : Bullseye------------------------------*/



/* ------------------------------------Current Time Element------------------------------*/
	
function computeCurrentTime()
{
	var minute=parseInt(soundFile.currentTime()/60);
	var second=(soundFile.currentTime()-minute*60).toFixed(2);
	var x= minute + ":" + second
	return x;
}

/* **************************************SOUND EFFECTS*****************************************/

function panSong()
{
	soundFile.pan(panSlider.value());
}	


function filterSound()
{
	if(filterMenu.value()=="Low Pass Filter")
	{
		filter.setType("lowpass");
		filterToggler(true);
	}
	if(filterMenu.value()=="Band Pass Filter")
	{
		filter.setType("bandpass");
		filterToggler(true);		
	}
	if(filterMenu.value()=="High Pass Filter")
	{
		filter.setType("highpass");
		filterToggler(true);
	}
	if(filterMenu.value()=="None")
	{
		filterToggler(false); 
	}	

}



/* ------------------------------------Play : Pause : Stop Song------------------------------*/
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
		progressBar();
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

function filterToggler(x)
{
	if(x==true)
	{
		if(filterToggle==0)
		{
			filter.toggle();
			filterToggle=1;
		}
	}
	else
	{
		if(filterToggle==1)
		{
			filter.toggle();
			filterToggle=0;	
		}
	}
}
