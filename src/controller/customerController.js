const customerModel = require("../models/customerModel")
const { isValidObjectId, isValidPhone, isValidDate, isValidEmail, isValidString, isValidCustomerId } = require("../validation/validation")

//===============================CREATE CUSTOMER========================================================//

const createCustomer = async function (req, res) {
    try {
        let data = req.body
        
        let { firstName, lastName, mobileNumber, DOB, emailID, address, customerID } = data
        
        if (Object.keys(data).length == 0) 
        return res.status(400).send({ status: false, message: "Please provide data to create customer" })
        
        if (!firstName) return res.status(400).send({ status: false, message: "first name is mandatory" })
        if (!isValidString(firstName)) return res.status(400).send({ status: false, message: "please enter a valid first name" })

        if (!lastName) return res.status(400).send({ status: false, message: "last name is mandatory" })
        if (!isValidString(lastName)) return res.status(400).send({ status: false, message: "please enter a valid last name" })

        if (!mobileNumber) return res.status(400).send({ status: false, message: "Mobile Number is mandatory" })
        if (!isValidPhone(mobileNumber)) return res.status(400).send({ status: false, msg: "please provide a valid mobile number" })

        if (!DOB) return res.status(400).send({ status: false, message: "DOB is mandatory" })
        if (!isValidDate(DOB)) return res.status(400).send({ status: false, message: "please enter a valid DOB" })

        if (!emailID) return res.status(400).send({ status: false, message: "emailId is mandatory" })
        if (!isValidEmail(emailID)) return res.status(400).send({ satus: false, message: "please enter a valid emailId" })

        if (!address) return res.status(400).status({ status: false, message: "please enter address" })

        if (!customerID) return res.status(400).status({ status: false, message: "please enter customerId" })
        if (!isValidCustomerId(customerID)) return res.status(400).status({ status: false, message: "please enter valid customerId" })
        
        let findEmail = await customerModel.findOne({ emailID: emailID })
        if (findEmail) {
            return res.status(400).send({ status: false, message: "emailId  already exists" })
        }
        let findMobile = await customerModel.findOne({ mobileNumber: mobileNumber })
        if (findMobile) {
            return res.status(400).send({ status: false, message: "mobile number already exists" })
        }
        
        const customer = await customerModel.create(data)
        return res.status(201).send({ status: true, message: "Successfully created", data: customer })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
//============================================GET CUSTOMER=======================================================//

const getCustomer = async function (req, res) {
    try {
        const customer = await customerModel.find({ status: "ACTIVE" })
        return res.status(200).send({ status: true, message: "Customer details data",data:customer })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//==================================DELETE CUSTOMER============================================================//

const deleteCustomer = async function (req, res) {
    try {
        let customerId = req.params.customerId
        if (!isValidObjectId(customerId)) { return res.status(400).send({ status: false, message: "Please enter a valid customerId" }) }
        
        let findCustomer = await customerModel.findOne({ _id: customerId, status: "ACTIVE" })
        if (!findCustomer) { return res.status(404).send({ status: false, message: "customer not found" }) }

        const deleteData=await customerModel.findOneAndUpdate({ _id: customerId }, { status: "INACTIVE" },{new:true})
        return res.status(200).send({ status: true, message: "deleted Succesfully" ,data:deleteData})
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//===============================================================================================================//
module.exports={createCustomer, getCustomer ,deleteCustomer}