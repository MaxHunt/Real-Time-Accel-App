/**
 * Welcome to Pebble.js!
 *
 * Constant updateing of Accelerometer Value. 
 * Monitors the Accelerometer in real time.
 * By Max Hunt - 609556
 * Date - 15/01/2015
 */

//include Accel Pebble Libary
var Accel = require('ui/accel');
//iniate acceleometer
Accel.init();
//include UI Pebble Libary
var UI = require('ui');
//get vector Pebble Libary
var Vector2 = require('vector2');
var AccelerometerScreen = new UI.Window();
//Elements for AccelermeterScreen
var AxisDisplayText = new UI.Text({ position: new Vector2(0,0), size: new Vector2(144, 168) });
var xAxisText = new UI.Text({ position: new Vector2(0,150), size: new Vector2(144, 168) });
var yAxisText = new UI.Text({ position: new Vector2(0,300), size: new Vector2(144, 168) });
var zAxisText = new UI.Text({ position: new Vector2(0,450), size: new Vector2(144, 168) });

var xAxis = 0;
var yAxis = 0;
var zAxis = 0;

var inAccelScreen = false;

//start App screen
var main = new UI.Card({   
   icon: 'images/menu_icon.png',
   subtitle: 'Real Time Tracking',
   body: 'Press the select button to go to start real time monitering.',
   scrollable: true
});

//start APP
console.log("App started");
main.show();
main.on('click', 'select', onClick);

function onClick(e) {
   inAccelScreen = true;
   console.log('Entered Tracker');
   AxisDisplayText.text('Real time acceleration');
   AccelerometerScreen.insert(0,AxisDisplayText);
   console.log("Enter Real Time Loop");
   AccelerometerScreen.show();
   AccelerometerScreen.on('click','select',onAccelSelect);
   while(inAccelScreen){ 
      Accel.peek(onPeek);            
   }  
}

//Close Screen and Stop loop
function onAccelSelect(){
   console.log('Close Screen and Stop Loop');
   inAccelScreen = false;
   AccelerometerScreen.hide();
}

//Get Values for Acelerometer
function onPeek(e){
   console.log('Peeking'); 
   xAxis = e.accel.x;
   yAxis = e.accel.y;
   zAxis = e.accel.z;
   insertElements();   
}

//Inseret onto screen
function insertElements() {  
   xAxisText.text('X Axis:' + xAxis);
   yAxisText.text('Y Axis:' + yAxis);
   zAxisText.text('Z Axis:' + zAxis);
   AccelerometerScreen.insert(1,xAxisText);
   AccelerometerScreen.insert(2,xAxisText);
   AccelerometerScreen.insert(3,xAxisText);   
}