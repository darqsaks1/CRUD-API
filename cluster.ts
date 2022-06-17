import { server } from './src/index';
import { PORT } from './src/utils/utils';
import { cpus } from 'os';
import * as notReallyCluster from 'cluster';
const cluster = notReallyCluster as unknown as notReallyCluster.Cluster;
const numCPUs = cpus().length;
if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
} else {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log(`Worker ${process.pid} started`);

}