define(function(){
    var addResultSet = function (json, name, data) {
        if (data.type == 'humanneeded') {
            var datacount = 0;	
        }
        else if (data.type == 'failure') {
            var datacount = data.data.length;
        }
        if (json[name]) {
            json[name].data.push(data);
            json[name].datacount += datacount;
        }
        else {
            json[name] = {
                data: [data],
                datacount: datacount
            }	
        }
    }

    return addResultSet;

})