var creepNameHarv = {


     run: function(room1Obj) {

         let regex = /Harvester/;
         let creepArr = room1Obj.find(FIND_MY_CREEPS);
         let harvestArr = _.filter(creepArr, function(x) { return regex; });
         let numArr = [];
         
         for(let i = 0; i < harvestArr.length; i++) {
              //grab the first number in the string and add it to numArr;
              numArr[i] = harvestArr[i].name.slice(10, 11);
         }
         if(numArr == []) {
              return '0';
         }
         else if(!numArr.includes('0')) {
              return '0';
         }
         else if(!numArr.includes('1')) {
              return '1';
         }
         else if(!numArr.includes('2')) {
              return '2';
         }
         else if(!numArr.includes('3')) {
              return '3';
         }
    }
};

module.exports = creepNameHarv;
