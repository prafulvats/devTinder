const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['ignored', 'interested', 'accepted', 'rejected'],
            message: '{VALUE} is not supported'
        }
    }
},
{
    timestamps: true,
});
// Creating compound indexing on fromUserId and toUserId - Mongo DB indexes - To optimize the DB operations when we have a lot of data.
connectionRequestSchema.index({fromUserId: 1, toUserId: 1})

//We can check this in API level also in request handler.. 
connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    //Check if fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself")
    }
    next();
})

const ConnectionRequestModel = mongoose.model('ConnectionRequest', connectionRequestSchema);
module.exports = ConnectionRequestModel;