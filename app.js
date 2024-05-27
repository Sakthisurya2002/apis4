const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const app = express()
app.use(express.json())

const convert = object => {
  return {
    stateId: object.state_id,
    stateName: object.state_name,
    population: object.state_population,
  }
}

let db = null

const dbpath = path.join(__dirname, 'covid19India.db')

const intialize = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3005, () => {
      console.log(`server started`)
    })
  } catch (e) {
    console.log(`the error is:${e.message}`)
  }
}
intialize()
app.get('/states/', async (request, response) => {
  const dbquery = `
    select * from state;`
  const result = await db.all(dbquery)
  response.send(result)
})
