import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../services/firebase"; // 適切なパスに修正
import { signInWithEmailAndPassword } from "firebase/auth";
import {
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Box,
} from "@mui/material";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // エラーメッセージをリセット
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/UserList"); // ログイン後に UserList に遷移
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>
                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2">
                            まだアカウントをお持ちでない方は <Link to="/Register">こちら</Link> からログインしてください。
                        </Typography>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
