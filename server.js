const express = require("express")
const cors = require("cors")

const traffic = require("./trafficData")

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

// Home
app.get("/", (req,res)=>{
res.send("STMS Backend Running")
})


// Get traffic data
app.get("/traffic", (req,res)=>{

res.json({
success:true,
data:traffic
})

})


// Find route
app.post("/route",(req,res)=>{

const {from,to}=req.body

const routes=[
"Route A - Fastest",
"Route B - Less Traffic",
"Route C - Alternative"
]

const random=routes[Math.floor(Math.random()*routes.length)]

res.json({
success:true,
from,
to,
bestRoute:random
})

})


// Traffic report
app.get("/report",(req,res)=>{

res.json({
roadA:traffic.roadA,
roadB:traffic.roadB,
roadC:traffic.roadC
})

})


// Admin update traffic
app.post("/admin/update",(req,res)=>{

const {road,level}=req.body

if(traffic[road]!==undefined){

traffic[road]=level

return res.json({
message:"Traffic Updated",
traffic
})

}

res.status(400).json({
message:"Invalid Road"
})

})


app.listen(PORT,()=>{
console.log("Server running on port",PORT)
})
