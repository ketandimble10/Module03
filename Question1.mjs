
import express from "express";
import fs from "fs"
const app = express()
const port = 3000
import fetch from 'node-fetch';

app.get('/employee',(req,res)=>{
  fs.readFile('./EmployeeDetails.json',(err,data)=>{
    if (err){throw err}
    else{

       const datajson = JSON.parse(data)
      res.send(datajson)}
  })
})
app.get('/project',(req,res)=>{
  fs.readFile('./ProjectDetails.json',(err,data)=>{
    if (err){throw err}
    else{
        const datajson = JSON.parse(data)
      res.send(datajson)}
  })
})

app.get("/employee/:id",(req,res)=>{
    const ID=req.params.id;
    fs.readFile("./EmployeeDetails.json",(err,data)=>{
        if(err)
        {
            console.log(err);
            res.send("Read file Error Occured");
        }
        const stringData =data.toString();
        const parsedJSON= JSON.parse(stringData);
        for(let i in parsedJSON){
            if(parsedJSON[i]['employeeId']==ID){
                res.json(parsedJSON[i]);
            }
        }
    })
})
app.get("/project/:id",(req,res)=>{
    const ID=req.params.id;
    fs.readFile("./ProjectDetails.json",(err,data)=>{
        if(err)
        {
            console.log(err);
            res.send("Read file Error Occured");
        }
        const stringProjectData =data.toString();
        const parsedProjectJSON= JSON.parse(stringProjectData);
        for(let i in parsedProjectJSON){
            if(parsedProjectJSON[i]['projectId']==ID){
                res.json(parsedProjectJSON[i]);
            }
        }
    })
})

app.get('/getemployeedetails', (req,res) => { Promise.all([
    fetch('http://localhost:3000/employee'),
    fetch('http://localhost:3000/project')
])
.then(responses => Promise.all(responses.map(res => res.json())))
.then(data => {
    let employeeDetails = new Array;
    const [employeeData, projectData] = data;
    employeeData
        .forEach(employee => {
            let employeeDetail = {
                Id: employee.employeeId,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                projects: []
            }
            const projId = employee.projectId;
            projectData
                .forEach(project => {
                    if (projId === project.projectId) {
                        employeeDetail.projects.push(project);
                    }
                })
            employeeDetails.push(employeeDetail)
        });
    return employeeDetails;
})
.then(employeeDetails => res.send(employeeDetails));})



app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });
