const {showCacheData} = require("../controllers/cacheController");

exports.monitorProcessStats = (req, res) => {
    //TODO: Solve this Socket.io problem and test with React JS

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('X-Accel-Buffering', 'no');

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

        const stats_data = {
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
        }

        res.write(JSON.stringify(stats_data));

        // Set interval to send SSE heartbeat every 5 seconds
        const interval = setInterval(() => {
            res.write(JSON.stringify(stats_data));
        }, 1000);

        // Clean up on client disconnect
        req.on('close', () => {
            clearInterval(interval);
        });

    } catch (error) {
        res.status(404).json({code: 404, errorMessage: error});
    }
};
