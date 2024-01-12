import { withSessionRoute } from "./lib/withSession";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        const response = await fetch("https://cloud-storage-app-g87t.onrender.com/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.ok) {
            req.session.user = {
                _id: data.user._id,
                name: data.user.name,
                email: data.user.email,
            };
            await req.session.save();
            res.send({ ok: true });
            return;
        }

        return res.status(403).send("");
    }
    return res.status(404).send("");
}