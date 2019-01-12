var roleGopher = {
		/** @param {Creep} creep **/
    run: function(creep) {
    
    		var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }});
        //if gopher not full of energy, move to container and withdraw full capacity
        if(creep.carry.energy == 0) {
            var containersWithEnergy = creep.room.find(FIND_STRUCTURES, {filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0});
                if(creep.withdraw(containersWithEnergy[0], RESOURCE_ENERGY, [creep.carryCapacity - creep.carry.energy]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containersWithEnergy[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
        } 
        else {
            
          if(targets.length) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
            
        else {
            creep.moveTo(Game.flags.Flag3);
            }
        }
		}
};

module.exports = roleGopher;