export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Task: {
        Row: {
          created_at: string | null;
          finished: boolean | null;
          id: number;
          text: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          finished?: boolean | null;
          id?: number;
          text?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          finished?: boolean | null;
          id?: number;
          text?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Task_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Task = Database["public"]["Tables"]["Task"]["Row"];
export type TaskInsert = Database["public"]["Tables"]["Task"]["Insert"];
export type TaskUpdate = Database["public"]["Tables"]["Task"]["Update"];
