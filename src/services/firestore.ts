import { getFirestore, doc, setDoc, collection, query, where, getDocs,addDoc } from "firebase/firestore";
import { auth } from "./firebase";

const db = getFirestore();

export const fetchRandomUsers = async (): Promise<any[]> => {
    if (!auth.currentUser) throw new Error("認証されていません");

    const currentUserId = auth.currentUser.uid;
    const usersRef = collection(db, "users");

    // 自分以外のユーザーを取得
    const q = query(usersRef, where("userId", "!=", currentUserId));
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    // ランダムに並び替える
    return users.sort(() => Math.random() - 0.5);
};

export const sendLike = async (toUserId: string) => {
    if (!auth.currentUser) throw new Error("認証されていません");

    const likesRef = collection(db, "likes");
    await addDoc(likesRef, {
        fromUserId: auth.currentUser.uid,
        toUserId,
        createdAt: new Date(),
    });

    console.log("いいねを送信しました");
};

// プロフィール情報を保存する関数
export const saveUserProfile = async (username: string, bio: string) => {
    if (!auth.currentUser) {
        throw new Error("ユーザーが認証されていません。");
    }

    const userId = auth.currentUser.uid; // 現在のユーザーIDを取得
    const userDocRef = doc(db, "users", userId); // "users" コレクションに保存

    await setDoc(userDocRef, {
        username,
        bio,
        createdAt: new Date(),
    });

    console.log("プロフィールが保存されました。");
};
