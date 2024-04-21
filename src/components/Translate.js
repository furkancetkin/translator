import { useEffect, useState } from "react";
import axios from "axios";

const Translate = () => {
  const [selected, setSelected] = useState("en");
  const [firstArea, setFirstArea] = useState("");
  const [lastArea, setLastArea] = useState("");
  const [secondFlag, setSecondFlag] = useState("en");

  useEffect(() => {
    const onAreaChange = async () => {
      if (firstArea === "") {
        setLastArea("");
      } else {
        const response = await axios.get(
          "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" +
            "trnsl.1.1.20210513T090459Z.129fd7bb6a957139.1c941bf77db244b22e45a119763eb4342594c949&text=" +
            firstArea +
            "&lang=" +
            selected
        );
        setLastArea(response.data.text[0]);
      }
    };
    onAreaChange();
  }, [firstArea, selected]);

  return (
    <>
      <div className="translate">
        <div className="selectLanguage">
          <select
            className="select"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setSecondFlag(e.target.value);
            }}
            id="lang"
          >
            <option value="en" defaultValue>
              İngilizce
            </option>
            <option value="de">Almanca</option>
            <option value="es">İspanyolca</option>
            <option value="it">İtalyanca</option>
            <option value="fr">Fransızca</option>
            <option value="ro">Romanca</option>
            <option value="ru">Rusça</option>
            <option value="ar">Arapça</option>
            <option value="ja">Japonca</option>
          </select>
        </div>
        <div className="textAreas">
          <div className="field">
            <textarea
              placeholder="Çevirmek istediğiniz metni giriniz"
              name="firstArea"
              value={firstArea}
              onChange={(e) => setFirstArea(e.target.value)}
            />
            <img src="/assets/tr.png" alt="Türkiye" />
          </div>
          <div className="field">
            <textarea
              placeholder=" "
              name="lastArea"
              value={lastArea}
              onChange={(e) => setLastArea(e.target.value)}
            />
            <img src={`/assets/${secondFlag}.png`} id="flag" alt="flag" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Translate;