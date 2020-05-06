# Documentation | Version 1.0
Zenith Audio Visualizer was made using HTML, CSS , JavaScript etc. The Documentation below discusses each and every element used in the program.  

## GUI WINDOW

The GUI Window is basically an HTML Canvas which can be created using the P5.js Function **createCanvas(Width,Height)**

Since its an HTML canvas, it can be customized using CSS.

## Sound Effects

**The Visualizer can impart sound effects to the playing song. These include**

Reverb : Reverb in psychoacoustics is the persistance of the sound after its done playing

Filter : Filter in Digital Sound modulates the sound played by cutting off the frequencies by filter type. For Example : A Low Pass Filter Cuts off frequencies above 1000Hz

Panning : Panning in Stereo Sound , Cuts off the signal to either left or right stero based on type. Usually Left Stereo is represented as -1 and Right Stereo is represented as 1

## Visualizers

### Bullseye
Bullseye consist of two concentric circles that vibrate based on amplitude of sound input. The circles change their color randomly with red being the dominant color.

## GUI CONTROLS
1. Sliders
2. DropDown Menus
3. Buttons
## 
### Sliders

Sliders can be created by using the function **createSlider(string)**

Example : volumeSlider=createSlider("Volume Slider")

**Volume | Variable Name = volumeSlider**

  This Slider takes into account the user input and adjusts the volume of the song being played.

        Max Value = 1.0

        Min Value = 0.0

        Default Value = 0.5
        
        Value Change Delta = 0.01
        
**Reverb | Variable Name = reverbSlider**

  This Slider takes into account the user input and adjusts the reverb of the song being played.

        Max Value = 1.0

        Min Value = 0.0

        Default Value = 0.0
        
        Value Change Delta = 0.1
        
**Song Progress | Variable Name = progressSlider**

  This Slider takes into account the user input and jumps to the part of the song being played.

        Max Value = Song Duration | in Seconds

        Min Value = 0

        Default Value = 0
        
        Value Change Delta = 10
        
**Panning | Variable Name = panSlider**

  This Slider takes into account the user input and adjusts the Panning of the song being played.

        Max Value = 1.0

        Min Value = -1.0

        Default Value = 0.0
        
        Value Change Delta = 0.1
        
## 
### DropDown Menus
Drop Down Menus can be created by using the function **createSelect(string)**

Example : visualizer=createSelect("Visualizer")

**Visualizer | Variable Name = visualizer**

  Consist of different Visualizer options
  Adding An option in the dropdown menu requires using the function option(<string>)
  
    Visualizer.option("None")
    

**Filter Menu | Variable Name = filterMenu**

  Consist of different Filter Options 
  Adding An option in the dropdown menu requires using the function option(<string>)
  
    filterMenu.option("Low Pass Filter")

## 
### Buttons

Buttons can be created using the function **createButton(string)**

    Example : play=createButton("Play")

Buttons can be set to call a function whenever they are pressed using the function           **mousePressed(function_name)**

    Example : play.mousePressed(playSong)

**Play | Variable Name = play**

The button when pressed , plays the song.

**Pause | Variable Name = pause**

The button when pressed , pauses the song.

**Stop | Variable Name = stop**

The button when pressed , stops the song and resets to 0.

## GUI STYLING ELEMENTS

1. Text

2. Progress Bar

##
### Text

Text can be written on the canvas using the function **createP(string)**

The text can be stylised using css. This can be done by defining a <div> class in the CSS file.

Then using the class(Class Name) , the button variable then will be linked to the defining CSS class.

**CSS Example:**

    .textElements
    {
      font-size:10pt;
      padding:2px;
      background-color:rgb(0,0,0);
      color:rgb(0,100,0);
    }
    
**JavaScript Snippet**

    volumeSliderText=createP("Volume Control");
    volumeSliderText.class("textElements");      


### Progress Bar

Progress Bar is a styling element that maps the current progress of the song and creates a rectangular bar. 

