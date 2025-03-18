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
//get by id 
const getById = async (req, res) => {
    const id = req.params.id;
    let events;
    try {
        events = await Event.findById(id);
    } catch (error) {
        console.log(error);
    }

    if (!events) {
        return res.status(404).send({message: "Event not found"});
    }
    return res.status(200).json({events});
};

//Update Event details 

const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const { FirstName, LastName, City, Number, Gmail, NumberAdult, Date, Time, Location, EventCategory } = req.body;
    
    let events;
    try {
        events = await Event.findByIdAndUpdate(eventId, { FirstName, LastName, City, Number, Gmail, NumberAdult, Date, Time, Location, EventCategory }, { new: true });
    } catch (error) {
        console.log(error);
    }

    if (!events) {
        return res.status(404).send({message: "Unable to update Event"});
    }
    return res.status(200).json({events});
};

//Delete event details 
const deleteEvent = async (req, res) => {
    const id = req.params.id;
    let events;
    try {
        events = await Event.findByIdAndDelete(id); // Fixed variable name
    } catch (error) {
        console.log(error);
    }

    if (!events) {
        return res.status(404).send({message: "Unable to delete Event"});
    }
    return res.status(200).json({message: "Event deleted successfully"});
};


exports.getAllEvents = getAllEvents;
exports.addEvent = addEvent;
exports.getById = getById;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;