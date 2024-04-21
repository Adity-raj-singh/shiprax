import User from '../model/user.js';
import cxForm from '../model/cxForm.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        // const salt = await bcrypt.genSalt();
        const hashedPasword = await bcrypt.hash(request.body.password, 10);

        const user = {
            yourName: request.body.yourName,
            email: request.body.email,
            password: hashedPasword,
            pickUpAddress: request.body.pickUpAddress,
            PANNumber: request.body.PANNumber,
            address: request.body.address,
            GSTIN: request.body.GSTIN,
            panCard: request.body.panCard,
            gstCertificate: request.body.gstCertificate,
        };

        const newUser = new User(user);

        await newUser.save();

        return response.status(200).json({ msg: 'Sign Up Successfully 😁' })
    }
    catch (error) {
        return response.status(500).json({ msg: 'Error while signup 😭' })
    }
}

export const userLogin = async (request, response) => {
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
        return response.status(400).json({ msg: 'Email does not match 😕' });
    }
    try {
        let match = await bcrypt.compare(request.body.password, user.password);

        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken })
            await newToken.save();

            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, email: user.email, userName: user.yourName, address: user.address })
        }
        else {
            return response.status(400).json({ msg: 'Password does not match 😕' });
        }
    }
    catch (error) {
        return response.status(500).json({ msg: 'Error while login 😭' })
    }
}

export const cxFormUpload = async (request, response) => {
    try {

        const formData = {
            yourName: request.body.yourName,
            country: request.body.country,
            pinCode: request.body.pinCode,
            state: request.body.state,
            city: request.body.city,
            pickUpAddress: request.body.pickUpAddress,
            mobileNumber: request.body.mobileNumber,
            fullName: request.body.fullName,
            email: request.body.email,
            productName: request.body.productName,
            sku: request.body.sku,
            unitPrice: request.body.unitPrice,
            quantity: request.body.quantity,
            hsnCode: request.body.hsnCode,
            productDescription: request.body.productDescription,
            productCategory: request.body.productCategory,
            deadWeight: request.body.deadWeight,
            length: request.body.length,
            width: request.body.width,
            height: request.body.height,
        };

        const newCxForm = new cxForm(formData);

        await newCxForm.save();

        return response.status(200).json({ msg: 'Form Saved Successfully 😁', data: formData })
    }
    catch (error) {
        return response.status(500).json({ msg: 'Error while Saving Form 😭' })
    }
}

export const findEmail = async (request, response) => {
    try {
        const email = request.body.email;
        const userData = await User.findOne({ email: email });

        if (userData) {
            response.status(200).json({ msg: "Email Found" });
        } else {
            response.status(404).json({ msg: 'Email address does not exist.' });
        }
    } catch (error) {
        response.status(500).json({ success: false, msg: error.message });
    }
};

export const resetPassword = async (request, response) => {
    try {
        const userData = await User.findOne({ email: request.body.email });

        if (userData) {
            const hashedPasword = await bcrypt.hash(request.body.password, 10);
            await User.updateOne({ email: request.body.email }, { $set: { password: hashedPasword } });
            response.status(200).json({ msg: "Password changed successfully" });
        } else {
            response.status(404).json({ msg: 'Not Changed' });
        }
    } catch (error) {
        response.status(500).json({ success: false, msg: error.message });
    }
};
