import { server } from './src/index';
import { PORT } from './src/utils/utils';
import 'dotenv/config'

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));