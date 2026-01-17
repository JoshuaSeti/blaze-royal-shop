import { useConversations, Conversation } from "@/hooks/useMessages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle } from "lucide-react";

interface ConversationListProps {
  selectedId: string | null;
  onSelect: (conversation: Conversation) => void;
}

const ConversationList = ({ selectedId, onSelect }: ConversationListProps) => {
  const { conversations, loading } = useConversations();

  if (loading) {
    return (
      <div className="space-y-3 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-4">
        <MessageCircle className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="font-medium">No conversations yet</p>
        <p className="text-sm text-muted-foreground">
          Start a conversation with a seller from their store page
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-1 p-2">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelect(conversation)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
              selectedId === conversation.id
                ? "bg-primary/10"
                : "hover:bg-muted"
            }`}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={conversation.other_user?.avatar_url || ""} />
                <AvatarFallback>
                  {conversation.other_user?.name.slice(0, 2).toUpperCase() || "??"}
                </AvatarFallback>
              </Avatar>
              {(conversation.unread_count || 0) > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center text-xs">
                  {conversation.unread_count}
                </Badge>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium truncate">
                  {conversation.other_user?.name || "Unknown User"}
                </p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {conversation.last_message?.message_type === "image"
                  ? "📷 Image"
                  : conversation.last_message?.message_type === "video"
                  ? "🎥 Video"
                  : conversation.last_message?.content || "No messages yet"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ConversationList;
