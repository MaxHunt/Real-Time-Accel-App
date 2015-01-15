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
var AxisDisplay = new UI.Text({ position: new Vector2(0,0), size: new Vector2(144, 168) });

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
   console.log("Entered Tracker");   
   Accel.peek(onPeek);
}

function onPeek(e) {
   console.log('Current acceleration on axis are: X=' + e.accel.x + ' Y=' + e.accel.y + ' Z=' + e.accel.z);     
   AxisDisplay.text('Snapshot of acceleration on axis is: X=' + e.accel.x + ' Y=' + e.accel.y + ' Z=' + e.accel.z);
   try{
      AccelerometerScreen.hide();
      console.log("WindowRefreshed");
   }catch(err){
      console.log(err);
      console.log("First Time in Screen");
   }     
   AccelerometerScreen.insert(0,AxisDisplay);
   AccelerometerScreen.show();
}