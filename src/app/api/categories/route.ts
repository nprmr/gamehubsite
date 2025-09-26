import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(
        `${process.env.PROD_API_URL}/games/never-ever/categories`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PROD_API_TOKEN}`,
            },
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return NextResponse.json(
            { error: `Ошибка ${res.status}` },
            { status: res.status }
        );
    }

    const data = await res.json();
    return NextResponse.json(data);
}
