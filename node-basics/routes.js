const fs = require('fs');
const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    console.log(url, method);
    if(url === '/')
    {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Node Basics</title></head>');
        res.write('<body><h1>Welcome to node!</h1><form method="POST" action="create-user"><input type="text" name="message"><button Type="submit">Create</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    else if(url === '/users')
    {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Node Users List</title></head>');
        res.write('<body><h1>Users</h1><ul><li>User 1</li><li>User 2</li></ul></body>');
        res.write('</html>');
        return res.end();
    }
    else if(url === '/create-user' && method === 'POST')
    {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log('body: ', parseBody);
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, (er) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
        
        console.log()
    }
}

module.exports = {
    requestHandler
};