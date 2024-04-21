import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    yourName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pickUpAddress: {
        type: String,
        required: true
    },
    PANNumber: {
        type: String,
        required: true
    },
    adress: {
        type: String,
    },
    GSTIN: {
        type: String,
    },
    panCard: {
        type: String,
        // required: true
    },
    gstCertificate: {
        type: String,
    },
    token: {
        type: String,
        default: ''
    }
})

const user = mongoose.model('user', userSchema);
export default user;