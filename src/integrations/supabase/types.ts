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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          created_at: string | null
          id: string
          setting_key: string
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          active: boolean | null
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          order_index: number | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          order_index?: number | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          order_index?: number | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category_id: string | null
          content: string
          created_at: string | null
          excerpt: string
          featured: boolean | null
          id: string
          image_url: string | null
          order_index: number | null
          published: boolean | null
          published_at: string | null
          read_time: number | null
          slug: string
          tags: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          category_id?: string | null
          content: string
          created_at?: string | null
          excerpt: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          order_index?: number | null
          published?: boolean | null
          published_at?: string | null
          read_time?: number | null
          slug: string
          tags?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          category_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          order_index?: number | null
          published?: boolean | null
          published_at?: string | null
          read_time?: number | null
          slug?: string
          tags?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      client_projects: {
        Row: {
          budget_max: number | null
          budget_min: number | null
          client_id: string | null
          created_at: string | null
          deliverables: Json | null
          description: string | null
          end_date: string | null
          id: string
          notes: string | null
          priority: string | null
          project_type: string | null
          requirements: Json | null
          start_date: string | null
          status: string | null
          timeline: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          budget_max?: number | null
          budget_min?: number | null
          client_id?: string | null
          created_at?: string | null
          deliverables?: Json | null
          description?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          priority?: string | null
          project_type?: string | null
          requirements?: Json | null
          start_date?: string | null
          status?: string | null
          timeline?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          budget_max?: number | null
          budget_min?: number | null
          client_id?: string | null
          created_at?: string | null
          deliverables?: Json | null
          description?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          priority?: string | null
          project_type?: string | null
          requirements?: Json | null
          start_date?: string | null
          status?: string | null
          timeline?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          company: string | null
          company_size: string | null
          created_at: string | null
          email: string
          id: string
          industry: string | null
          name: string
          notes: string | null
          phone: string | null
          status: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          company?: string | null
          company_size?: string | null
          created_at?: string | null
          email: string
          id?: string
          industry?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          company?: string | null
          company_size?: string | null
          created_at?: string | null
          email?: string
          id?: string
          industry?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      email_notifications: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          project_lead_id: string | null
          recipient_email: string
          sent_at: string | null
          status: string
          subject: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          project_lead_id?: string | null
          recipient_email: string
          sent_at?: string | null
          status?: string
          subject: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          project_lead_id?: string | null
          recipient_email?: string
          sent_at?: string | null
          status?: string
          subject?: string
          template_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_notifications_project_lead_id_fkey"
            columns: ["project_lead_id"]
            isOneToOne: false
            referencedRelation: "project_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_projects: {
        Row: {
          active: boolean | null
          category_id: string | null
          created_at: string | null
          description: string
          featured: boolean | null
          github_url: string | null
          id: string
          image_url: string | null
          live_url: string | null
          order_index: number | null
          tags: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          category_id?: string | null
          created_at?: string | null
          description: string
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          order_index?: number | null
          tags?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          category_id?: string | null
          created_at?: string | null
          description?: string
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          order_index?: number | null
          tags?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_projects_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "project_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      project_categories: {
        Row: {
          active: boolean | null
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          order_index: number | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          order_index?: number | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          order_index?: number | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_leads: {
        Row: {
          additional_info: string | null
          assigned_to: string | null
          budget: string
          company: string | null
          created_at: string
          email: string
          features: Json | null
          has_existing_brand: string
          id: string
          ip_address: unknown | null
          name: string
          phone: string
          platforms: Json | null
          preferred_contact: string
          priority: string
          project_description: string
          project_title: string
          project_type: string
          source: string | null
          status: string
          timeline: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          additional_info?: string | null
          assigned_to?: string | null
          budget: string
          company?: string | null
          created_at?: string
          email: string
          features?: Json | null
          has_existing_brand: string
          id?: string
          ip_address?: unknown | null
          name: string
          phone: string
          platforms?: Json | null
          preferred_contact: string
          priority?: string
          project_description: string
          project_title: string
          project_type: string
          source?: string | null
          status?: string
          timeline: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          additional_info?: string | null
          assigned_to?: string | null
          budget?: string
          company?: string | null
          created_at?: string
          email?: string
          features?: Json | null
          has_existing_brand?: string
          id?: string
          ip_address?: unknown | null
          name?: string
          phone?: string
          platforms?: Json | null
          preferred_contact?: string
          priority?: string
          project_description?: string
          project_title?: string
          project_type?: string
          source?: string | null
          status?: string
          timeline?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          client_id: string | null
          created_at: string | null
          discount: number | null
          id: string
          notes: string | null
          project_id: string | null
          quote_number: string
          services: Json | null
          status: string | null
          subtotal: number
          taxes: number | null
          terms_conditions: string | null
          total: number
          updated_at: string | null
          valid_until: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          discount?: number | null
          id?: string
          notes?: string | null
          project_id?: string | null
          quote_number: string
          services?: Json | null
          status?: string | null
          subtotal?: number
          taxes?: number | null
          terms_conditions?: string | null
          total?: number
          updated_at?: string | null
          valid_until?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          discount?: number | null
          id?: string
          notes?: string | null
          project_id?: string | null
          quote_number?: string
          services?: Json | null
          status?: string | null
          subtotal?: number
          taxes?: number | null
          terms_conditions?: string | null
          total?: number
          updated_at?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "client_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          active: boolean | null
          benefits: Json | null
          created_at: string | null
          description: string
          detailed_description: string | null
          features: Json | null
          gradient: string | null
          icon: string
          id: string
          order_index: number | null
          price: string | null
          subtitle: string | null
          tech_stack: Json | null
          timeline: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          benefits?: Json | null
          created_at?: string | null
          description: string
          detailed_description?: string | null
          features?: Json | null
          gradient?: string | null
          icon: string
          id?: string
          order_index?: number | null
          price?: string | null
          subtitle?: string | null
          tech_stack?: Json | null
          timeline?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          benefits?: Json | null
          created_at?: string | null
          description?: string
          detailed_description?: string | null
          features?: Json | null
          gradient?: string | null
          icon?: string
          id?: string
          order_index?: number | null
          price?: string | null
          subtitle?: string | null
          tech_stack?: Json | null
          timeline?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          active: boolean | null
          bio: string | null
          created_at: string | null
          github_url: string | null
          id: string
          image_url: string | null
          linkedin_url: string | null
          name: string
          order_index: number | null
          position: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          bio?: string | null
          created_at?: string | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          name: string
          order_index?: number | null
          position: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          bio?: string | null
          created_at?: string | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          name?: string
          order_index?: number | null
          position?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      technologies: {
        Row: {
          active: boolean | null
          category: string
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          order_index: number | null
          proficiency_level: number | null
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          active?: boolean | null
          category: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          order_index?: number | null
          proficiency_level?: number | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          active?: boolean | null
          category?: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          order_index?: number | null
          proficiency_level?: number | null
          updated_at?: string | null
          years_experience?: number | null
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
