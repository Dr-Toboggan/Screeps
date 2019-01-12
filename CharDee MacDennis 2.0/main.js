let sourceEnd = require('sourceEndpoint');
let roomSet = require('roomSetter');
let creepNameHarv  = require('creepNamerHarv');
let creepNameUp = require('creepNamerUp');
let roleHarvesterLvl1 = require('role.harvester.lvl1');
let roleUpgraderLvl1 = require('role.upgrader.lvl1');
let closestSourceToSpawn = require('closest.Source.To.Spawn');

module.exports.loop = function () {

     //for custom Sim room, run sourceEnd at start, and any time another
     //source is added
     //sourceEnd.run();


     //an array for all room names
     let roomsArr = Object.keys(Game.rooms);





     //start of game, first room name gets set in memory to room1, length to 1,
     //and set source endpoints in memory
     if(roomsArr.length == 1 && !Memory.rooms.room1) {
          Memory.rooms.room1 = roomsArr[0];
          Memory.rooms.length = 1;
          console.log("First room claimed!");
          sourceEnd.run();
     }
     //each time owned rooms increases, set room, length, and source endpoints
     else if(roomsArr.length != Memory.rooms.length) {
          roomSet.run(roomsArr);
          sourceEnd.run();
     }

     //a variable for the first room object - Need to set room2 later.
     let room1Obj = Game.rooms[Memory.rooms.room1];
     //an array of sources in first room
     let sourcesRoom1 = room1Obj.find(FIND_SOURCES);
     //an array of spawns in first room
     let spawnsRoom1 = room1Obj.find(FIND_MY_SPAWNS);
     //room energy values
     let engAvail = room1Obj.energyAvailable;
     let capAvail = room1Obj.energyCapacityAvailable;
     //arrays for various creep roles
     let miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
     let gophers = _.filter(Game.creeps, (creep) => creep.memory.role == 'gopher');
     let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
     let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
     let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

     //if the first spawn is present and closest sources haven't been found yet, run the script
     if(spawnsRoom1[0] && !room1Obj.memory.closestSource0) {
          closestSourceToSpawn.run(room1Obj, spawnsRoom1);
     }



     //for room level 1, spawn harvesters/upgraders, and get the room upgraded as quickly as possible
     if(room1Obj.controller.level <= 1) {
          if(harvesters.length < 2) {
               let creepNum = creepNameHarv.run(room1Obj);
               spawnsRoom1[0].spawnCreep([WORK,WORK,CARRY,MOVE], 'Harvester.' + creepNum + Game.time, { memory: {role: 'harvester'}});
          }
          else if(upgraders.length < 2) {
               let creepNum = creepNameUp.run(room1Obj);
               spawnsRoom1[0].spawnCreep([WORK,WORK,CARRY,MOVE], 'Upgrader.' + creepNum + Game.time, { memory: {role: 'upgrader'}});
          }

          if(harvesters.length > 0) {
               roleHarvesterLvl1.run(harvesters, sourcesRoom1);
          }
          if(upgraders.length > 0) {
               roleUpgraderLvl1.run(upgraders, sourcesRoom1);
          }
     }






     else if(room1Obj.controller.level == 2) {
          if(harvesters.length < sourcesRoom1.length) {
               let creepNum = creepNameHarv.run(room1Obj);
               spawnsRoom1[0].spawnCreep([WORK,WORK,CARRY,MOVE], 'Harvester.' + creepNum + Game.time, { memory: {role: 'harvester'}});
          }
          else if(upgraders.length < sourcesRoom1.length) {
               let creepNum = creepNameUp.run(room1Obj);
               spawnsRoom1[0].spawnCreep([WORK,WORK,CARRY,MOVE], 'Upgrader.' + creepNum + Game.time, { memory: {role: 'upgrader'}});
          }

          if(harvesters.length > 0) {
               roleHarvesterLvl1.run(harvesters, sourcesRoom1);
          }
          if(upgraders.length > 0) {
               roleUpgraderLvl1.run(upgraders, sourcesRoom1);
          }
     }





     else {
          if(miners.length < sourcesRoom1.length) {
               //need timer/memory feature here if(energy room.memory.last-tick == current energy) { increment room.memory.ticksStalled }
               if(engAvail > 300 && capAvail >= 800) {
                    let variable = 0;
                    spawnsRoom1[0].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], 'Miner' + variable + '_' + Game.time, { memory: {role: 'miner' }});
               }
               else {
                    let variable = 0;
                    spawnsRoom1[0].spawnCreep([WORK,WORK,CARRY,MOVE], 'Miner' + variable + '_' + Game.time, { memory: {role: 'miner' }});

                    //Dry run code that might be useful
                    //let spawnTest = spawnsRoom1[0].spawnCreep([WORK,WORK,CARRY,MOVE], 'Miner', { dryRun: true });
               }
          }
     }
}
