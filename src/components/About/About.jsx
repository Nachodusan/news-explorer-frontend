import "./About.css";
import authorImage from "../../images/author.svg";

function About() {
  return (
    <section className="about">
      <img className="about__avatar" src={authorImage} alt="Foto del autor" />
      <div className="about__text">
        <h2 className="about__title">Sobre el autor</h2>
        <p className="about__paragraph">
          Este bloque describe al autor del proyecto. Aquí puedes incluir
          información real sobre ti: tu nombre, lo que haces y cómo construiste
          esta aplicación.
        </p>
        <p className="about__paragraph">
          News Explorer es un proyecto full stack que combina una API de
          noticias de terceros con un back-end propio para autenticar usuarios y
          guardar artículos. El front-end está hecho con React y Vite.
        </p>
      </div>
    </section>
  );
}

export default About;
