require('./class')
const app = require('./app');

app.listen(3000, () => {
    console.log('service is running at http://localhost:3000');
})