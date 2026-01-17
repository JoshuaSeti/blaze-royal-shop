import { useState, useRef, useEffect } from "react";
import { useMessages, Message } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Image, Video, X, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface ChatWindowProps {
  conversationId: string;
  otherUser: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
  onClose?: () => void;
}

const ChatWindow = ({ conversationId, otherUser, onClose }: ChatWindowProps) => {
  const { user } = useAuth();
  const { messages, loading, sendMessage, uploadMedia } = useMessages(conversationId);
  const [newMessage, setNewMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await sendMessage(newMessage.trim());
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadMedia(file);
      if (url) {
        const isVideo = file.type.startsWith("video/");
        await sendMessage("", isVideo ? "video" : "image", url);
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const renderMessage = (message: Message) => {
    const isOwn = message.sender_id === user?.id;
    const time = format(new Date(message.created_at), "HH:mm");

    return (
      <div
        key={message.id}
        className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}
      >
        <div
          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted rounded-bl-sm"
          }`}
        >
          {message.message_type === "text" && (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          )}
          {message.message_type === "image" && message.media_url && (
            <img
              src={message.media_url}
              alt="Shared image"
              className="max-w-full rounded-lg cursor-pointer"
              onClick={() => window.open(message.media_url!, "_blank")}
            />
          )}
          {message.message_type === "video" && message.media_url && (
            <video
              src={message.media_url}
              controls
              className="max-w-full rounded-lg"
            />
          )}
          <p className={`text-xs mt-1 ${isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            {time}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-card">
        <Avatar className="h-10 w-10">
          <AvatarImage src={otherUser.avatar_url || ""} />
          <AvatarFallback>{otherUser.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold">{otherUser.name}</h3>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-muted-foreground">No messages yet</p>
            <p className="text-sm text-muted-foreground">Start the conversation!</p>
          </div>
        ) : (
          messages.map(renderMessage)
        )}
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,video/*"
            className="hidden"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Image className="h-5 w-5" />
            )}
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
            disabled={uploading}
          />
          <Button onClick={handleSend} disabled={!newMessage.trim() || uploading}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
