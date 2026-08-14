import galeriaHomem from "../../assets/images/galeria-homem.jpg";
import galeriaTenisRoxo from "../../assets/images/galeria-tenis-roxo.jpg";
import galeriaModelo from "../../assets/images/galeria-modelo.jpg";
import galeriaTenisColorido from "../../assets/images/galeria-tenis-colorido.jpg";
import galeriaTenisBrancoPeto from "../../assets/images/galeria-tenis-branco-e-preto.jpg";
import galeriaTenisCinza from "../../assets/images/galeria-tenis-cinza.jpg";
import styles from "./Gallery.module.css";
import { Overlay } from "../Overlay";
import { Button } from "../Button";
import { useRouter } from "@tanstack/react-router";

export const Gallery = () => {
  const router = useRouter();

  return (
    <div className="container">
      <div className={styles.galleryGrid}>
        <div
          className={`${styles.imageCard} ${styles.highlight} relative rounded-[20px] overflow-hidden`}
        >
          <img
            className="w-full h-full object-cover"
            src={galeriaHomem}
            alt="Krypton One - Estilo urbano com atitude"
          />

          <Overlay
            title="Kripton One"
            subtitle="Estilo urbano com atitude"
            className="inset-0 justify-center"
          >
            <Button
              variant="secondary"
              onClick={() =>
                router.navigate({
                  to: "/products/category/$category",
                  params: { category: "feminino" },
                })
              }
            >
              Feminino
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                router.navigate({
                  to: "/products/category/$category",
                  params: { category: "masculino" },
                })
              }
            >
              Masculino
            </Button>
          </Overlay>
        </div>

        <div
          className={`${styles.imageCard} ${styles.sneakerPurple} relative rounded-[20px] overflow-hidden`}
        >
          <img
            className="w-full h-full object-cover"
            src={galeriaTenisRoxo}
            alt="Tênis Roxo"
          />
        </div>

        <div
          className={`${styles.imageCard} ${styles.model} relative rounded-[20px] overflow-hidden`}
        >
          <img
            className="w-full h-full object-cover"
            src={galeriaModelo}
            alt="Modelo Feminina"
          />
        </div>

        <div
          className={`${styles.imageCard} ${styles.sneakerColor} relative rounded-[20px] overflow-hidden`}
        >
          <img
            className="w-full h-full object-cover"
            src={galeriaTenisColorido}
            alt="Tênis Colorido"
          />
        </div>

        <div
          className={`${styles.imageCard} ${styles.sneakerWhite} relative rounded-[20px] overflow-hidden`}
        >
          <img
            className="w-full h-full object-cover"
            src={galeriaTenisBrancoPeto}
            alt="Tênis Branco e Preto"
          />
        </div>

        <div
          className={`${styles.imageCard} ${styles.sneakerSilver} relative rounded-[20px] overflow-hidden`}
        >
          <img
            className="w-full h-full object-cover"
            src={galeriaTenisCinza}
            alt="Tênis Cinza"
          />
        </div>
      </div>
    </div>
  );
};
