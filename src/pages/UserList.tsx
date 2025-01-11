import React, { useEffect, useState } from "react";
import { fetchRandomUsers,sendLike } from "../services/firestore";
import { Box, Button, Card, CardContent, Typography, Container } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
const UserList: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
        // ユーザーが認証されている場合の処理
        } else {
        // ユーザーが認証されていない場合の処理
        }
    });

    return () => unsubscribe();
    }, []);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userList = await fetchRandomUsers();
                setUsers(userList);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            }
        };
        loadUsers();
    }, []);


    const handleLike = async (toUserId: string) => {
        try {
            await sendLike(toUserId);
            alert("いいねを送りました！");
        } catch (err: any) {
            console.error("エラー:", err);
            alert("いいねの送信に失敗しました。");
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "50px" }}>
            <Typography variant="h5" component="h1" gutterBottom>
                他のユーザーを探す
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            {users.map((user) => (
                <Card key={user.id} style={{ marginBottom: "20px" }}>
                    <CardContent>
                        <Typography variant="h6">{user.username}</Typography>
                        <Typography variant="body2">{user.bio}</Typography>
                        <Box textAlign="right" mt={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleLike(user.id)}
                            >
                                いいね！
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

export default UserList;
