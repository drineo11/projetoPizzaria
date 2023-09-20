import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";


// funcao para paginas que so podem acessar usuarios autenticados
export function canSSRAuthenticated<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        const token = cookies['@nextauth.token'];

        //se nao tiver o token, redireciona para a pagina de login
        if (!token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }

        try {
            return await fn(ctx);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, "@nextauth.token");

                return {
                    redirect: {
                        destination: "/",
                        permanent: false,
                    },
                };
            }
        }


    };
}