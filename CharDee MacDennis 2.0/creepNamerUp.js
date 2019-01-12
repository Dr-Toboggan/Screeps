var creepNameUp = {


     run: function(room1Obj) {

         let regex = /Upgrader/;
         let creepArr = room1Obj.find(FIND_MY_CREEPS);
         let upgradeArr = _.filter(creepArr, function(x) { return regex; });
         let numArr = [];

         for(let i = 0; i < upgradeArr.length; i++) {
              //grab the first number in the string and add it to numArr;
              numArr[i] = upgradeArr[i].name.slice(9, 10);
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

module.exports = creepNameUp;
