import { readFile, writeFile } from 'fs/promises';
import { URL } from 'url';

const dataFile = './data.json';

const routes = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;

  if (url.pathname === '/tasks' && method === 'GET') {
    try {
      const data = await readFile(dataFile, 'utf-8');
      const tasks = JSON.parse(data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tasks));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  } else if (url.pathname === '/tasks' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const newTask = JSON.parse(body);
        const data = await readFile(dataFile, 'utf-8');
        const tasks = JSON.parse(data);
        newTask.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
        tasks.push(newTask);
        await writeFile(dataFile, JSON.stringify(tasks, null, 2));
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTask));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
    });
  } else if (url.pathname.startsWith('/tasks/') && method === 'PUT') {
    const id = parseInt(url.pathname.split('/')[2]);
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const updatedTask = JSON.parse(body);
        const data = await readFile(dataFile, 'utf-8');
        const tasks = JSON.parse(data);
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Task not found' }));
        } else {
          tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
          await writeFile(dataFile, JSON.stringify(tasks, null, 2));
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(tasks[taskIndex]));
        }
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
    });
  } else if (url.pathname.startsWith('/tasks/') && method === 'DELETE') {
    const id = parseInt(url.pathname.split('/')[2]);
    try {
      const data = await readFile(dataFile, 'utf-8');
      let tasks = JSON.parse(data);
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex === -1) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Task not found' }));
      } else {
        tasks = tasks.filter(task => task.id !== id);
        await writeFile(dataFile, JSON.stringify(tasks, null, 2));
        res.writeHead(204);
        res.end();
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
};

export default routes;

