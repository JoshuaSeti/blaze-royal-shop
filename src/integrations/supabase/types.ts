export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      auction_bids: {
        Row: {
          auction_id: string
          bid_amount: number
          bidder_id: string
          created_at: string
          id: string
        }
        Insert: {
          auction_id: string
          bid_amount: number
          bidder_id: string
          created_at?: string
          id?: string
        }
        Update: {
          auction_id?: string
          bid_amount?: number
          bidder_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auction_bids_auction_id_fkey"
            columns: ["auction_id"]
            isOneToOne: false
            referencedRelation: "auctions"
            referencedColumns: ["id"]
          },
        ]
      }
      auctions: {
        Row: {
          created_at: string
          current_price: number
          end_time: string
          id: string
          min_bid_increment: number
          product_id: string
          reserve_price: number | null
          start_time: string
          starting_price: number
          status: string
          updated_at: string
          vendor_id: string
          winner_id: string | null
        }
        Insert: {
          created_at?: string
          current_price: number
          end_time: string
          id?: string
          min_bid_increment?: number
          product_id: string
          reserve_price?: number | null
          start_time?: string
          starting_price: number
          status?: string
          updated_at?: string
          vendor_id: string
          winner_id?: string | null
        }
        Update: {
          created_at?: string
          current_price?: number
          end_time?: string
          id?: string
          min_bid_increment?: number
          product_id?: string
          reserve_price?: number | null
          start_time?: string
          starting_price?: number
          status?: string
          updated_at?: string
          vendor_id?: string
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "auctions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          last_message_at: string | null
          product_id: string | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          last_message_at?: string | null
          product_id?: string | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          last_message_at?: string | null
          product_id?: string | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_orders: {
        Row: {
          accepted_at: string | null
          broadcast_at: string | null
          buyer_id: string
          created_at: string
          delivered_at: string | null
          delivery_address: string
          delivery_fee: number
          delivery_instructions: string | null
          delivery_latitude: number
          delivery_longitude: number
          id: string
          order_id: string
          picked_up_at: string | null
          pickup_address: string
          pickup_instructions: string | null
          pickup_latitude: number
          pickup_longitude: number
          rider_id: string | null
          status: Database["public"]["Enums"]["delivery_status"] | null
          updated_at: string
          vendor_id: string
          zone_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          broadcast_at?: string | null
          buyer_id: string
          created_at?: string
          delivered_at?: string | null
          delivery_address: string
          delivery_fee?: number
          delivery_instructions?: string | null
          delivery_latitude: number
          delivery_longitude: number
          id?: string
          order_id: string
          picked_up_at?: string | null
          pickup_address: string
          pickup_instructions?: string | null
          pickup_latitude: number
          pickup_longitude: number
          rider_id?: string | null
          status?: Database["public"]["Enums"]["delivery_status"] | null
          updated_at?: string
          vendor_id: string
          zone_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          broadcast_at?: string | null
          buyer_id?: string
          created_at?: string
          delivered_at?: string | null
          delivery_address?: string
          delivery_fee?: number
          delivery_instructions?: string | null
          delivery_latitude?: number
          delivery_longitude?: number
          id?: string
          order_id?: string
          picked_up_at?: string | null
          pickup_address?: string
          pickup_instructions?: string | null
          pickup_latitude?: number
          pickup_longitude?: number
          rider_id?: string | null
          status?: Database["public"]["Enums"]["delivery_status"] | null
          updated_at?: string
          vendor_id?: string
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_orders_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "delivery_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_zones: {
        Row: {
          base_fee: number
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          polygon: Json | null
          updated_at: string
        }
        Insert: {
          base_fee?: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          polygon?: Json | null
          updated_at?: string
        }
        Update: {
          base_fee?: number
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          polygon?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string | null
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          media_url: string | null
          message_type: string
          sender_id: string
        }
        Insert: {
          content?: string | null
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          media_url?: string | null
          message_type?: string
          sender_id: string
        }
        Update: {
          content?: string | null
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          media_url?: string | null
          message_type?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      order_broadcasts: {
        Row: {
          broadcast_at: string
          delivery_order_id: string
          id: string
          responded_at: string | null
          rider_id: string
          status: string | null
        }
        Insert: {
          broadcast_at?: string
          delivery_order_id: string
          id?: string
          responded_at?: string | null
          rider_id: string
          status?: string | null
        }
        Update: {
          broadcast_at?: string
          delivery_order_id?: string
          id?: string
          responded_at?: string | null
          rider_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_broadcasts_delivery_order_id_fkey"
            columns: ["delivery_order_id"]
            isOneToOne: false
            referencedRelation: "delivery_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_broadcasts_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "riders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price: number
          product_id: string
          quantity: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price?: number
          product_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: string
          shipping_address: Json | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          shipping_address?: Json | null
          status?: string
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          shipping_address?: Json | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          discount_end_date: string | null
          discount_percent: number | null
          discount_start_date: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_auction: boolean | null
          name: string
          original_price: number | null
          price: number
          stock_quantity: number | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          discount_end_date?: string | null
          discount_percent?: number | null
          discount_start_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_auction?: boolean | null
          name: string
          original_price?: number | null
          price: number
          stock_quantity?: number | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          discount_end_date?: string | null
          discount_percent?: number | null
          discount_start_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_auction?: boolean | null
          name?: string
          original_price?: number | null
          price?: number
          stock_quantity?: number | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_vendor: boolean | null
          phone: string | null
          updated_at: string
          user_id: string
          vendor_company_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_vendor?: boolean | null
          phone?: string | null
          updated_at?: string
          user_id: string
          vendor_company_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_vendor?: boolean | null
          phone?: string | null
          updated_at?: string
          user_id?: string
          vendor_company_name?: string | null
        }
        Relationships: []
      }
      promocode_usage: {
        Row: {
          discount_applied: number | null
          id: string
          order_id: string | null
          promocode_id: string
          used_at: string
          user_id: string
        }
        Insert: {
          discount_applied?: number | null
          id?: string
          order_id?: string | null
          promocode_id: string
          used_at?: string
          user_id: string
        }
        Update: {
          discount_applied?: number | null
          id?: string
          order_id?: string | null
          promocode_id?: string
          used_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promocode_usage_promocode_id_fkey"
            columns: ["promocode_id"]
            isOneToOne: false
            referencedRelation: "promocodes"
            referencedColumns: ["id"]
          },
        ]
      }
      promocodes: {
        Row: {
          benefit_type: string
          benefit_value: number | null
          code: string
          created_at: string
          end_date: string | null
          id: string
          influencer_name: string | null
          influencer_pin: string | null
          is_active: boolean | null
          max_uses: number | null
          min_order_amount: number | null
          product_ids: string[] | null
          start_date: string
          updated_at: string
          uses_count: number | null
          vendor_id: string
        }
        Insert: {
          benefit_type: string
          benefit_value?: number | null
          code: string
          created_at?: string
          end_date?: string | null
          id?: string
          influencer_name?: string | null
          influencer_pin?: string | null
          is_active?: boolean | null
          max_uses?: number | null
          min_order_amount?: number | null
          product_ids?: string[] | null
          start_date?: string
          updated_at?: string
          uses_count?: number | null
          vendor_id: string
        }
        Update: {
          benefit_type?: string
          benefit_value?: number | null
          code?: string
          created_at?: string
          end_date?: string | null
          id?: string
          influencer_name?: string | null
          influencer_pin?: string | null
          is_active?: boolean | null
          max_uses?: number | null
          min_order_amount?: number | null
          product_ids?: string[] | null
          start_date?: string
          updated_at?: string
          uses_count?: number | null
          vendor_id?: string
        }
        Relationships: []
      }
      promotion_campaign_products: {
        Row: {
          campaign_id: string
          id: string
          joined_at: string
          product_id: string
          vendor_id: string
        }
        Insert: {
          campaign_id: string
          id?: string
          joined_at?: string
          product_id: string
          vendor_id: string
        }
        Update: {
          campaign_id?: string
          id?: string
          joined_at?: string
          product_id?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotion_campaign_products_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "promotion_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_campaign_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      promotion_campaigns: {
        Row: {
          banner_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          discount_type: string | null
          discount_value: number | null
          end_date: string
          id: string
          name: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          end_date: string
          id?: string
          name: string
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          end_date?: string
          id?: string
          name?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      rider_location_history: {
        Row: {
          id: string
          latitude: number
          longitude: number
          recorded_at: string
          rider_id: string
        }
        Insert: {
          id?: string
          latitude: number
          longitude: number
          recorded_at?: string
          rider_id: string
        }
        Update: {
          id?: string
          latitude?: number
          longitude?: number
          recorded_at?: string
          rider_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rider_location_history_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "riders"
            referencedColumns: ["id"]
          },
        ]
      }
      riders: {
        Row: {
          created_at: string
          current_latitude: number | null
          current_longitude: number | null
          email: string | null
          full_name: string
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          last_location_update: string | null
          license_plate: string | null
          phone: string
          rating: number | null
          status: Database["public"]["Enums"]["rider_status"] | null
          total_deliveries: number | null
          updated_at: string
          user_id: string
          vehicle_type: string | null
        }
        Insert: {
          created_at?: string
          current_latitude?: number | null
          current_longitude?: number | null
          email?: string | null
          full_name: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          last_location_update?: string | null
          license_plate?: string | null
          phone: string
          rating?: number | null
          status?: Database["public"]["Enums"]["rider_status"] | null
          total_deliveries?: number | null
          updated_at?: string
          user_id: string
          vehicle_type?: string | null
        }
        Update: {
          created_at?: string
          current_latitude?: number | null
          current_longitude?: number | null
          email?: string | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          last_location_update?: string | null
          license_plate?: string | null
          phone?: string
          rating?: number | null
          status?: Database["public"]["Enums"]["rider_status"] | null
          total_deliveries?: number | null
          updated_at?: string
          user_id?: string
          vehicle_type?: string | null
        }
        Relationships: []
      }
      seller_pickup_locations: {
        Row: {
          address: string
          created_at: string
          id: string
          instructions: string | null
          is_default: boolean | null
          latitude: number
          longitude: number
          updated_at: string
          vendor_id: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          instructions?: string | null
          is_default?: boolean | null
          latitude: number
          longitude: number
          updated_at?: string
          vendor_id: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          instructions?: string | null
          is_default?: boolean | null
          latitude?: number
          longitude?: number
          updated_at?: string
          vendor_id?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          product_image_url: string | null
          product_name: string
          product_price: number | null
          product_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_image_url?: string | null
          product_name: string
          product_price?: number | null
          product_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_image_url?: string | null
          product_name?: string
          product_price?: number | null
          product_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      delivery_status:
        | "pending"
        | "broadcasting"
        | "accepted"
        | "picked_up"
        | "in_transit"
        | "delivered"
        | "cancelled"
      rider_status: "online" | "offline" | "busy"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      delivery_status: [
        "pending",
        "broadcasting",
        "accepted",
        "picked_up",
        "in_transit",
        "delivered",
        "cancelled",
      ],
      rider_status: ["online", "offline", "busy"],
    },
  },
} as const
