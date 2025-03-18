const Event = require("../Model/EventModel");
//Display part
const getAllEvents = async (req, res) => {
    let Events;
    try {
        events = await Event.find();  
   }catch (error) {
        console.log(err);
    }

    if (!events) {
       return res.status(404).json({message: "No events found"});
    }

    return res.status(200).json({events});
};

// data insert part
const addEvent = async (req, res) => {
    const { FirstName, LastName, City, Number, Gmail, NumberAdult, Date, Time, Location, EventCategory } = req.body;

    let events;
    try {
        events = new Event({ FirstName, LastName, City, Number, Gmail, NumberAdult, Date, Time, Location, EventCategory });
        await events.save();  
    }
    catch (error) {
        console.log(error);
    }

    // not insert users 
    if (!events) {
        return res.status(404).send({message: "unable to add users"});
    }
    return res.status(200).json({events});
};

exports.getAllEvents = getAllEvents;
exports.addEvent = addEvent;