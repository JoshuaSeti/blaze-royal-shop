import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string | null;
  message_type: "text" | "image" | "video";
  media_url: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  buyer_id: string;
  vendor_id: string;
  product_id: string | null;
  last_message_at: string;
  created_at: string;
  other_user?: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
  last_message?: Message;
  unread_count?: number;
}

export const useConversations = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .or(`buyer_id.eq.${user.id},vendor_id.eq.${user.id}`)
        .order("last_message_at", { ascending: false });

      if (error) throw error;

      // Fetch other user details and last message for each conversation
      const conversationsWithDetails = await Promise.all(
        (data || []).map(async (conv) => {
          const otherUserId = conv.buyer_id === user.id ? conv.vendor_id : conv.buyer_id;
          
          // Get other user's profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("user_id, full_name, vendor_company_name, avatar_url")
            .eq("user_id", otherUserId)
            .single();

          // Get last message
          const { data: lastMsg } = await supabase
            .from("messages")
            .select("*")
            .eq("conversation_id", conv.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          // Get unread count
          const { count } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conv.id)
            .eq("is_read", false)
            .neq("sender_id", user.id);

          return {
            ...conv,
            other_user: profile ? {
              id: profile.user_id,
              name: profile.vendor_company_name || profile.full_name || "User",
              avatar_url: profile.avatar_url
            } : undefined,
            last_message: lastMsg as Message | undefined,
            unread_count: count || 0
          };
        })
      );

      setConversations(conversationsWithDetails);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return { conversations, loading, refetch: fetchConversations };
};

export const useMessages = (conversationId: string | null) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;

    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages((data || []) as Message[]);

      // Mark messages as read
      if (user) {
        await supabase
          .from("messages")
          .update({ is_read: true })
          .eq("conversation_id", conversationId)
          .neq("sender_id", user.id)
          .eq("is_read", false);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  }, [conversationId, user]);

  useEffect(() => {
    fetchMessages();

    // Subscribe to new messages
    if (conversationId) {
      const channel = supabase
        .channel(`messages:${conversationId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${conversationId}`
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as Message]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [conversationId, fetchMessages]);

  const sendMessage = async (
    content: string,
    messageType: "text" | "image" | "video" = "text",
    mediaUrl?: string
  ) => {
    if (!user || !conversationId) return;

    try {
      const { error } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: messageType === "text" ? content : null,
        message_type: messageType,
        media_url: mediaUrl || null
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const uploadMedia = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("chat-media")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("chat-media")
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading media:", error);
      toast.error("Failed to upload media");
      return null;
    }
  };

  return { messages, loading, sendMessage, uploadMedia, refetch: fetchMessages };
};

export const useStartConversation = () => {
  const { user } = useAuth();

  const startConversation = async (vendorId: string, productId?: string): Promise<string | null> => {
    if (!user) {
      toast.error("Please log in to send messages");
      return null;
    }

    try {
      // Check if conversation already exists
      const { data: existing } = await supabase
        .from("conversations")
        .select("id")
        .eq("buyer_id", user.id)
        .eq("vendor_id", vendorId)
        .single();

      if (existing) {
        return existing.id;
      }

      // Create new conversation
      const { data, error } = await supabase
        .from("conversations")
        .insert({
          buyer_id: user.id,
          vendor_id: vendorId,
          product_id: productId || null
        })
        .select("id")
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast.error("Failed to start conversation");
      return null;
    }
  };

  return { startConversation };
};
