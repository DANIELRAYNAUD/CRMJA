import { supabase } from "./supabase";

// Função para login com e-mail e senha
export const signIn = async (email, password) => {
    const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    return user;
};

// Função para cadastro com e-mail e senha
export const signUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) throw error;
    return user;
};

// Função para logout
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};
