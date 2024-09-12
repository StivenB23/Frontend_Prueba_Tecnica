import styles from "./Banner.module.css";

export const Banner = (): JSX.Element => {
  return (
    <div className={styles.banner}>
      <img src="/Banner_home.jpg" className={styles.banner__image} alt="ss" />
      <div className={styles.gradientOverlay}></div>
      <div className={styles.Banner__information}>
        <h2>Kung Fu Panda 4</h2>
        <div className={styles.Banner__information__detail}>
          <p>
            Join Po and the Furious Five on a new epic adventure! Discover the
            power of friendship and the strength within! Get ready to unleash
            your inner warrior! 🥋✨.
          </p>
          <div className={styles.Banner__information__detail__calification}>
            <img src="/Icon_Heart.svg" alt="" width={20} height={20} />
            <div className="">Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};
