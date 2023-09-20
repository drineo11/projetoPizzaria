import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { parseCookies } from "nookies";

// funcao para paginas que so podem acessar visitantes

export function canSSRGuest<P>(fn: GetServerSideProps<P>): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    //se tentar acessar a pagina de login e ja estiver logado, redireciona para o dashboard
    if (cookies["@nextauth.token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return await fn(ctx);
  };
}