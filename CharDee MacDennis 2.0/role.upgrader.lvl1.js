var roleUpgraderLvl1 = {
     run: function(upgraders, sourcesRoom1) {
          for (let j = 0; j < upgraders.length; j++) {
               if(upgraders[j].memory.upgrading && upgraders[j].carry.energy == 0) {
                   upgraders[j].memory.upgrading = false;
                   upgraders[j].say('mining');
               }
               if(!upgraders[j].memory.upgrading && upgraders[j].carry.energy == upgraders[j].carryCapacity) {
                   upgraders[j].memory.upgrading = true;
                   upgraders[j].say('upgrading');
               }

               if(upgraders[j].memory.upgrading) {
                   if(upgraders[j].upgradeController(upgraders[j].room.controller) == ERR_NOT_IN_RANGE) {
                       upgraders[j].moveTo(upgraders[j].room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                   }
               }
               else {
                   if(upgraders[j].harvest(sourcesRoom1[j]) == ERR_NOT_IN_RANGE) {
                       upgraders[j].moveTo(sourcesRoom1[j], {visualizePathStyle: {stroke: '#ffaa00'}});
                   }
               }
          }
     }
};

module.exports = roleUpgraderLvl1;
