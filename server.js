const express = require("express")
const cors = require("cors")

const traffic = require("./trafficData")

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000



// Home route
app.get("/", (req,res)=>{
res.send("STMS Backend Running")
})



// Traffic Dashboard API
app.get("/traffic",(req,res)=>{

res.json({
roadA: traffic.roadA,
roadB: traffic.roadB,
roadC: traffic.roadC
})

})



// Route Suggestion API
app.post("/route",(req,res)=>{

const {from,to} = req.body

const routes = [

"Route A (Fastest)",

"Route B (Less Traffic)",

"Route C (Alternative Road)"

]

const randomRoute = routes[Math.floor(Math.random()*routes.length)]

res.json({

from: from,
to: to,
route: randomRoute

})

})



// Admin update traffic
app.post("/updateTraffic",(req,res)=>{

const {road,level} = req.body

traffic[road] = level

res.json({

message:"Traffic Updated",

traffic

})

})



app.listen(PORT,()=>{

console.log("Server running on port",PORT)

})
