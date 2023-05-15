const {showCacheData} = require("../controllers/cacheController");

exports.monitorProcessStats = (req, res) => {
    try {
        const {rss, heapUsed, external} = process.memoryUsage();
        const {user, system} = process.cpuUsage();
        const uptime = process.uptime();
        const node_version = process.versions;
        const cpuArch = process.arch;
        const platform = process.platform;
        const title =  process.title;
        const pid = process.pid;
        const cacheSize = Buffer.from(JSON.stringify(showCacheData()));
        console.log(`Memory Usage --- RSS: ${rss / 1024} KB, Heap Used: ${heapUsed / 1024} KB, External: ${external / 1024} KB`);
        console.log(`Process Usage --- User: ${user} ms, System: ${system} ms, Uptime: ${uptime} s, PID: ${pid}`);
        res.status(300).jsonp({
            code: 300,
            System_Info: {
              System_Title: title,
              Node_Version: node_version.node,
              Platform: platform,
              CPU_Architecture: cpuArch,
            },
            Memory_Usage: {
                RSS: `${rss / 1024} KB`,
                Heap_Used: `${heapUsed / 1024} KB`,
                External: `${external / 1024} KB`,
            },
            Process_Usage : {
                User: `${user/1000} Second`,
                System: `${system/1000} Second`,
                UpTime: `${uptime} Second`,
                PID: `${pid}`,
            },
            Cache_Memory : {
                Size: cacheSize.byteLength + " bytes",
                Cache_Data: showCacheData(),
            }
        });
    } catch (error) {
        res.status(404).jsonp({code: 404, errorMessage: error});
    }
};
