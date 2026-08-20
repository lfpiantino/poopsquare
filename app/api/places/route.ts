import { getRequestUser } from "../_auth";
import { json, readyDb } from "../_db";

export async function GET(request: Request) {
  const db = await readyDb(); const url = new URL(request.url); const q = `%${(url.searchParams.get("q") || "").trim()}%`;
  const { results } = await db.prepare(`SELECT p.*, ROUND(COALESCE(AVG(r.rating),0),1) score, COUNT(DISTINCT r.id) reviews, COUNT(DISTINCT c.id) checkins FROM places p LEFT JOIN reviews r ON r.place_id=p.id LEFT JOIN checkins c ON c.place_id=p.id WHERE (?='%%' OR p.name LIKE ? OR p.address LIKE ? OR p.city LIKE ?) GROUP BY p.id ORDER BY score DESC, p.created_at DESC LIMIT 100`).bind(q,q,q,q).all();
  return json(results);
}
export async function POST(request: Request) {
  const user = await getRequestUser(request); if (!user) return json({ error: "Faça login para cadastrar um local." }, 401);
  const b = await request.json() as Record<string, unknown>; const required=["name","category","address","city","latitude","longitude"];
  if(required.some(k=>b[k]===undefined||String(b[k]).trim()==="")) return json({error:"Preencha os campos obrigatórios."},400);
  const db=await readyDb(); const now=new Date().toISOString();
  const out=await db.prepare(`INSERT INTO places(name,category,address,city,latitude,longitude,access,hours,accessible,family,changing_table,shower,gender_neutral,wifi,notes,created_by,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) RETURNING *`).bind(String(b.name),String(b.category),String(b.address),String(b.city),Number(b.latitude),Number(b.longitude),String(b.access||"Gratuito"),String(b.hours||"Não informado"),b.accessible?1:0,b.family?1:0,b.changingTable?1:0,b.shower?1:0,b.genderNeutral?1:0,b.wifi?1:0,String(b.notes||""),user.email,now).first();
  return json(out,201);
}
