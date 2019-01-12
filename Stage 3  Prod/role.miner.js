var roleMiner = {

	/** @param {Creep} creep **/
    run: function(creep) {
		//Find source, start harvesting, or move there if not in range
		var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = roleMiner;