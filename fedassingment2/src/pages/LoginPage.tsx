import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { parseJwt } from "../util/parsJWT";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");



        // TEST LOGIN vha. chat (slet efter færdig) ALT ANDET HAR JEG IKKE RØRT - CANH
        if (email === "ma" && password === "") {
            const mockPayload = { name: "Test Manager", role: "Manager", exp: Math.floor(Date.now() / 1000) + 3600 };
            const fakeToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(mockPayload))}.faketest123`;
            localStorage.setItem('token', fakeToken);
            navigate("/manager"); // Sørg for at denne rute matcher din mangager dashboard
            return; // Stopper funktionen her, så den ikke prøver at ramme databasen
        }

        if (email === "mo" && password === "") {
            const mockPayload = { name: "Test Model", role: "Model", exp: Math.floor(Date.now() / 1000) + 3600 };
            const fakeToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(mockPayload))}.faketest123`;
            localStorage.setItem('token', fakeToken);
            navigate("/model");
            return;
        }
        // TEST LOGIN SLUT HER 



        try {
            const token = await login({ email, password });

            const user = parseJwt(token);
            console.log("DECIFRERET BRUGER HOLDER DETTE:", user);
            if (!user) {
                setError("Kunne ikke læse token");
                return;
            }
            if (user.role == "manager") {
                navigate("/manager");
            }
            else {
                navigate("/model");
            }
        }
        catch (err) {
            console.error("Caught error:", err);  // ← tilføj denne
            setError("Login fejl");
        }
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <form className="login" onSubmit={handleSubmit}>
                <div className="h1">Login</div>
                <input
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p style={{ color: "red", fontSize: "0.7em", margin: "8px 0 0" }}>{error}</p>}
                <input value="Login" className="btn" type="submit" />
            </form>
        </div>
    )
}