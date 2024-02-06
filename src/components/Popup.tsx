import axios from "axios";
import React, { FC, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

interface PopupProps {
  setShowPopup: (show: boolean) => void;
  popupContent: {
    id: string;
    text: string;
  };
  setUpdateUI: (update: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

const Popup: FC<PopupProps> = ({ setShowPopup, popupContent, setUpdateUI }) => {
  const [input, setInput] = useState<string>(popupContent.text);

  const updateToDo = () => {
    axios
      .put(`${baseURL}/update/${popupContent.id}`, { toDo: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setShowPopup(false);
      });
  };

  return (
    <div className="backdrop">
      <div className="popup">
        <RxCross1 className="cross" onClick={() => setShowPopup(false)} />
        <h1>Update ToDo</h1>

        <div className="popup__input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Update ToDo..."
          />
          <button onClick={updateToDo}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;