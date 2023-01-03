const cardModel = require("../models/cardModel")
const { isValidObjectId, isValidCardNumber, isValidPhone, isValidString } = require("../validation/validation")

//====================================CREATE CARD================================================================//

const createCard = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0)
            res.status(400).send({ status: false, message: "Please enter the data to create card" })

        if (!isValidCardNumber(data.cardNumber))
            return res.status(400).send({ status: true, message: "Please provide valid cardNumber" })

        if (!isValidString(data.cardType))
            return res.status(400).send({ status: false, message: "Please provide valid cardtype" })

        if (!isValidString(data.customerName))
            return res.status(400).send({ status: false, message: "Please provide valid customerName" })

        data.status = data.status.toUpperCase()
        if (data.status) {
            if (data.status !== "ACTIVE" || data.status == "INACTIVE") {
                return res.status(400).send({ status: false, message: "Please provide valid status" })
            }
        }
        if (!isValidObjectId(data.customerID.trim())) return res.status(400).send({ status: false, message: "Please provide valid customerId" })

        const cardCreation = await cardModel.create(data)
        return res.status(201).send({ status: true, data: cardCreation ,message:"Successfully created"})
    }
    catch (error){
        res.status(500).send({ status: false, message: error.message })
    }
}

//=======================================GET CARD=================================================================//

const getCardDetails = async function (req, res) {
    try {
        const fetchData = await cardModel.find({ status: "ACTIVE" })
        return res.status(200).send({ status: true, message:"data details",data:fetchData})
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//=================================================================================================================//
module.exports={createCard,getCardDetails}