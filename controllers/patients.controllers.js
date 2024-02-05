const { client } = require("../config/database/connect");
const {v4:uuidv4} = require("uuid");

exports.getAllPatients = async (req,res)=>{
    const query = "SELECT * FROM patients";
    try{
        const appointments = await client.query(query);
        return res.status(200).send({data: appointments.rows, status: 200});
    }
    catch(err){
        console.log("Error occurred while getting patients!", err);
        return res.status(500).send({message: "Error occurred while getting patients!", status: 500});
    }
}
exports.createPatient = async (req,res)=>{
    const {patientName, patientAge, email, phone, gender, blood} = req.body;
    if(!patientName || !patientAge || !email || !phone || !gender || !blood){
        return res.status(400).send({message:"Please provide all credentials!", status: 400});
    }
    console.log(req.body)
    const id = uuidv4();
    console.log(id)
    const query = "INSERT INTO patients (id,name, age, email, phone, gender, blood) VALUES ($1,$2,$3,$4,$5,$6,$7);";
    try{
        const appointments = await client.query(query,[id, patientName, patientAge, doctorId, date, time]);
        return res.status(200).send({message: "INserted Patient successfully!", status: 200});
    }
    catch(err){
        console.log("Error occurred while inserting patients!", err);
        return res.status(500).send({message: "Error occurred while inserting patients!", status: 500});
    }
}

exports.updatePatient = async (req,res)=>{
    const {id} = req.body;
    if(!id){
        return res.send({message: "Please provide an id!", status: 400}).status(400);
    }
    const query = "UPDATE appointments SET feepaid = true WHERE id = $1";
    try{
        const appointments = await client.query(query,[id]);
        return res.status(200).send({message: "Updated Successfully", status: 200});
    }
    catch(err){
        console.log("Error occurred while updating appointments!", err);
        return res.status(500).send({message: "Error occurred while updating appointments!", status: 500});
    }
}