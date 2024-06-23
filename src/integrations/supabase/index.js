import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error('Supabase Query Error:', error.message);
        console.error('Supabase Query:', query);
        throw new Error(error.message);
    }
    return data;
};

/* supabase integration types

### users

| name    | type   | format | required |
|---------|--------|--------|----------|
| id      | uuid   | string | true     |
| name    | text   | string | true     |
| email   | text   | string | true     |

### posts

| name    | type   | format | required |
|---------|--------|--------|----------|
| id      | uuid   | string | true     |
| user_id | uuid   | string | true     |  // foreign key to users
| title   | text   | string | true     |
| content | text   | string | true     |
| date    | date   | string | true     |

*/

// Hooks for users table
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*')),
});

export const useUser = (id) => useQuery({
    queryKey: ['user', id],
    queryFn: () => fromSupabase(supabase.from('users').select('*').eq('id', id).single()),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => {
            // Ensure ID is a string if it's a bigint in the database
            if (newUser.id) newUser.id = newUser.id.toString();
            return fromSupabase(supabase.from('users').insert([newUser]));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUser) => {
            // Ensure ID is a string if it's a bigint in the database
            if (updatedUser.id) updatedUser.id = updatedUser.id.toString();
            return fromSupabase(supabase.from('users').update(updatedUser).eq('id', updatedUser.id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => {
            // Ensure ID is a string if it's a bigint in the database
            if (id) id = id.toString();
            return fromSupabase(supabase.from('users').delete().eq('id', id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

// Hooks for posts table
export const usePosts = () => useQuery({
    queryKey: ['posts'],
    queryFn: () => fromSupabase(supabase.from('posts').select('*')),
});

export const usePost = (id) => useQuery({
    queryKey: ['post', id],
    queryFn: () => fromSupabase(supabase.from('posts').select('*').eq('id', id).single()),
});

export const useAddPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPost) => {
            // Ensure ID is a string if it's a bigint in the database
            if (newPost.id) newPost.id = newPost.id.toString();
            return fromSupabase(supabase.from('posts').insert([newPost]));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedPost) => {
            // Ensure ID is a string if it's a bigint in the database
            if (updatedPost.id) updatedPost.id = updatedPost.id.toString();
            return fromSupabase(supabase.from('posts').update(updatedPost).eq('id', updatedPost.id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => {
            // Ensure ID is a string if it's a bigint in the database
            if (id) id = id.toString();
            return fromSupabase(supabase.from('posts').delete().eq('id', id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

// Hooks for tasks table
export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*')),
});

export const useTask = (id) => useQuery({
    queryKey: ['task', id],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*').eq('id', id).single()),
});

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask) => {
            // Ensure ID is a string if it's a bigint in the database
            if (newTask.id) newTask.id = newTask.id.toString();
            return fromSupabase(supabase.from('tasks').insert([newTask]));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTask) => {
            // Ensure ID is a string if it's a bigint in the database
            if (updatedTask.id) updatedTask.id = updatedTask.id.toString();
            return fromSupabase(supabase.from('tasks').update(updatedTask).eq('id', updatedTask.id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => {
            // Ensure ID is a string if it's a bigint in the database
            if (id) id = id.toString();
            return fromSupabase(supabase.from('tasks').delete().eq('id', id));
        },
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

// Hooks for notifications table
export const useNotifications = (userId) => useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => fromSupabase(supabase.from('notifications').select('*').eq('user_id', userId)),
});