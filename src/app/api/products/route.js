import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const products = await db
            .collection("products")
            .find({})
            .sort({ _id: -1 }) 
            .toArray();

        return new Response(JSON.stringify(products), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const data = await req.json();

        const result = await db.collection("products").insertOne({
            ...data,
            createdAt: new Date() 
        });

        return new Response(JSON.stringify(result), { status: 201 });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to add product" }), { status: 500 });
    }
}
