var roleHarvesterLvl1 = {
     run: function(harvesters, sourcesRoom1, spawnsRoom1) {

          for (let j = 0; j < harvesters.length; j++) {
               if(harvesters[j].carry.energy < harvesters[j].carryCapacity) {
                    if(harvesters[j].harvest(sourcesRoom1[j]) == ERR_NOT_IN_RANGE) {
                         let conCat = 'source' + j.toString();
                         harvesters[j].moveTo(harvesters[j].room.memory[conCat].x, harvesters[j].room.memory[conCat].y, { visualizePathStyle : { stroke : '#ffaa00'}});
                    }
               }
               else {
                    var targets = harvesters[j].room.find(FIND_STRUCTURES, {
                         filter: (structure) => {
                              return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_CONTAINER) &&
                              structure.energy < structure.energyCapacity;
                         }
                    });
                    if(targets.length > 0) {
                         if(harvesters[j].transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                              harvesters[j].moveTo(targets[0], { visualizePathStyle : { stroke : '#ffffff'}});
                         }
                    }
                    else {
                         harvesters[j].moveTo(Game.flags.Flag3);
                    }
               }
          }
     }
};

module.exports = roleHarvesterLvl1;
