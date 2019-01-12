var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleGopher  = require('role.gopher');

module.exports.loop = function () {

    //var controller1 = Game.getObjectById('5bbcad9f9099fc012e637870');
    //var controller2 = Game.getObjectById('5bbcad8d9099fc012e6376ee');
    //Game.creeps.Rogue1.reserveController(controller2);
    //Game.creeps.Rogue1.signController(controller2, '...');
    //Game.creeps.Rogue1.moveTo(Game.flags.Flag2);


    var tower = Game.getObjectById('5bc3d53a2183d2326fc8d930');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    var tower2 = Game.getObjectById('5bc98c276d6ae257769d27c3');
    if(tower2) {
        var closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower2.repair(closestDamagedStructure);
        }

        var closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower2.attack(closestHostile);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

    var gophers = _.filter(Game.creeps, (creep) => creep.memory.role == 'gopher');

    if(harvesters.length < 0) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    if(builders.length < 0) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'builder'}});
    }

    if(upgraders.length < 4) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }

    if(miners.length < 1) {
        var newName = 'Miner' + Game.time;
        console.log('Spawning new miner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], newName, //does miner need carry if dumping into container?
            {memory: {role: 'miner'}});
    }

    if(gophers.length < 3) {
        var newName = 'Gopher' + Game.time;
        console.log('Spawning new gopher: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'gopher'}});
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
	    if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'gopher') {
            roleGopher.run(creep);
        }
    }
}
