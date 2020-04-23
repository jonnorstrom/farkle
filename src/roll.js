export default function Roll(roll) {
  this.roll = roll
  this.score = 0

  this.getScore = function() {
    var valueOccurancesObj = {};

    for (var i = 0; i < roll.length; i++) {
      var num = roll[i];
      valueOccurancesObj[num] = valueOccurancesObj[num] ? valueOccurancesObj[num] + 1 : 1;
    }

    let straight = [1,1,1,1,1,1]
    let fullHouse = [2,4]
    let doubles = [2,2,2]
    let triples = [3,3]

    let rollArr = function() {
      return Object.values(valueOccurancesObj)
    }

    // 6 of a kind
    if (rollArr().includes(6)) {
      this.score += 3000
      valueOccurancesObj = {}
    }

    // stright
    if (this.arraysEqual(rollArr(), straight)) {
      this.score += 1500
      valueOccurancesObj = {}
    }

    // doubles
    if (this.arraysEqual(rollArr(), doubles)) {
      this.score += 1500
      valueOccurancesObj = {}
    }

    // triples
    if (this.arraysEqual(rollArr(), triples)) {
      this.score += 2500
      valueOccurancesObj = {}
    }

    // full house
    if (this.arraysEqual(rollArr(), fullHouse)) {
      this.score += 1500
      valueOccurancesObj = {}
    }

    if (Object.keys(valueOccurancesObj).length > 0) {
      let skip4 = false
      let skip3 = false

      // 5 of a kind
      if (rollArr().includes(5)) {
        this.score += 2000
        this.deleteByValue(5, valueOccurancesObj)
        skip3, skip4 = true, true
      }
    
      // 4 of a kind
      if (rollArr().includes(4)  && !skip4) {
        this.score += 1000
        this.deleteByValue(4, valueOccurancesObj)
        skip3 = true
      }
    
      // triples
      if (rollArr().includes(3) && !skip3) {
        for(key in valueOccurancesObj) {
          if(valueOccurancesObj[key] == 3) {
            if (key == 1) {
              this.score += 300
            } else {
              this.score += (key * 100)
            }
    
            this.deleteByValue(3, valueOccurancesObj)
          }
        }
      }
    
      if (Object.keys(valueOccurancesObj).length > 0) {
        // 1s and 5s
        for(var key in valueOccurancesObj) {
          if (key == 1) {
            this.score += (100 * valueOccurancesObj[key])
          }
      
          if (key == 5) {
            this.score += (50 * valueOccurancesObj[key])
          }
        }
      }
    }
    return this.score
  }

  this.deleteByValue = function(val, object) {
    for(var key in object) {
      if(object[key] == val) {
        delete object[key];
      }
    }
  }
  
  this.arraysEqual = function(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
  
    a.sort()
    b.sort()
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}