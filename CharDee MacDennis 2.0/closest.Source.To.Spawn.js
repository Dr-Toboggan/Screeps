var closestSourceToSpawn = {


     run: function(room1Obj, spawnsRoom1) {
          
          let sourcesTest = room1Obj.find(FIND_SOURCES);
          let j = 0;
          for(let i = sourcesTest.length; i > 0; i--) {
               let closestIndex = sourcesTest.indexOf(spawnsRoom1[0].pos.findClosestByPath(sourcesTest));
               let closestSource = sourcesTest.splice(closestIndex, 1);
               //console.log(closestSource[0].id);
               room1Obj.memory['closestSource' + j.toString()] = closestSource[0].id;
               j++;
          }
     }
};


module.exports = closestSourceToSpawn;
