import { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

export default function WebRadioApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatLog([...chatLog, chatMessage]);
      setChatMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: "url('/banner-joca-fm.jpg')" }}>
      <div className="bg-white/80 p-6 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Joca FM</h1>
        <div className="flex justify-center mb-4">
          <Button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</Button>
          <audio ref={audioRef} src="https://stream.zeno.fm/vk7k37mx7hhvv" preload="none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Chat ao Vivo</h2>
              <div className="h-40 overflow-y-auto border p-2 rounded mb-2 bg-gray-100">
                {chatLog.map((msg, index) => (
                  <p key={index} className="text-sm">{msg}</p>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                />
                <Button onClick={handleSendMessage}>Enviar</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Comentários</h2>
              <div className="h-40 overflow-y-auto border p-2 rounded mb-2 bg-gray-100">
                {comments.map((cmt, index) => (
                  <p key={index} className="text-sm">{cmt}</p>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Deixe seu comentário..."
                />
                <Button onClick={handleAddComment}>Comentar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}