import { useState } from "react";
import { signIn, signUp } from "../lib/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            alert("Login bem-sucedido!");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            alert("Conta criada! Verifique seu e-mail.");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Login 🚀</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Entrar</button>
                <br />
                <button onClick={handleSignUp}>Criar Conta</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
