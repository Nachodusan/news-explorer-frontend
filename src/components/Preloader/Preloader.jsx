import "./Preloader.css";

function Preloader({ text = "Buscando noticias..." }) {
  return (
    <div className="preloader">
      <span className="preloader__circle" />
      <p className="preloader__text">{text}</p>
    </div>
  );
}

export default Preloader;
