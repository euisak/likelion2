import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    userPw: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, unique: true},
    userType: {
        type: String,
        enum: ["구매자(일반 회원)", "판매자"],
        required: true
    },
});

userSchema.pre("save", async function() {
    this.userPw = await bcrypt.hash(this.userPw, 5);
})


const User = mongoose.model("User", userSchema);
export default User;