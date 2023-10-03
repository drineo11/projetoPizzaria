import { useState, ChangeEvent } from "react";
import Head from "next/head";
import styles from "./styles.module.scss";
import { Header } from "../../components/Header";

import { canSSRAuthenticated } from "../../utils/canSSRAuthenticated";
import { FiUpload } from "react-icons/fi";

export default function Product() {

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];
        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {

            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));

        }

    }

    return (
        <>
            <Head>
                <title>Novo Produto</title>
            </Head>
            <div>

                <Header />
                <main className={styles.container}>
                    <h1>Novo Produto</h1>

                    <form className={styles.form}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={35} color="FFF" />
                            </span>
                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                            {avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto do Produto"
                                    width={250}
                                    height={250}
                                />
                            )}

                        </label>


                        <select>
                            <option value="">
                                Bebidas
                            </option>
                            <option value="">
                                Pizzas
                            </option>
                        </select>
                        <input
                            type="text"
                            placeholder="Nome do Produto"
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Preço do Produto"
                            className={styles.input}

                        />

                        <textarea
                            placeholder="Descrição do Produto"
                            className={styles.input}
                        />

                        <button className={styles.buttonAdd} type="submit">
                            Cadastrar
                        </button>
                    </form>

                </main>


            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuthenticated(async (ctx) => {
    return {
        props: {}
    }
});