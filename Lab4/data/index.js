const data = require("./peopleData")
const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

function idExists(datas,id){
    for(let key in datas.data){
        if(datas.data[key].id==Number(id)){
            return datas.data[key];
        }else{
            continue;
        }
    }
    return false;
}

async function addEntryToRedis(id, entry){
    //checking the redis request on each request just to be on the safe side
    client.on('connect', function() {
        console.log('Redis client connected');
    });
    
    client.on('error', function (err) {
        console.log('Something went wrong ' + err);
    });    
    //we need id and entry, remember to not throw as null and the entry should be the object itself
    let ifIdinCache = await client.getAsync(id);
    let object;
    if(!ifIdinCache){
        client.set(id,JSON.stringify(entry),redis.print);
        //also adding that to history by using lpush
        client.lpush("history",JSON.stringify(entry))
    }
    //else getting it from cache itself
    object = await client.getAsync(id);
    return object;
}
const getById=(id)=>{
    if(id){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(idExists(data,id)){
                    //if it resolves then we need to add it to the cache straight by reading the array with index-1
                    resolve(
                        addEntryToRedis(id,data.data[id-1])
                    );
                }else{
                    reject(new Error("Couldn't locate the id"));
                }
            },5000);
        })
    }
};
module.exports = getById