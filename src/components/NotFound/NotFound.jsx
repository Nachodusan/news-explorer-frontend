import "./NotFound.css";
import notFoundIcon from "../../images/not-found.svg";

function NotFound({ title, subtitle }) {
  return (
    <section className="not-found">
      <img className="not-found__icon" src={notFoundIcon} alt="" aria-hidden="true" />
      <h2 className="not-found__title">{title}</h2>
      <p className="not-found__subtitle">{subtitle}</p>
    </section>
  );
}

export default NotFound;
