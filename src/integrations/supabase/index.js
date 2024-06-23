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
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### groups

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| group_id   | uuid        | string | false    |
| group_name | text        | string | true     |
| description| text        | string | false    |
| created_at | timestamptz | string | false    |
| updated_at | timestamptz | string | false    |

### tasks

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| task_id     | uuid        | string | true     |
| user_id     | uuid        | string | true     |
| title       | text        | string | true     |
| description | text        | string | false    |
| category_id | uuid        | string | false    |
| priority    | text        | string | false    |
| status      | text        | string | false    |
| due_date    | timestamp   | string | false    |
| created_at  | timestamp   | string | false    |
| updated_at  | timestamp   | string | false    |

### profiles

| name       | type        | format | required |
|------------|-------------|--------|----------|
| profile_id | uuid        | string | true     |
| user_id    | uuid        | string | true     |
| bio        | text        | string | false    |
| avatar_url | text        | string | false    |
| created_at | timestamp   | string | false    |
| updated_at | timestamp   | string | false    |

### task_tags

| name    | type | format | required |
|---------|------|--------|----------|
| task_id | uuid | string | true     |
| tag_id  | uuid | string | true     |

### projects

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| id          | int8        | number | true     |
| project_id  | uuid        | string | false    |
| project_name| text        | string | true     |
| description | text        | string | false    |
| start_date  | timestamptz | string | false    |
| end_date    | timestamptz | string | false    |

### files

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| id          | int8        | number | true     |
| file_id     | uuid        | string | false    |
| uploader_id | uuid        | string | true     |
| file_name   | text        | string | true     |
| file_type   | text        | string | false    |
| file_size   | int8        | number | false    |
| upload_date | timestamptz | string | false    |
| version     | int4        | number | false    |
| is_active   | bool        | boolean| false    |
| group_id    | uuid        | string | false    |

### user_scores

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| user_id    | uuid        | string | true     |
| score      | int4        | number | true     |
| created_at | timestamptz | string | false    |
| updated_at | timestamptz | string | false    |

### comments

| name       | type        | format | required |
|------------|-------------|--------|----------|
| comment_id | uuid        | string | true     |
| task_id    | uuid        | string | true     |
| user_id    | uuid        | string | true     |
| content    | text        | string | true     |
| created_at | timestamp   | string | false    |

### tags

| name    | type | format | required |
|---------|------|--------|----------|
| tag_id  | uuid | string | true     |
| name    | text | string | true     |

### users

| name          | type        | format | required |
|---------------|-------------|--------|----------|
| id            | int8        | number | true     |
| user_id       | uuid        | string | false    |
| username      | text        | string | true     |
| group_id      | uuid        | string | false    |
| created_at    | timestamptz | string | false    |
| updated_at    | timestamptz | string | false    |
| email         | text        | string | true     |
| password_hash | text        | string | true     |
| first_name    | text        | string | false    |
| last_name     | text        | string | false    |

### sessions

| name       | type        | format | required |
|------------|-------------|--------|----------|
| session_id | uuid        | string | true     |
| user_id    | uuid        | string | true     |
| token      | text        | string | true     |
| created_at | timestamp   | string | false    |
| expires_at | timestamp   | string | false    |

### categories

| name       | type | format | required |
|------------|------|--------|----------|
| category_id| uuid | string | true     |
| name       | text | string | true     |

*/

export const useGroups = () => useQuery({
    queryKey: ['groups'],
    queryFn: () => fromSupabase(supabase.from('groups').select('*')),
});

export const useAddGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newGroup) => fromSupabase(supabase.from('groups').insert([newGroup])),
        onSuccess: () => {
            queryClient.invalidateQueries('groups');
        },
    });
};

export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*')),
});

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask) => fromSupabase(supabase.from('tasks').insert([newTask])),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useProfiles = () => useQuery({
    queryKey: ['profiles'],
    queryFn: () => fromSupabase(supabase.from('profiles').select('*')),
});

export const useAddProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProfile) => fromSupabase(supabase.from('profiles').insert([newProfile])),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

export const useTaskTags = () => useQuery({
    queryKey: ['task_tags'],
    queryFn: () => fromSupabase(supabase.from('task_tags').select('*')),
});

export const useAddTaskTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTaskTag) => fromSupabase(supabase.from('task_tags').insert([newTaskTag])),
        onSuccess: () => {
            queryClient.invalidateQueries('task_tags');
        },
    });
};

export const useProjects = () => useQuery({
    queryKey: ['projects'],
    queryFn: () => fromSupabase(supabase.from('projects').select('*')),
});

export const useAddProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProject) => fromSupabase(supabase.from('projects').insert([newProject])),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useFiles = () => useQuery({
    queryKey: ['files'],
    queryFn: () => fromSupabase(supabase.from('files').select('*')),
});

export const useAddFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFile) => fromSupabase(supabase.from('files').insert([newFile])),
        onSuccess: () => {
            queryClient.invalidateQueries('files');
        },
    });
};

export const useUserScores = () => useQuery({
    queryKey: ['user_scores'],
    queryFn: () => fromSupabase(supabase.from('user_scores').select('*')),
});

export const useAddUserScore = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUserScore) => fromSupabase(supabase.from('user_scores').insert([newUserScore])),
        onSuccess: () => {
            queryClient.invalidateQueries('user_scores');
        },
    });
};

export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useTags = () => useQuery({
    queryKey: ['tags'],
    queryFn: () => fromSupabase(supabase.from('tags').select('*')),
});

export const useAddTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTag) => fromSupabase(supabase.from('tags').insert([newTag])),
        onSuccess: () => {
            queryClient.invalidateQueries('tags');
        },
    });
};

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*')),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useSessions = () => useQuery({
    queryKey: ['sessions'],
    queryFn: () => fromSupabase(supabase.from('sessions').select('*')),
});

export const useAddSession = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSession) => fromSupabase(supabase.from('sessions').insert([newSession])),
        onSuccess: () => {
            queryClient.invalidateQueries('sessions');
        },
    });
};

export const useCategories = () => useQuery({
    queryKey: ['categories'],
    queryFn: () => fromSupabase(supabase.from('categories').select('*')),
});

export const useAddCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCategory) => fromSupabase(supabase.from('categories').insert([newCategory])),
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
        },
    });
};