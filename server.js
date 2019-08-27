//const port = 3000
const port = process.env.PORT || 4000


const app = require('./routes/app')


app.listen(port, () => console.log(`listening on port ${port}!`))