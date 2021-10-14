import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
}>

export function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered
                }
            });

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestion);
        });
    }, [roomId]);

    return { questions, title};
}