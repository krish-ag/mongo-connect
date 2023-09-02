import connect from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";

connect();


export async function POST(request: NextRequest) {
  try {
    const result = await request.json()
    const { username, email, password } = result
    console.log(result)

    const users = await User.findOne({ email })
    if (users) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ username, email, password: hashedPassword })

    const saved = await user.save() 
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })



    // return NextResponse.redirect(`/users/${user._id}`)
  }
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}