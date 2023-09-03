export async function GET() {
	try {
		const response = NextResponse.json(
			{message: "Logout successful"},
		)

		response.cookies.set("token", "", {
			httpOnly: true,
		});

		return response;
	}
	catch (e) {

	}
}

import {NextResponse} from "next/server";
