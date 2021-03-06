var sourceEnd = {

	
  run: function() {

    //Algorithm (or is it?) to find path between spawn and sources in each room and set source endpoint in memory
    //find sources and spawns in each "owned" room
    for (let name in Game.rooms) {
      let currentRoom = Game.rooms[name];
      let sources = currentRoom.find(FIND_SOURCES);
      let spawns = currentRoom.find(FIND_MY_SPAWNS);

      //for each source, find the optimal path from spawn to source, then set endpoint in memory
      for (let i = 0; i < sources.length; i++) {
        //PathFiner.search(start pos, end object with range, [opts]), creates object with path and other values
        let paths = PathFinder.search(spawns[0].pos, { pos: sources[i].pos, range: 1 });
        let cost = paths.cost;
        //set endpoint to last coordinate in object, adjacent to source
        let endpoint = paths.path[cost - 1];

        //depending on where we're at in the loop, set room/source memory to the endpoint (may need to stringify this??)
        if(i == 0) {
          currentRoom.memory.source0 = endpoint;
        }
        else if(i == 1) {
          currentRoom.memory.source1 = endpoint;
        }
        else if(i == 2) {
          currentRoom.memory.source2 = endpoint;
        }
      }
    }
  }
};

module.exports = sourceEnd;
