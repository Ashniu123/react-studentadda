import React from "react";

const HomeListItem = ({ head, text, img, reverse }) => (
  <div className="card">
    <img className="card-img-top" src={img.src} alt={img.alt} />
    <div className="card-body">
      <h5 className="card-title">{head}</h5>
      <p className="card-text">{text.para}</p>
      <ul>
        {text.list.map((listItem, ind) => (
          <li key={ind}>{listItem}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default HomeListItem;
