import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import { saveUserProfile } from "../services/firestore";

const ProfileSetup: React.FC = () => {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // エラーメッセージをリセット

        try {
            await saveUserProfile(username, bio); // プロフィールを保存
            alert("プロフィールが保存されました！");
            navigate("/UserList"); // ユーザーリストに遷移
        } catch (err: any) {
            console.error("エラー:", err);
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: "100px" }}>
            <Paper elevation={3} style={{ padding: "30px" }}>
                <Box textAlign="center">
                    <Typography variant="h5" component="h2" gutterBottom>
                        プロフィール設定
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            label="ユーザー名"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="自己紹介"
                            fullWidth
                            multiline
                            rows={4}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
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
                            保存
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default ProfileSetup;
