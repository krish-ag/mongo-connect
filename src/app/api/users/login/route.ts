import connect from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();


export async function POST(request: NextRequest) {
	try {
		const result = await request.json()
		const {username, password} = result
		console.log(result);

		const users = await User.findOne({username})
		if (!users) {
			return NextResponse.json({error: 'User does not exist'}, {status: 400})
		}

		const validPassword = await bcrypt.compare(password, users.password)
		if (!validPassword) {
			return NextResponse.json({error: 'Invalid password'}, {status: 400})
		}

		const token_data = {
			id: users._id,
			username: users.username,
			email: users.email,
		}

		// create jwt token
		const token = await jwt.sign(token_data, process.env.TOKEN_SECRET!, {expiresIn: '1d'})


		const resp = NextResponse.json({message: 'Login successful'}, {status: 201});
		resp.cookies.set('token', token, {
			httpOnly: true,
		}
		)
		return resp;

	} catch (error: any) {
		return NextResponse.json({error: error.message}, {status: 500})
	}

}