import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
} from "@mui/material";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // エラーメッセージをリセット
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("登録が成功しました！");
            navigate("/profile-setup");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: "100px" }}>
            <Paper elevation={3} style={{ padding: "30px" }}>
                <Box textAlign="center">
                    <Typography variant="h5" component="h2" gutterBottom>
                        新規登録
                    </Typography>
                </Box>
                <form onSubmit={handleRegister}>
                    <Box mb={2}>
                        <TextField
                            label="メールアドレス"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="パスワード"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Box>
                    {error && (
                        <Typography color="error" style={{ marginBottom: "16px" }}>
                            {error}
                        </Typography>
                    )}
                    <Box textAlign="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            登録
                        </Button>
                    </Box>
                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2">
                            すでにアカウントをお持ちの方は <Link to="/">こちら</Link> からログインしてください。
                        </Typography>
                    </Box>

                </form>
            </Paper>
        </Container>
    );
};

export default Register;
