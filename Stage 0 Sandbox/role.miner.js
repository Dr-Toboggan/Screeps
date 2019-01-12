var roleMiner = {
  run: function(miners) {

    var sources = miners[0].room.find(FIND_SOURCES);

    if(sources.length == 1 && miners.length == 1) {
      if(miners[0].harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        miners[0].moveTo(miners[0].room.memory.source0.x, miners[0].room.memory.source0.y, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
    else if(sources.length == 2) {
      if(miners[0].harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        miners[0].moveTo(miners[0].room.memory.source0.x, miners[0].room.memory.source0.y, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
      if(miners[1].harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        miners[1].moveTo(miners[1].room.memory.source1.x, miners[1].room.memory.source1.y, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
    else if(sources.length == 3) {
      if(miners[0].harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        miners[0].moveTo(miners[0].room.memory.source0.x, miners[0].room.memory.source0.y, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
      if(miners[1].harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        miners[1].moveTo(miners[1].room.memory.source1.x, miners[1].room.memory.source1.y, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
      if(miners[2].harvest(sources[2]) == ERR_NOT_IN_RANGE) {
        miners[2].moveTo(miners[2].room.memory.source2.x, miners[2].room.memory.source2.y, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
};

module.exports = roleMiner;
