const data = require('./data/data');
const _ = require('lodash');

generateMultiVariant(data);
function generateMultiVariant(data){
    data = truthy(data);
    let total = _.reduce(data,(total,key)=>{
        return total*key.length;
    },1)
    let output = cartesianProductOf(data);
    let result = _.map(output, function(item){
        var newObject = {};
        _.each(item, (eachComponent)=>{
            _.each(eachComponent, (value, key)=>{
                newObject[key] = value;
            })
        })
        return newObject;
    })

    return {
        count: total,
        result
    };
}

function cartesianProductOf(data) {
    return _.reduce(data, function(a, b, index) {
        return _.flatten(_.map(a, function(x) {
            return _.map(b, function(y) {
                return x.concat({[index] :y});
            });
        }), true);
    }, [ [] ]);
};

function truthy(obj) {
    for (var i in obj) {
      if (!obj[i][0]) {
        delete obj[i];
      }
    }
    return obj;
  };