import server from './server.js';
import routes from './routes.js';

const PORT = process.env.PORT || 3000;

server.on('request', routes);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
