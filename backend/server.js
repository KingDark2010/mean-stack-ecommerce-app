const {app, Port} = require('./src/app');

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});