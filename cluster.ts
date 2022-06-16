import cluster from 'cluster';
import { server } from './src/index';
import { PORT } from './src/utils/utils';
import { cpus } from 'os';
const numCPUs = cpus().length;
if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}