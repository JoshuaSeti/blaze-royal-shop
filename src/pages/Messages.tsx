import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Conversation } from "@/hooks/useMessages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Messages = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <MessageCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to view messages</h1>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to view and send messages.
          </p>
          <Link to="/auth">
            <Button>Sign In</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Chat with sellers and buyers</p>
        </div>

        <Card className="h-[calc(100vh-280px)] min-h-[500px] overflow-hidden">
          <div className="flex h-full">
            {/* Conversation List - Hidden on mobile when chat is open */}
            <div
              className={`w-full md:w-80 border-r flex-shrink-0 ${
                selectedConversation ? "hidden md:block" : "block"
              }`}
            >
              <div className="p-4 border-b">
                <h2 className="font-semibold">Conversations</h2>
              </div>
              <ConversationList
                selectedId={selectedConversation?.id || null}
                onSelect={setSelectedConversation}
              />
            </div>

            {/* Chat Window */}
            <div className={`flex-1 ${!selectedConversation ? "hidden md:flex" : "flex"}`}>
              {selectedConversation && selectedConversation.other_user ? (
                <div className="w-full flex flex-col">
                  {/* Mobile back button */}
                  <div className="md:hidden p-2 border-b">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  </div>
                  <div className="flex-1">
                    <ChatWindow
                      conversationId={selectedConversation.id}
                      otherUser={selectedConversation.other_user}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Choose a conversation from the list to start chatting, or visit a store to message a seller.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Messages;
