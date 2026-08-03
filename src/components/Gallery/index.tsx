import galeriaHomem from "@/assets/images/galeria-homem.jpg";
import galeriaTenisRoxo from "@/assets/images/galeria-tenis-roxo.jpg";
import galeriaModelo from "@/assets/images/galeria-modelo.jpg";
import galeriaTenisColorido from "@/assets/images/galeria-tenis-colorido.jpg";
import galeriaTenisBrancoPeto from "@/assets/images/galeria-tenis-branco-e-preto.jpg";
import galeriaTenisCinza from "@/assets/images/galeria-tenis-cinza.jpg";
import styles from "./Gallery.module.css";

export const Gallery = () => {
  return (
    
    <div className="container">
      <div className={styles.galleryGrid}>
        <div className={`${styles.imageCard} ${styles.highlight}`}>
          <img
            src={galeriaHomem}
            alt="Krypton One - Estilo urbano com atitude"
          />
          <div className={styles.overlay}>
            <div className={styles.textContent}>
              <p className={styles.productName}>Krypton One</p>
              <p className={styles.productDescription}>
                Estilo urbano com atitude
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.button}>Feminino</button>
              <button className={styles.button}>Masculino</button>
            </div>
          </div>
        </div>

        <div className={`${styles.imageCard} ${styles.sneakerPurple}`}>
          <img src={galeriaTenisRoxo} alt="Tênis Roxo" />
        </div>

        <div className={`${styles.imageCard} ${styles.model}`}>
          <img src={galeriaModelo} alt="Modelo Feminina" />
        </div>

        <div className={`${styles.imageCard} ${styles.sneakerColor}`}>
          <img src={galeriaTenisColorido} alt="Tênis Colorido" />
        </div>

        <div className={`${styles.imageCard} ${styles.sneakerWhite}`}>
          <img src={galeriaTenisBrancoPeto} alt="Tênis Branco e Preto" />
        </div>

        <div className={`${styles.imageCard} ${styles.sneakerSilver}`}>
          <img src={galeriaTenisCinza} alt="Tênis Cinza" />
        </div>
      </div>
    </div>
  );
};
