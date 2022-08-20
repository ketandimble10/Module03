import express from "express";
import axios from "axios"

const app = express();
app.set('view engine','ejs')
const PORT =  3000

app.get('/users',async (req,res)=>{
    try {
        const response = await axios.get('http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees')
        res.render('users',{users :response.data })
    } catch (error) {
        res.status(500).send("internal server error")
    }
    
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
  