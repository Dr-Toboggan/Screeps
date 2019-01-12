var roomSet = {

     run: function(roomsArr) {
     //Note: the code in this script hasn't been fully tested and may have catastrophic failures. Test once new rooms are acquired
          //once second room is visible (either creep enters room, or structure is controlled)
          //get index of room1 and splice it out of the array so you can easily set room2.
          if(roomsArr.length == 2 && !Memory.rooms.room2) {
               let indexPos0 = roomsArr.indexOf(Memory.rooms.room1);
               roomsArr.splice(indexPos0, 1);
               Memory.rooms.room2 = roomsArr[0];
               Memory.rooms.length = 2;
               console.log("Second room claimed!");
          }
          else if(roomsArr.length == 3 && !Memory.rooms.room3) {
               let indexPos0 = roomsArr.indexOf(Memory.rooms.room1);
               roomsArr.splice(indexPos0);
               let indexPos1 = roomsArr.indexOf(Memory.rooms.room2);
               roomsArr.splice(indexPos1);
               Memory.rooms.room3 = roomsArr[0];
               Memory.rooms.length = 3;
               console.log("Third room claimed!");
          }
          else if(roomsArr.length == 4 && !Memory.rooms.room4) {
               console.log("do something for fourth room in roomSetter.js");
          }
     }
};

module.exports = roomSet;
