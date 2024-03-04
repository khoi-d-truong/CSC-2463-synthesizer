//Creating a synth and connecting it to the distortion
let synth = new Tone.PolySynth(Tone.Synth);
let dist = new Tone.Distortion(.3);
synth.connect(dist);
dist.toDestination();

//A variable for the background color
//to change whenever the distortion is turned on or off
let backgroundVal = '#fff';

//A piano to act as a visual guide
//shows what keys play what notes
let piano;


//What keyboard input will play what notes
let notes = {
  'q' : 'C4',
  'w' : 'D4',
  'e' : 'E4',
  'r' : 'F4',
  't' : 'G4',
  'y' : 'A4',
  'u' : 'B4',
  'i' : 'C5',
}

function setup() 
{
  createCanvas(600, 400);

  //A button to set the distortion to max
  distButton = createButton ('Activate Distortion');
  distButton.position (100,300);
  distButton.mousePressed(() => dist.distortion = 1);

  //A button to reset the distortion
  nodistButton = createButton('Turn off distortion');
  nodistButton.position (400,300);
  nodistButton.mousePressed(() => dist.distortion = 0.1);

  //An array of the available keys
  piano = [
    new PianoKey (100,50,'C4','q'),
    new PianoKey (150,50,'D4','w'),
    new PianoKey (200,50,'E4','e'),
    new PianoKey (250,50,'F4','r'),
    new PianoKey (300,50,'G4','t'),
    new PianoKey (350,50,'A4','y'),
    new PianoKey (400,50,'B4','u'),
    new PianoKey (450,50,'C5','i')
  ]
}

//Plays the note on key press
function keyPressed()
{
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
}

//Stops the note on key release
function keyReleased()
{
  let playNotes = notes[key];
  synth.triggerRelease(playNotes, '+0.03');
}


function draw() 
{
  //Setting background color
  background(backgroundVal);

  //Checking distortion value to see if the button was pressed
  if (dist.distortion > 0.5)
    backgroundVal = '#fae';
  else
    backgroundVal = '#fff';

  //The frame of the piano
  strokeWeight(4);
  rect(100,50,400,200);

  //Drawing the keys
  for (let i = 0; i < piano.length; i++)
    piano[i].draw();
}

//Class for drawing the keys on the piano
class PianoKey
{
  constructor(x,y,note,keyNote)
  {
    this.x = x;
    this.y = y;
    this.note = note;       //The actual note
    this.keyNote = keyNote; //The keyboard input for the note
  }

  //Draws a rectangle and the two notes as text objects
  draw()
  {
    push();
    rect(this.x,this.y,50,200);
    textSize(18);
    textAlign(CENTER)
    text( this.keyNote, this.x+25,this.y+20);
    text( this.note, this.x+25, this.y+190);
    pop();
  }


}