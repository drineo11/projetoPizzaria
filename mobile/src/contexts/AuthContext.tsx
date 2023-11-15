import React, { createContext, useState, ReactNode, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

//Tipagem dos dados do usuário
type AuthContextData = {
  user: UserProps;
  isAuthenticaded: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

// Informações do usuário
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    token: "",
  });

  //Estados de carregamento
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticaded = !!user.name;

  useEffect(() => {
    async function getUser() {
      //Obter dados do usuário no storage
      const userInfo = await AsyncStorage.getItem("@userpizzaria");
      let hasUser: UserProps = JSON.parse(userInfo || "{}");

      //Verificação se existe usuário no storage
      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${hasUser.token}`;

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        });
      }
      setLoading(false);
    }

    getUser();
  }, []);

  //Função para realizar login
  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      //console.log(response.data);

      const { id, name, token } = response.data;

      const data = {
        ...response.data,
      };

      await AsyncStorage.setItem("@userpizzaria", JSON.stringify(data));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
        token,
      });

      setLoadingAuth(false);
    } catch (error) {
      console.log(error);
      setLoadingAuth(false);
    }
  }

  //Função para realizar logout
  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: "",
        name: "",
        email: "",
        token: "",
      });
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticaded,
        signIn,
        loading,
        loadingAuth,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
