const redis = require('redis');
var client= redis.createClient(6379,'172.23.238.210');

module.exports = function updateStage(jobId,stageName,stageData,done){
  client.hmset(jobId+'_stages',stageName,stageData,done);
}
