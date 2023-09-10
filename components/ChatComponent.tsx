import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChatMessage } from '@/entities/chat';
const CHAT_SERVER = "http://localhost:3001";

function ChatComponent() {
    const router = useRouter();
    const roomId = router.query.roomId;
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState<null | Socket>(null);
    const [email, setEmail] = useState<string | null>(null);

    const handleGetChatIdentity = async () => {
        let resp = await fetch(
            "/api/joinChat", {
            method: "POST",
            body: JSON.stringify({
                roomId
            })
        }
        );
        let respJson = await resp.json();
        let identityToken = respJson["identityToken"];
        let email = respJson["email"];
        setEmail(email);
        if (!identityToken) {
            throw new Error("failed to get chat identity token");
        }
        return identityToken;
    }

    const handleJoinChat = async (identityToken: string) => {
        let _socket = io(
            CHAT_SERVER, {
            query: {
                identityToken
            }
        }
        );
        _socket.on('chat message', (message) => {
            setMessages((previousMessages) => [...previousMessages, message]);
        });
        setSocket(_socket);
    }

    const handleJoinChatSuccessfully = () => {

    }

    useEffect(() => {
        (async function () {
            if (roomId) {
                let identityToken = await handleGetChatIdentity();
                await handleJoinChat(identityToken);
            }
        })();
    }, [roomId]);

    const handleSendMessage = () => {
        if (input.trim() !== '' && socket) {
            socket.emit('chat message', {
                message: input,
                sentAt: new Date()
            });
            setInput('');
        }
    };
    const [open, setOpen] = useState(false);
    if (open) {
        return <div className="fixed bottom-0 right-0 justify-end items-end h-auto h-max-96">
            <div className="bg-base-200 px-4 py-4 rounded-md space-y-2">
                <span className="flex justify-between">
                    <div className="text-xl font-medium">Chat room</div>

                    <button
                        className="btn btn-circle btn-ghost btn-xs ml-auto"
                        onClick={() => { setOpen(false) }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </span>
                <ul className="w-80 bg-base-200 h-96 text-base-content overflow-y-scroll">
                    <div>
                        <Head>
                            <title>Study room</title>
                        </Head>
                        <div className="p-4">
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div className="space-y-2" key={`${message.sentAt}-${message.email}`}>
                                        <p className={`flex text-blue-300 text-xs ${message.email === email ? 'justify-end' : 'justify-start'
                                            }`}>{message.email}</p>
                                        <div

                                            className={`flex ${message.email === email ? 'justify-end' : 'justify-start'
                                                }`}
                                        >
                                            <div
                                                className={`${message.email === email ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                                    } p-2 rounded-md max-w-xs`}
                                            >
                                                {message.message}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex mt-4 space-x-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="border p-2 rounded-md flex-grow"
                                />

                            </div>

                            <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                </ul>

            </div>
        </div>
    } else {
        return <div className="relative">
            <div className="fixed bottom-5 right-5 flex justify-end items-end">
                <button
                    className=" btn btn-primary px-4 py-2 rounded-3xl"
                    onClick={() => { setOpen(true) }}>Open Chat</button>
            </div>

        </div>
    }

}

export default ChatComponent;
