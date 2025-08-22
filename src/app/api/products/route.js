import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const products = await db.collection("products").find({}).sort({ _id: -1 }).toArray();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const data = await req.json();
    if (!data.name || !data.brand || !data.description || !data.price || !data.image || !data.features) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("products").insertOne({
      name: data.name,
      brand: data.brand,
      description: data.description,
      price: data.price,
      image: data.image,
      features: Array.isArray(data.features) ? data.features : [data.features],
      createdBy: session.user.email,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to add product" }), { status: 500 });
  }
}