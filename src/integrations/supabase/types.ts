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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ad_events: {
        Row: {
          ad_id: string
          created_at: string
          device_id: string
          event_type: string
          id: string
        }
        Insert: {
          ad_id: string
          created_at?: string
          device_id: string
          event_type: string
          id?: string
        }
        Update: {
          ad_id?: string
          created_at?: string
          device_id?: string
          event_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_events_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "advertisements"
            referencedColumns: ["id"]
          },
        ]
      }
      advertisements: {
        Row: {
          clicks: number
          created_at: string
          end_date: string | null
          frequency: number
          id: string
          image_url: string | null
          impressions: number
          position: string
          start_date: string | null
          status: string
          target_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          clicks?: number
          created_at?: string
          end_date?: string | null
          frequency?: number
          id?: string
          image_url?: string | null
          impressions?: number
          position?: string
          start_date?: string | null
          status?: string
          target_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          clicks?: number
          created_at?: string
          end_date?: string | null
          frequency?: number
          id?: string
          image_url?: string | null
          impressions?: number
          position?: string
          start_date?: string | null
          status?: string
          target_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          likes: number
          published_date: string
          published_time: string
          shares: number
          short_description: string
          slug: string
          status: string
          title: string
          updated_at: string
          video_url: string | null
          views: number
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes?: number
          published_date?: string
          published_time?: string
          shares?: number
          short_description?: string
          slug: string
          status?: string
          title: string
          updated_at?: string
          video_url?: string | null
          views?: number
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes?: number
          published_date?: string
          published_time?: string
          shares?: number
          short_description?: string
          slug?: string
          status?: string
          title?: string
          updated_at?: string
          video_url?: string | null
          views?: number
        }
        Relationships: []
      }
      news_likes: {
        Row: {
          created_at: string
          device_id: string
          id: string
          news_id: string
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          news_id: string
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          news_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_likes_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["id"]
          },
        ]
      }
      news_shares: {
        Row: {
          channel: string
          created_at: string
          device_id: string
          id: string
          news_id: string
        }
        Insert: {
          channel?: string
          created_at?: string
          device_id: string
          id?: string
          news_id: string
        }
        Update: {
          channel?: string
          created_at?: string
          device_id?: string
          id?: string
          news_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_shares_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["id"]
          },
        ]
      }
      news_views: {
        Row: {
          created_at: string
          device_id: string
          id: string
          news_id: string
        }
        Insert: {
          created_at?: string
          device_id: string
          id?: string
          news_id: string
        }
        Update: {
          created_at?: string
          device_id?: string
          id?: string
          news_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_views_news_id_fkey"
            columns: ["news_id"]
            isOneToOne: false
            referencedRelation: "news"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          ads_enabled: boolean
          contact_address: string | null
          contact_email: string | null
          contact_phone: string | null
          default_ad_frequency: number
          facebook_url: string | null
          favicon_url: string | null
          id: boolean
          instagram_url: string | null
          logo_url: string | null
          site_name: string
          updated_at: string
          whatsapp_url: string | null
          x_url: string | null
        }
        Insert: {
          ads_enabled?: boolean
          contact_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          default_ad_frequency?: number
          facebook_url?: string | null
          favicon_url?: string | null
          id?: boolean
          instagram_url?: string | null
          logo_url?: string | null
          site_name?: string
          updated_at?: string
          whatsapp_url?: string | null
          x_url?: string | null
        }
        Update: {
          ads_enabled?: boolean
          contact_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          default_ad_frequency?: number
          facebook_url?: string | null
          favicon_url?: string | null
          id?: boolean
          instagram_url?: string | null
          logo_url?: string | null
          site_name?: string
          updated_at?: string
          whatsapp_url?: string | null
          x_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin"],
    },
  },
} as const
